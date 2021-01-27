const express = require('express');
const { requireAuth, checkUser } = require('../middleware/auth');
const { renderDashboard, dashboardPost } = require('../controller/user.dashboard.controller')
const router = express.Router();




router.get('/dashboard', requireAuth, checkUser, renderDashboard);
router.post('/dashboard/post', requireAuth, checkUser, dashboardPost)


module.exports = router