const { Schema, model } = require('mongoose')

const Type =  new Schema({
    name: {
        uz: String,
        ru: String,
        en: String,
    },
    createdAt: Date,
    status: {
        type: Boolean,
        default: true
    },
})

module.exports = model('Type', Type)