var express = require('express');
var router = express.Router();

var Project = require("../model/project")

/* GET home page. */
router.get('/', function(req, res, next) {
  var projects = Project.find();
  res.render('index', { title: 'Express' });
});

module.exports = router;
