const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be provided'],
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
    },
})

module.exports = mongoose.model('userInfo', userSchema)

