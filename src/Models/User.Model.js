const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        index: { unique: true },
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task