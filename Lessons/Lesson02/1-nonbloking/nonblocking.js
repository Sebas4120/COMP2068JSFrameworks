//This is a asynchronous (non-blocking) version of the program
//In this version we use the asynchronous version of the read file method
//and instead of storing the values in a variable, we will use 'callback' functions to tell the program what to do with the data once it is available
//Import the fs module
const fs = require('fs');

// we'll use the asynchronous version of the method
// by default methods are asynchronous in node
// this methods needs a third parameter: a callback function that will execute when fs is done reading the file
// this callback function needs two parameters: error and the contents of the file
console.log("Food data source contents:")
fs.readFile('food.txt', 'utf-8', (error, data) => {
    console.log(data);
});

// Read smaller file (drinks.txt) asynchronously AND pass a callback function to handle outputting
console.log('We drank all this stuff for breakfast');
fs.readFile('drinks.txt', 'utf-8', (error, drinks) => {
    //This callback function is invoked once the reading operation is completed
    //all contents of the file will be stored in the 'data' variable
    console.log(drinks);
});

// what is the actual output?
// Actual: line11 > line17 > food.txt > drinks.txt

// -> Asynchronous programming does not guaranteed order of execution

// When do we have to use it in the real world?
// When you have a large number of operations that can be done in parallel
// When you have operations that are not dependent on each other
// When you do not care about the order of execution and want to optimize performance