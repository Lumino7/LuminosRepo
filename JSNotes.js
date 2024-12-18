/*
JS primitive types:
1. String
2. Number
3. Bigint
4. Boolean
5. Undefined
6. Null
7. Symbol
8. Object (Arrays are special objects, using numbered indices instead of keys.)
*/

// multiple statements on one line are allowed:
    a = 5; b = 6; c = a + b;

//white spaces are ignored. Even line breaks.
    document.getElementById("demo").innerHTML =
    "Hello Dolly!";

//{} contains code blocks, statements to be executed together. e.g. functions.

//variable names can only start with a letter, $ or _.

//const variables must be assigned a value when they are declared.

//If you add a number and a string, the number will be treated as a string.

//JavaScript evaluates expressions from left to right. Different sequences can produce different results:

    let x = 16 + 4 + "Volvo";
    Result: "20Volvo"

    let x = "Volvo" + 16 + 4;
    Result: "Volvo164"

//A variable without a value, has the value undefined. The type is also undefined.
    let car;    // Value is undefined, type is undefined

//Any variable can be emptied by setting the value to undefined. The type will also be undefined.
    car = undefined;    // Value is undefined, type is undefined

//Function parameters are listed inside the parentheses () in the function definition.

//Function arguments are the values received by the function when it is invoked.

//Calling a function without () returns the function and not the function result:
    let value = toCelsius;
    result: value == function toCelsius(f) { return (5/9) * (f-32); }

// Escape character for strings: \
let doubleQuote = "He said, \"Hello!\"";

// Template strings using `` allows use of either ' or " and allows for multiline strings.
// Also used for interpolation
let doubleQuote = `"He said, "Hello ${interpolation}!""`; //interpolation can be any expression e.g. variable.

// NaN is number type. Same with Infinity.

// Arithmetic between a BigInt and a Number is not allowed.

// BigInt cannot have decimals.

// Strings are compared (e.g. when sorting arrays) using the unicode of their initial characters.
// So when "100" and "20" are compared, 20 is greater because 2 comes after 1. This also applies to Python.

//pop() removes the last element and returns the popped element.
//shift() removes the first element and "shifts" all other elements to a lower index, and returns the removed element.
//unshift() adds an element to the start and "unshifts" all other elements to a higher index, and returns the new array length.
//push() adds an element to the end and returns the new array length:

// map() vs flatMap
//map: It applies a function to each element of an array and returns a new array with the results.

//flatMap(): It first maps each element using a mapping function, then flattens the result into a new array. It's useful when you want to map over an array and then flatten the result into a single array.
const words = ['hello', 'world', 'open', 'ai'];
const result = words.map(word => word.split(''));
// result would be [['h', 'e', 'l', 'l', 'o'], ['w', 'o', 'r', 'l', 'd'], ['o', 'p', 'e', 'n'], ['a', 'i']]
const result = words.flatMap(word => word.split(''));
// result would be ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd', 'o', 'p', 'e', 'n', 'a', 'i']

// ... = spread/rest operator
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6];
console.log(arr2); // Output: [1, 2, 3, 4, 5, 6]
//allows a function to treat an indefinite number of arguments as an array:
function sum(...args) {
}

// In JS dates, day 0 is Sun.

// ternary statement
variablename = (condition) ? value1:value2 //returns 1st argument if condition is true

// Nullish Coalescing Operator
// returns the first argument if it's not falsy
let variableName = value1 ?? value2

// Optional Chaining
let name = user.profile?.name; //will only run the code on the right of the ? if the code on the left is not falsy. Otherwise will return undefined and prevent runtime errors.

// Use if-else instead of switch statements if you need the conditions to be complex with > or <

// for in loops over keys and their corresponding values. ie you can then use the keys in the iterations. for of only loops over values.
// for(item, index) in items: if you want to use the index of the item in an array.

// Use Array.forEach for arrays, don't use native for loop as it may not iterate it in the right order.

// Objects: Comma-separated key-value pairs.
const myObject = {
  name: 'Alice',
  age: 30,
  city: 'Wonderland'
};

