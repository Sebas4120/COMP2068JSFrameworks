// An open function is just a regular Javascript function
// In this example we want to have a function that keeps a count

function count(){
  //local scope variable, set to 0
  let counter = 0;
  counter++;
  console.log(counter)
}

//call twice, what is the output
count();
count();
