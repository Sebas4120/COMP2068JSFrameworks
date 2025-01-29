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
  const userChoice = choices[result.choice]
  
  // Log the results of the user.

  console.log('User selection: ' + userChoice);



  // Generate the computer's answer (using random function between 0 and 1)
  const randomNumber = Math.random();
  let computerChoice;

  if (randomNumber <= 0.34){
    computerChoice = 'Rock';
  }else if (randomNumber <= 0.67){
    computerChoice = 'Scissors';
  }else{
    computerChoice = 'Paper';
  }

  console.log('Computer selection:' + computerChoice);


  // Determine the winner using conditionals (if-else)

  let resultMessage = '';

  if(userChoice === computerChoice){
    resultMessage = "It is a tie!"
  }else if(
  (userChoice === 'Rock' && computerChoice === 'Scissors')||
  (userChoice === 'Scissors' && computerChoice === 'Paper') ||
  (userChoice === 'Paper' && computerChoice === 'Rock')
  ){
    resultMessage = "User wins!!"
  }else{
    resultMessage = "Computer wins!!"
  }

  console.log(resultMessage);


});

