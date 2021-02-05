const DashboardPost = require('../model/dashboard');

const renderDashboard = async (req, res) => {
    res.render('dashboard')
}
const renderDashboardPost = async (req, res) => {
    const postedArticle = await DashboardPost.find().select('text title articleImage dateCreated slug')

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
        res.status(200).json(postArticle)
    } catch (error) {
        console.log('Creating Article Post Error Occured:', error)
    }

}
/**
 * After Posting Article Redirect to its query params
 */
const renderDashboardPostById = async (req, res) => {
    const post = await DashboardPost.findOne({ slug: req.params.slug })

    if (post == null) res.redirect('/')
    res.render('posts/postById', {
        posts: post
    })
}
module.exports = {
    renderDashboard,
    renderDashboardPost,
    renderDashboardPostById,
    dashboardPost,
    renderNewPost
}
