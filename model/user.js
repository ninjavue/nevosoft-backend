const { Schema, model } = require('mongoose')


const User = new Schema({
    name: String,
    chatId: Number,
    phone: String,
    username: String,
    admin: {
        type: Boolean,
        default: false
    },
    action: String,
    createdAt: Date,
    status: {
        type: Boolean,
        default: true
    }
})


module.exports = model('User', User)