//This is a app that uses Express.js
//Import the express module
const express = require("express");

//Create an app object
const app = express();

//Define a route for the home page
app.get("/",(req,res)=>{
  res.send("Hello World!");
});
//Start the server bu listening to a port 3000
app.listen(3000,()=> {
  console.log("Server is running http://localhost:3000")
})