// This is a synchronous (blocking) program
//Execution goes from top to bottom
//Import fs module to access the file system
// declare a variable with the same name as the name being imported
const fs = require('fs');

// read two text files and output the contents
// readFileSync is the blocking version of this code
// it needs two parameters: file to read, and encoding
let food = fs.readFileSync('food.txt', 'utf-8');
// Output contents of the larger file
console.log('Food data source contents:');
console.log(food);


//Read the smaller file (drink.txt) synchronously
let drinks = fs.readFileSync('drinks.txt', 'utf-8');

//Output contents of the smaller file
console.log('Drink data source contents');
console.log(drinks);

//This is a blocking program, execution is synchronous which guarantees the order of execution

// What will the output look like? 
// What will the order of the outputs be?
// In this example our code executes in sequence and nothing happens until each line finishes
