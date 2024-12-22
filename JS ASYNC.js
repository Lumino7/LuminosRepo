// Promise: is an object that represents the result of an asynchronous operation that may complete in the future. It contains the state of the operation, and the resulting value.
// States:
// Pending: The initial state. The promise is neither fulfilled nor rejected.
// Fulfilled: The operation completed successfully, and the promise has a resulting value.
// Rejected: An error occurred during the operation, and the promise has a reason for the failure.

fetch('URL') // fetch returns a promise that gets fulfilled when an http response is returned.
.then((response) => { // .then(onFulfilled, onRejected) takes callback functions for either fulfillment or rejection of a Promise. Both parameters are optional.
    //.then returns a promise (that contains the response.json value) that will be fulfilled once the callback function is completed.
    //response here can be named anything. it just represents the result/value of the fetch promise.
    return response.json(); //parses the http response object into a JSON (fetch always returns a response object even if it contains a json)
})
.then((result) => { //result can also be named anything.
    console.log(result);
})
.catch((error) => {
    console.error(error); // Catch any error that occurred in the chain
});



//CALLBACK HELL:
function first(callback) {
    setTimeout(() => {
        console.log("First task completed");
        callback();
    }, 1000);
}

function second(callback) {
    setTimeout(() => {
        console.log("Second task completed");
        callback();
    }, 1000);
}

function third(callback) {
    setTimeout(() => {
        console.log("Third task completed");
        callback();
    }, 1000);
}

// Callback hell: nesting callbacks
first(() => {
    second(() => {
        third(() => {
            console.log("All tasks completed");
        });
    });
});


//USE OF PROMISES.THEN
function first() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("First task completed");
            resolve();
        }, 1000);
    });
}

function second() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Second task completed");
            resolve();
        }, 1000);
    });
}

function third() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Third task completed");
            resolve();
        }, 1000);
    });
}

// Using .then to chain promises
first()
    .then(second)
    .then(third)
    .then(() => {
        console.log("All tasks completed");
    });

Promise.then() //takes two arguments, a callback for success and another for failure.



//USING ASYNC/AWAIT
function first() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("First task completed");
            resolve();
        }, 1000);
    });
}

function second() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Second task completed");
            resolve();
        }, 1000);
    });
}

function third() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Third task completed");
            resolve();
        }, 1000);
    });
}

async function runTasks() { // The keyword async before a function makes the function return a promise.
    await first();
    await second();
    await third();
    console.log("All tasks completed");
}

runTasks();
