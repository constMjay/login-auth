const express = require('express');
const multer = require('multer');

const router = express.Router();
const uploadFiles = require('../middleware/uploadFiles');
const { requireAuth, checkUser } = require('../middleware/auth');
const { renderDashboard, renderNewPost, renderDashboardPost, dashboardPost } = require('../controller/user.dashboard.controller')



/**
 * Render Routes
 */
router.get('/dashboard', requireAuth, checkUser, renderDashboard);
router.get('/dashboard/post', requireAuth, checkUser, renderDashboardPost);
router.get('/dashboard/post/new', requireAuth, checkUser, renderNewPost);


/**
 * Action Routes Post Articles
 */

router.post('/dashboard/post/new', requireAuth, checkUser, uploadFiles, dashboardPost)


module.exports = router