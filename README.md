# Acme Photo Viewer

## Instructions 

Run the application with

```
npm run dev
```

View storybook 

```
npm run storybook
```

With Storybook running, run tests with 

```
npm test
```

Note there is a failing test - see 'There is a bug in the application' below. 


## Solution notes

The wireframe suggests displaying both the photographer, and the country in the resulting photo display. The country is not one of the fields that is included on the search response, so I've omitted it.

I've indexed on solving what I think is the most difficult part of the problem posed, which is the responsive live search. Importantly, I've made sure the solution I've provided is _testable_. 

I have not prioritised styling or sort order.

## Solution Architecture

- Styling. Just plain CSS. For a simple demonstration like this, keep it simple.

- State management. None. 
The complexity of this challenge is in the PhotoSearchInput, and having it throttle the requests. Real world, IMO such a component shouldn't rely on external state management being present anyway. Generally speaking it's better if a component is self-sufficient. 

Note that I provided the data fetching function via Vue's dependency injection mechanism, and I make use of this for the tests. 

- Tests written with Storybook. This is somewhat experimental on my part. But basically I think I think a better development experience for tests if you can see what is happening. And because Storybook runs in a real browser, you don't have issues that you can run into with JSDOM based solutions, where not all browser APIs are supported. 

It does add some complexity as far as the tests in a build pipeline goes, because you need to wait for Storybook to be built and deployed, but you probably want a branch deployment of storybook as part of your process anyway.

## Comments 

💬 - Comment about the solution. 'Discuss this in pull request' type comments.

☝️ - Note. Comments that don't 

🧑‍🔬 - Comments about Vue itself, observations I'm making given that I'm new to it. 

## Process notes/use of AI

I made extensive use of Copilot, which zomg, makes a task like this a lot easier, particularly where it's a framework I have not used with any depth. 

The prompting process resembles the process I would use to code the thing without copilot -  first add the empty components, now get the search input returning something/anything and display it, now get it to make API requests...  you can follow the git commits to get any idea. 

Copilot was pretty good. It did get bit lost trying to set up the props for the PhotoDisplay component. 

## There is a bug in the application.

There is a bug in the application in the following scenario: 

1. The types the first three letters of their query 'foo', this triggers a request, and for this scenario this request will take say 2000ms. 
2. The user waits 200ms, and then types another letter 'd', this triggers another request and this request takes 200ms. 
3. The second request completes and the photos are displayed
3. ~1800ms later the first request completes, and erroneously clobbers the second query. 

There is a failing test (OutOfOrderTest) that detects this issue. 

Note that this issue occurs whether or not we are debouncing the query or not (And infact is more likely to occur if we are not debouncing, due to more requests occuring).

Resolving the bug: 

1. An [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) is an appropriate mechanism for handling this scenario. 
Essentially, before the second query starts, the first query should be aborted. 

2. Aborting fetch vs cancelling promise

See this discussion re: cancelling promises. https://stackoverflow.com/questions/30233302/promise-is-it-possible-to-force-cancel-a-promise

One potential solution is using a third-party promise library like bluebird. Or rolling our own cancellable promise.

3. Note that the dependency injection of the `fetchPhotos` function does not expose a fetch function directly, but a plain async function that returns some data. So we'd possibly either: 

- Abandon the dependency injection solution, and use a tool like MSW to mock our API behaviour, and that way we can add AbortControllers directly to the fetch functions. 
- Extend the injected service function to allow some extra options, like an AbortSignal: 

```
export async function fetchPhotos(query: string, options?: {
    abortSignal?: AbortSignal
}): Promise<PhotoSearchResponse> 
```

Then we'd need to roll kind of aborting inside our  mock fetchPhotos. 

- Change the interface of the service function to return a `CancellablePromise`

We'd either roll our own, or find one that does what we need. 


4. We likely need a better debounce function. 

I found lodash's debounce a bit a nightmare to use. 

See for example: https://github.com/lodash/lodash/issues/4700

I think the ideal debounce for this scenario, looks like this: 

```
function idealDebounce<TArgs, TReturnType>(fn: (...args: TArgs) => CancellablePromise<TReturnType>, debounceTimeMs: number) : (...args: TArgs) => CancellablePromise<TReturnType>;
```

And it has the following behaviour: 

1. Essentially, debounce should take an async function and return an async function.
2. All requests that are made within the debounce period will resolve with the same value as the _trailing_ request of that debounce period. Also, they'll resolve in order that they were requested. 
3. Any requests that occur within a previous debounce period, and are still not resolved by the time a new debounce period occurs, will be cancelled. 



