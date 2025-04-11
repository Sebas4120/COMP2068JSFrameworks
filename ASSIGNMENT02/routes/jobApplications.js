const express = require("express");
const router = express.Router();
const JobApplication = require("../models/jobApplication");
const AuthenticationMiddleware = require("../extensions/authentication");
const { ensureAuthenticated } = require("../middlewares/auth"); // Middleware for authentication

// GET /job-applications/
router.get("/",ensureAuthenticated, async (req, res, next) => {
  try {
    const jobApplications = await JobApplication.find({ user: req.user._id }); // filter by user
    res.render("jobApplications/index", {
      title: "My Job Applications",
      dataset: jobApplications,
      user: req.user._id,
    });
  } catch (err) {
    res.status(500).send("Error fetching job applications");
  }
});



// GET /job-applications/add
router.get("/add", ensureAuthenticated, AuthenticationMiddleware, (req, res, next) => {
  res.render("jobApplications/add", { title: "Add a New Job Application", user: req.user });
});

//POST/add
router.post("/add", ensureAuthenticated, AuthenticationMiddleware, 
  async (req, res, next) => {
    try {
      let newJob = new JobApplication({
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        status: req.body.status,
        notes: req.body.notes,
        user: req.user._id,
      });
      // Save the job application to the database
      await newJob.save();
      res.redirect("/jobApplications");
    } catch (err) {
      console.error("Error saving job application:", err);
      res.status(500).send("Error saving job application");
    }
  }
);


// GET /job-applications/delete/:id
router.get("/delete/:id", ensureAuthenticated, AuthenticationMiddleware, async (req, res, next) => {
  let jobApplication = await JobApplication.findById(req.params.id);
  if (!jobApplication) {
    return res.redirect("/jobApplications"); // Redirect if job doesn't exist
  }
  res.render("jobApplications/delete", {
    title: "Delete Job Application",
    jobApplication,
    user: req.user._id,
  });
});

// POST /job-applications/delete/:id (Delete record)
router.post("/delete/:id", ensureAuthenticated, AuthenticationMiddleware, async (req, res, next) => {
  await JobApplication.findByIdAndDelete(req.params.id);
  res.redirect("/jobApplications");
});

// GET /job-applications/edit/:id
router.get("/edit/:id", ensureAuthenticated, AuthenticationMiddleware,
   async (req, res, next) => {
  let jobId = req.params.id;
  let jobData = await JobApplication.findById(jobId);
  res.render("jobApplications/edit", {
    title: "Edit Job Application",
    jobApplication: jobData,
    user: req.user._id,
  });
});

// POST /job-applications/edit/:id
router.post(
  "/edit/:id",
  ensureAuthenticated, 
  AuthenticationMiddleware, 
  async (req, res, next) => {
    try {
      const jobId = req.params.id;

      // Initialize the update data
      const updateData = {
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        status: req.body.status,
        notes: req.body.notes,
        user: req.user._id,
      };
      // Update the job application in the database
      await JobApplication.findByIdAndUpdate(jobId, updateData);

      // Redirect to the job applications list
      res.redirect("/jobApplications");
    } catch (err) {
      console.error("Error updating job application:", err);
      res.status(500).send("Error updating job application");
    }
  }
);

// POST route for search
router.post("/search", async (req, res) => {
  const { jobTitle, status, datePosted } = req.body;
  let query = {};

  if (jobTitle) query.jobTitle = { $regex: jobTitle, $options: "i" }; // Case-insensitive search
  if (status) query.status = status;

  if (datePosted) {
    let dateLimit;
    if (datePosted === "7-days") {
      dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - 7);
    } else if (datePosted === "30-days") {
      dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - 30);
    } else if (datePosted === "this-month") {
      dateLimit = new Date();
      dateLimit.setDate(1); // Start of this month
    }

    if (dateLimit) query.appliedDate = { $gte: dateLimit };

    console.log(query);
  }

  try {
    const applications = await JobApplication.find(query); // Fetching filtered data
    res.render("jobApplications/index", { title: "Job Applications", dataset: applications });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching job applications.");
  }
});

module.exports = router;