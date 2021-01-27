const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const dashboardPostSchema = new Schema({
    postText: {
        type: String,
    }
})


const dashboardPost = mongoose.model('Post', dashboardPostSchema);

module.exports = dashboardPost