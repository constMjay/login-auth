const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const usersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

/**
 * Users Auth
 */
usersSchema.methods.generateAuthToken = function (tokenExpiration) {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.SECRET_KEY, { expiresIn: tokenExpiration })
    return token
};
// usersSchema.methods.loginAuth = async function (email, password) {
//     const user = await this.findOne({ email: email });

//     if(user)
// };
const Users = mongoose.model('Users', usersSchema);

module.exports = {
    Users
};