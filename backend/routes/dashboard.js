const express = require('express');
const router = express.Router();
const uploadFiles = require('../middleware/uploadFiles');
const { requireAuth, checkUser } = require('../middleware/auth');
const { renderDashboard, renderNewPost, renderDashboardPost, renderDashboardPostById, dashboardPost } = require('../controller/user.dashboard.controller')



/**
 * Render Routes
 */
router.get('/dashboard', requireAuth, checkUser, renderDashboard);
router.get('/dashboard/post', requireAuth, checkUser, renderDashboardPost);
router.get('/dashboard/post/new', requireAuth, checkUser, renderNewPost);
router.get('/dashboard/post/:slug', requireAuth, checkUser, renderDashboardPostById);


/**
 * Action Routes Post Articles
 */

router.post('/dashboard/post/new', requireAuth, checkUser, uploadFiles, dashboardPost)


module.exports = router