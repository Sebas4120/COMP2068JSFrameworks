//Hello World Console App with Node.js
//Most syntax is the same as JavaScript for the browser
//console.log('Hello world!');

//Import the modules

var prompt = require('prompt');
prompt.start();


//Ask user to enter an input

prompt.get([{
  name: 'userChoice',
  description: '(1) Rock / (2) Paper / (3) Scissors',
  required: true,
  integer: true,
  conform: function (value){
    return value === 1 || value === 2 || value === 3;
  }
}], function (err, result) {

  // Log the results of the user.

console.log('User selection: ');

let userChoice = '';
switch (result.userChoice){
  case 1:
    userChoice = 'Rock';
    break;
  
  case 2:
    userChoice = 'Paper';
    break;

  case 3:
    userChoice = 'Scissors';
    break;  
}

// Generate the computer's answer (using random function between 0 and 1)
const randomNumber = Math.random();
let computerChoice = '';

if (randomNumber <= 0.34){
  computerChoice = 'Rock';
}else if (randomNumber <= 0.67){
  computerChoice = 'Scissors';
}else{
  computerChoice = 'Paper';
}

console.log('Computer selection:' + computerChoice);















});

//Generate computer answer by Math.random() function to generate a number as computerSelection


//Make a conditional to compare both response and get a winner


//Display the winner/loser/tie