//Import the modules

var prompt = require('prompt');
prompt.start();


//Ask user to enter an input

prompt.get([{
  name: 'choice',
  description: 'Welcome to my game! please, choose an option: (1) Rock / (2) Paper / (3) Scissors',
  required: true,
  conform: function (value){
    const num = Number(value)
    return num === 1 || num === 2 || num === 3;
  }
}], function (err, result) {

  if(err){
    console.error('Error:',err);
    return;
  }

  //Mapping user selection

  const choices ={
    '1' : 'Rock',
    '2' : 'Paper',
    '3' : 'Scissors'
  }

  //Convert user choice to a string 
  const userSelection = choices[result.choice]
  
  // Log the results of the user.

  console.log('User selection: ' + userSelection);

  // Generate the computer's answer (using random function between 0 and 1)
  const randomNumber = Math.random();
  let computerSelection;

  if (randomNumber <= 0.34){
    computerSelection = 'Rock';
  }else if (randomNumber <= 0.67){
    computerSelection = 'Scissors';
  }else{
    computerSelection = 'Paper';
  }

  console.log('Computer selection:' + computerSelection);


  // Determine the winner using conditionals (if-else)

  let resultMessage = '';

  if(userSelection === computerSelection){
    resultMessage = "It is a tie!"
  }else if(
  (userSelection === 'Rock' && computerSelection === 'Scissors')||
  (userSelection === 'Scissors' && computerSelection === 'Paper') ||
  (userSelection === 'Paper' && computerSelection === 'Rock')
  ){
    resultMessage = "User wins!!"
  }else{
    resultMessage = "Computer wins!!"
  }

  //Display the results

  console.log(resultMessage);


});