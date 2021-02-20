const DashboardPost = require('../model/dashboard');

const renderDashboard = async (req, res) => {
    res.render('dashboard')
}
const renderDashboardPost = async (req, res) => {
    res.render('posts/post')
}
const renderNewPost = async (req, res) => {
    res.render('posts/new')
}
const getAllPosts = async (req, res) => {
    const posts = await DashboardPost.find();

    res.status(200).json({ posts: posts })
}
/**
 * Post a new article
 */

const dashboardPost = async (req, res) => {
    const { postText, postTitle } = req.body
    const fileUploaded = req.file.filename;
    const { user } = res.locals

    try {
        const postArticle = await DashboardPost.create({ title: postTitle, text: postText, articleImage: fileUploaded, postedBy: user })
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
/**
 * Controller for Like & Unlike Post
 */
const likePost = async (req, res) => {
    const { user } = res.locals
    const { id } = req.body;

    const post = await DashboardPost.findByIdAndUpdate(id, {
        $push: {
            likes: user._id
        }
    }, {
        new: true
    })


    res.status(200).send(post)


}
const unlikePost = async (req, res) => {
    const { user } = res.locals
    const { id } = req.body;

    const post = await DashboardPost.findByIdAndUpdate(id, {
        $pull: {
            likes: user._id
        }
    }, {
        new: true
    })
    res.status(200).send(post)
}
/**
 * Delete Post
 */
const deletePost = async (req, res) => {
    const { id } = req.body;

    await DashboardPost.findByIdAndDelete(id);
    res.status(200).send({ message: 'Post Deleted.' })
}
module.exports = {
    renderDashboard,
    renderDashboardPost,
    renderDashboardPostById,
    getAllPosts,
    dashboardPost,
    renderNewPost,
    likePost,
    unlikePost,
    deletePost
}