// Maps allow any data type (even objects and functions) as keys, and the insertion order is maintained.
const myMap = new Map();
const objKey = { id: 1 };
const numKey = 42;
const strKey = 'key';
const boolKey = true;
// Adding key-value pairs with mixed data types as keys
myMap.set(objKey, 'Object Key');
myMap.set(numKey, 'Number Key');
myMap.set(strKey, 'String Key');
myMap.set(boolKey, 'Boolean Key');

//destructuring is a convenient way to extract values from arrays or properties from objects and assign them to variables.
const fruits = ['apple', 'banana', 'orange'];
const [firstFruit, , thirdFruit] = fruits; //elements can be skipped
console.log(firstFruit);  // Output: apple
console.log(thirdFruit);  // Output: orange
//can also be used on objects
const person = {
  name: 'John',
  age: 30,
  country: 'USA'
};
const { name, age:ageInYears, country } = person; //can use other variable name.
console.log(name);    // Output: John
console.log(ageInYears);     // Output: 30
console.log(country); // Output: USA
//easy way to swap variables without needing a temp variable
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // Output: 2
console.log(b); // Output: 1



// instanceof returns true if a value/variable is an instance of an custom/built-in class.
variable instanceof objectName
const arr = [1, 2, 3];
console.log(arr instanceof Array); // Output: true

//typeof returns the type of a variable:
type = typeof(variable)

// try catch throw finally
function processData(data) {
    try { //code that might throw an exception
      if (!data) {
        throw new Error('No data provided'); // throw makes a custom Error object and then immediately exits the try block and skips to the next catch block.
      }
      console.log('Data is:', data);
    } catch (error) { //code executed if an error occurs in the try block
      console.error('Error:', error.message); // Handles the error
    } finally {
        // Code that always runs, regardless of success or failure
        console.log('Execution completed.');
    }
  }

  processData(); // Output: Error: No data provided



// Arrow functions have no this, super, and no arguments object.
const add = (a, b) => a + b;

// assigning function default parameter values:
function myFunction(x, y = 10) {
  }

// JavaScript functions have a built-in arguments object, contains an array of the arguments passed.
//...args is more preferred as arguments object doesn't have all the functionalities of an array.
function listArgs(...args) {
  console.log(args);
}

// JavaScript arguments for primitive types are passed by value: Changes to arguments are not reflected outside the function.
function modifyValue(value) {
  value = 100; // Change the local copy
  console.log("Inside function:", value); // Output: Inside function: 100
}

let num = 50;
console.log("Before function call:", num); // Output: Before function call: 50
modifyValue(num);
console.log("After function call:", num); // Output: After function call: 50

// Meanwhile, objects are passed by reference: Changes to object properties are reflected outside the function.
function modifyObject(obj) {
  obj.property = "new value"; // Modify the object property
  console.log("Inside function:", obj.property); // Output: Inside function: new value
}

let myObject = { property: "original value" };
console.log("Before function call:", myObject.property); // Output: Before function call: original value
modifyObject(myObject);
console.log("After function call:", myObject.property); // Output: After function call: new value

// A callback is a function passed as an argument to another function. Pass them without parentheses. Putting parentheses executes the function.
setTimeout(sayHello, 3000);

// When passing arguments to a callback function, wrap it inside an anonymous function/arrow function.
// Because if you pass it with the arguments in parentheses, it will just execute the function instead of passing it.
element.addEventListener("click", function() { //In this situation, the code is supposed to wait for the click event before executing the callback function.
    myFunction("argument1", "argument2");
});


// In JSON, unlike in JS, keys MUST be strings (in " "). Use JSON.stringify to convert a JS object into JSON, and JSON.parse for vice versa.

// Event bubbling vs event capturing: determine the order in which event handlers are executed when an event occurs on a nested(overlapping) HTML element.
addEventListener(event, handler). //Bubbling (default). The event propagates from the target element up through its ancestors.
addEventListener(event, handler, true). //Capturing. Starts from the outermost ancestor and moves down to the target element.

// insertBefore() inserts a node as a child before a specified existing node, as opposed to appendChild() which inserts it at the end.
parentNode.insertBefore(newNode, existingNode);

// replaceChild
parentNode.replaceChild(newChild, oldChild);


