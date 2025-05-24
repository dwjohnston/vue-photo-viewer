import debounce from "lodash.debounce";
import throttle from "lodash.throttle";


async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let i =0; 
async function foo() {

    await wait(50);
    console.log("foo", i++);
    return i; 
}


const debouncedFoo = debounce(foo, 1000);





async function main() {
    console.log("Start");
    const r1 = debouncedFoo()
    await wait(100);
    const r2 = debouncedFoo()
    await wait(100);
    const r3 = debouncedFoo()
    await wait(100);
    const r4 = debouncedFoo()
    await wait(100);

    await wait(2000);
    console.log(r1,r2,r3,r4);
    const result = await Promise.all([r1, r2, r3, r4]);
    console.log(result);


    console.log("End");
}


main().then(() => {
    console.log("Main finished");
}
).catch((error) => {
    console.error("Error in main:", error);
}
).finally(() => {
    console.log("Main finally");
}
);