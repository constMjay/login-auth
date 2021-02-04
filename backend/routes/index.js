const express = require('express');
const { checkUser } = require('../middleware/auth');
const renderHomepage = require('../controller/index.controller');
const router = express.Router();


router.get('/', checkUser, renderHomepage);

module.exports = router