const express = require("express");
const router = express.Router();
const JobApplication = require("../models/jobApplication");
const AuthenticationMiddleware = require("../extensions/authentication");

// GET /job-applications/
router.get("/", async (req, res, next) => {
  let jobApplications = await JobApplication.find().sort([["appliedDate", "descending"]]);
  res.render("jobApplications/index", {
    title: "Job Applications Tracker",
    dataset: jobApplications,
    user: req.user,
  });
});

// GET /job-applications/add
router.get("/add", AuthenticationMiddleware, (req, res, next) => {
  res.render("jobApplications/add", { title: "Add a New Job Application", user: req.user });
});

// POST /job-applications/add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  let newJob = new JobApplication({
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    status: req.body.status,
    notes: req.body.notes,
  });
  await newJob.save();
  res.redirect("/job-applications");
});

// GET /job-applications/delete/:id
router.get("/delete/:id", AuthenticationMiddleware, async (req, res, next) => {
  let jobId = req.params.id;
  await JobApplication.findByIdAndRemove(jobId);
  res.redirect("/job-applications");
});

// GET /job-applications/edit/:id
router.get("/edit/:id", AuthenticationMiddleware, async (req, res, next) => {
  let jobId = req.params.id;
  let jobData = await JobApplication.findById(jobId);
  res.render("jobApplications/edit", {
    title: "Edit Job Application",
    jobApplication: jobData,
    user: req.user,
  });
});

// POST /job-applications/edit/:id
router.post("/edit/:id", AuthenticationMiddleware, async (req, res, next) => {
  let jobId = req.params.id;
  await JobApplication.findByIdAndUpdate(jobId, {
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    status: req.body.status,
    notes: req.body.notes,
  });
  res.redirect("/job-applications");
});

module.exports = router;