const {Schema, model} = require('mongoose')



const product = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
})


module.exports = model('Product', product)