//Mongoose Model
//Schema enforcement is done at the application level.
//This file defines the schema for the project model
//Require Mongoose
const mongoose = require("mongoose");
//Create a schema object
const schemaObject = {
  name:{type: String, required: true},
  dueDate:{type: Date},
  course:{type:String, required: true},
  status:{type:String, default:"To do"},
}
//Create a mongoose schema
const mongooseSchema = mongoose.Schema(schemaObject);
//Create and export a mongoose model
module.exports = mongoose.model("Project", mongooseSchema);