const DashboardPost = require('../model/dashboard');

const renderDashboard = async (req, res) => {
    res.render('dashboard')
}
const renderDashboardPost = async (req, res) => {
    const postedArticle = await DashboardPost.find().select('text title articleImage')

    res.render('posts/post', {
        articles: postedArticle
    })
}
const renderNewPost = async (req, res) => {
    res.render('posts/new')
}

/**
 * Post a new article
 */


const dashboardPost = async (req, res) => {
    const { postText, postTitle } = req.body
    const fileUploaded = req.file.filename;


    try {
        const postArticle = await DashboardPost.create({ title: postTitle, text: postText, articleImage: fileUploaded })
        res.status(200).json({ postArticle: postArticle })
    } catch (error) {
        console.log('Creating Article Post Error Occured:', error)
    }

}

module.exports = {
    renderDashboard,
    renderDashboardPost,
    dashboardPost,
    renderNewPost
}
