var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Portfolio', headerTitle: 'Hey, I am Sebastian Aguirre',
    headerDescription: 'Discover my work and projects.'});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', bodyClass: 'about' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', bodyClass: 'projects' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', bodyClass: 'contact' });
});

module.exports = router;
