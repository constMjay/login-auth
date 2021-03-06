const express = require('express');
const { registerUser, renderRegister, renderLogin, loginUser, logoutUser } = require('../controller/users.controller')
const router = express.Router();

/**
 * Render Routes
 */

router.get('/register', renderRegister)
router.get('/login', renderLogin)


/**
 * Action Routes
 */
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
/**
 * Cookies
 */
router.get('/set-cookies', (req, res) => {
    res.cookie('newUser', false);
    res.cookie('isAdmin', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send("you got the new user!")
})
router.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;

    res.json(cookies)
})
module.exports = router