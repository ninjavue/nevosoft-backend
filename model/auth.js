const { Schema, model } = require('mongoose')


const Auth = new Schema({
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin:{
        type: Boolean,
        default: false
    },
    createdAt: Date,
    status:{
        type: Boolean,
        default: true
    }
})

module.exports = model('Auth', Auth)