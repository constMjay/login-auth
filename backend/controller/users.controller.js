const bcrypt = require('bcrypt');
const { Users } = require('../model/users');
const { validateFormRegister, validateFormLogin } = require('../services/validation');


const maxAge = 3 * 24 * 60 * 60

const renderHomepage = async (req, res) => {
    res.render('index')
}

const renderRegister = (req, res) => {
    res.render('register')
}
const renderLogin = (req, res) => {
    res.render('login')
}
const registerUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        /**
         * Validation Form CLient Side
         */
        const { error } = validateFormRegister(req.body)
        if (error) return res.status(400).json({ isError: error.details[0].message })

        /**
         * Validate if email already exist
         */
        const isValidEmail = await Users.findOne({ email: email })
        if (isValidEmail) return res.status(400).json({ isError: "User's email already exist." })

        /**
        * Create Users
        */
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await Users.create({ email: email, password: hashPassword })

        /**
         * Create Token where user model is
         */
        const token = user.generateAuthToken(maxAge)

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).send({ _id: user._id, email: user.email })

    } catch (error) {
        console.log("Creating user error occured at register.controller:", error)
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        /**
         * Validate Form From Client
         */
        const { error } = validateFormLogin(req.body)
        if (error) return res.status(400).json({ isError: error.details[0].message })

        const user = await Users.findOne({ email: email }) // Find Email if Exist

        if (user) {
            const auth = await bcrypt.compare(password, user.password); //If user is true compare password
            if (auth) {
                /**
                 * If auth is true send a user id and create a token
                 */
                const token = user.generateAuthToken(maxAge)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                res.status(200).json({ user: user._id })
            } else {
                res.status(400).json({ isError: 'Incorrect password.' })
            }
        } else {
            res.status(400).json({ isError: 'Invalid Email.' })
        }
    } catch (error) {
        console.log('Logging in user failed:', error.message)
    }
}
const logoutUser = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

const getUsers = async (req, res) => {
    const user = await Users.find();

    res.status(200).send(user)
}
module.exports = {
    registerUser,
    renderRegister,
    renderLogin,
    renderHomepage,
    loginUser,
    logoutUser,
    getUsers
}
