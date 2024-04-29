const { Schema, model } = require('mongoose')


const Order = new Schema({
    name: String,
    phone: String,
    description: String,
    typeId: String,
    createdAt: Date,
    status: {
        type: Boolean,
        default: true
    },
    messageId: {
        type: Number,
        unique: true
    }
})


module.exports = model('Order', Order)