const jwt = require('jsonwebtoken');
const { Users } = require('../model/users');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    /**
     * Check the the token is exist and is verified
     */
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                next() //If error is not true then proceed to next middleware
            }
        })
    } else {

        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    /**
     * Check the the token is exist and is verified
     */
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next();
            } else {
                let user = await Users.findById(decodedToken._id)
                res.locals.user = user
                next() //If error is not true then proceed to next middleware
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
}