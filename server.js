const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config()



/**
 * Mongodb connection
 */
const url = process.env.MONGODB_URL || process.env.URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database!"))
    .catch(err => console.log(err))
/**
 * Import Routes
 */
const formRoutes = require('./backend/routes/user');
const userDashboardRoutes = require('./backend/routes/dashboard')
const homepageRoutes = require('./backend/routes/index')
/**
 * View Engine Setup & Public Folder Setup
 */
app.set('views', path.join(__dirname, 'backend/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'frontend/assets')))
app.use(express.static(path.join(__dirname, 'frontend/assets/upload')))

/**
 * Middleware
 */
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


/**
 * Routes
 */
app.use(formRoutes);
app.use('/', userDashboardRoutes)
app.use(homepageRoutes)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Listening on port: ${process.env.PORT}`)
})
