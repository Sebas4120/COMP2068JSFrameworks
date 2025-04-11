var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// Router Objects
var indexRouter = require("./routes/index");
var projectsRouter = require("./routes/projects");
var coursesRouter = require("./routes/courses");
// Import the jobApplications routes
var jobApplicationsRouter = require("./routes/jobApplications");
// var usersRouter = require('./routes/users');



// Import MongoDB and Configuration modules
var mongoose = require("mongoose");
var configurations = require("./configs/globals");


// HBS Helper Methods
var hbs = require("hbs");
// Import passport and session modules
var passport = require('passport');
var session = require('express-session');
// Import user model
var User = require('./models/user');
// Import GitHub Strategy
var githubStrategy = require("passport-github2").Strategy;
// Express App Object
var app = express();

// Session middleware (Add this before Passport.js)
app.use(session({
  secret: configurations.Session.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

// Passport session middleware
app.use(passport.initialize());
app.use(passport.session());

// GitHub login route
app.get("/auth/github", passport.authenticate("github"));

// GitHub callback route (the redirect URI you set in GitHub)
app.get("/auth/github/callback", passport.authenticate("github", {
  successRedirect: "/jobApplications", // Redirect to projects  after successful login
  failureRedirect: "/login" // Redirect to login page if authentication fails
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// Express Configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Configure passport module https://www.npmjs.com/package/express-session
app.use(session({
  secret: 's2021pr0j3ctTracker',
  resave: false,
  saveUninitialized: false
}));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Link passport to the user model
passport.use(User.createStrategy());
// configure github strategy
passport.use(new githubStrategy(
  // options object
  {
    clientID: configurations.Authentication.GitHub.ClientId,
    clientSecret: configurations.Authentication.GitHub.ClientSecret,
    callbackURL: configurations.Authentication.GitHub.CallbackURL
  },
  // callback function
  // profile is github profile
  async (accessToken, refreshToken, profile, done) => {
    // search user by ID
    const user = await User.findOne({ oauthId: profile.id });
    // user exists (returning user)
    if (user) {
      // no need to do anything else
      return done(null, user);
    }
    else {
      // new user so register them in the db
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      // add to DB
      const savedUser = await newUser.save();
      // return
      return done(null, savedUser);
    }
  }
));
// Set passport to write/read user data to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routing Configuration
app.use("/", indexRouter);
app.use("/projects", projectsRouter);
app.use('/courses', coursesRouter);
app.use("/jobApplications", jobApplicationsRouter);
// app.use('/users', usersRouter);




// Connecting to the DB
mongoose.connect(configurations.ConnectionStrings.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((message) => console.log("Connected to my Mongo DB!"))
  .catch((error) => console.log(`Error while connecting: ${error}`));
// Sub-Expressions https://handlebarsjs.com/guide/builtin-helpers.html#sub-expressions
// function name and helper function with parameters


// Register 'eq' helper for comparing two values
hbs.registerHelper("eq", (a, b) => a === b);

// Register helper to create an option element
hbs.registerHelper("createOptionElement", (currentValue, selectedValue) => {
  console.log(currentValue + " " + selectedValue);
  // initialize selected property
  var selectedProperty = "";
  // if values are equal set selectedProperty accordingly
  if (currentValue == selectedValue.toString()) {
    selectedProperty = "selected";
  }
  // return html code for this option element
  // return new hbs.SafeString('<option '+ selectedProperty +'>' + currentValue + '</option>');
  return new hbs.SafeString(
    `<option ${selectedProperty}>${currentValue}</option>`
  );
});
// helper function to format date values
hbs.registerHelper('toShortDate', (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;