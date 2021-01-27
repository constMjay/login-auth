const DashboardPost = require('../model/dashboard');

const renderDashboard = async (req, res) => {
    res.render('dashboard')
}
const dashboardPost = async (req, res) => {
    const { postText } = req.body

    const post = await DashboardPost.create({ postText: postText })
    if (post) res.status(200).send(post)
}

module.exports = {
    renderDashboard,
    dashboardPost
}
