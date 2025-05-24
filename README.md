# Vue 3 + TypeScript + Vite

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


## Solution notes

The wireframe suggests displaying both the photographer, and the country in the resulting photo display. The country is not one of the fields that is included on the search response, so I've omitted it.


## Solution Architecture

- Styling. Just plain CSS. For a simple demonstration like this, KISS.

- State management. None. 
The complexity of this challenge is in the PhotoSearchInput, and having it throttle the requests. Real world, IMO such a component shouldn't rely on external state management being present anyway. Generally speaking it's better if a component is self-sufficient. 

Note that I provided the data fetching function via Vue's dependency injection mechanism, and I make use of this for the tests. 

- Tests written with Storybook. This is somewhat experimental on my part. But basically I think I think a better development experience for tests if you can see what is happening. And because Storybook runs in a real browser, you don't have issues that you can run into with JSDOM based solutions, where not all browser APIs are supported. 

It does add some complexity as far as the tests in a build pipeline goes, because you need to wait for Storybook to be built and deployed, but this is probably something you want to do as part of a branch build anyway.

## Comments 

💬 - Comment about the solution. 'Discuss this in pull request' type comments.

☝️ - Note. Comments that don't 

🧑‍🔬 - Comments about Vue itself, observations I'm making given that I'm new to it. 

## Process notes/use of AI

I made extensive use of Copilot, which zomg, makes a task like this a lot easier, particularly where it's a framework I have not used with any depth. 

The prompting process resembles the process I would use to code the thing without copilot -  first add the empty components, now get the search input returning something/anything and display it, now get it to make API requests...  you can follow the git commits to get any idea. 

I didn't paste in the exercise and tell it to do the whole thing, though now that I mention it, I'm curious how that would turn out 😅. 

Copilot was pretty good. It did get bit lost trying to set up the props for the PhotoDisplay component. 


