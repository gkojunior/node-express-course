const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'please provide a task'],
        minlength: 3,
        maxlength: 20
    },
   
})

module.exports = mongoose.model('Task', taskSchema)