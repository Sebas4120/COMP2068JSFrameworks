//This is my application-level configuration object
//Require and initialize dotenv
require("dotenv").config();
//Create a configuration object
const configurations = {
  ConnectionStrings:{
    MongoDB: process.env.CONNECTION_STRING_MONGODB
  }
}
//Export the configuration object
module.exports = configurations;