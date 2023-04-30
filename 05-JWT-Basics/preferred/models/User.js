const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be provided'],
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
    },
})

module.exports = mongoose.model('User', UserSchema)

