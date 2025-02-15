var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Portfolio', headerTitle: 'Hey!, I\'m Sebastian Aguirre',
    headerDescription: 'Discover my work and projects.'});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', headerTitle: 'About Me',
    headerDescription: 'Learn more about my background and experience.' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', headerTitle: 'My projects',
    headerDescription: 'Here are some of the projects I have worked on' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', headerTitle: 'Contact Me',
    headerDescription: 'Get in touch with me.' });
});

module.exports = router;
