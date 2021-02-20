const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    postedBy: {
        type: Object
    },
    dateCreated: {
        type: Date,
        default: Date
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

/**
 * Transform our id into a text using slugify
 */
dashboardPostSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

const dashboardPost = mongoose.model('Post', dashboardPostSchema);

module.exports = dashboardPost