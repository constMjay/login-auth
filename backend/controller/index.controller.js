const dashboardPort = require('../model/dashboard');


const renderHomepage = async (req, res) => {
    const post = await dashboardPort.find();

    res.render('index', {
        posts: post
    })
}


module.exports = renderHomepage