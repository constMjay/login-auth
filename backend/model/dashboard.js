const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const dashboardPostSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    articleImage: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})


const dashboardPost = mongoose.model('Post', dashboardPostSchema);

module.exports = dashboardPost