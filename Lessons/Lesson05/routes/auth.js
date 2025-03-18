const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email });

        await User.register(newUser, password);
        req.flash('success_msg', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (err) {
        req.flash('error_msg', err.message);
        res.redirect('/register');
    }
});

// Login route (Local)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// GitHub OAuth login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'Logged out successfully');
        res.redirect('/login');
    });
});

module.exports = router;