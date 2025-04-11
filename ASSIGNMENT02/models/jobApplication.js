const mongoose = require("mongoose");

const jobApplicationSchema = mongoose.Schema({
  companyName: { type: String, required: true },  // Name of the company
  jobTitle: { type: String, required: true },     // Job position
  appliedDate: { type: Date, default: Date.now }, // Date when the application was submitted
  status: { 
    type: String, 
    enum: ["Applied", "Interview Scheduled", "Offer Received", "Rejected"], 
    default: "Applied" 
  }, // Status of the application
  notes: { type: String },  // Additional notes for the job application
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);