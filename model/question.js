const {Schema, model} = require('mongoose')



const question = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
})


module.exports = model('Question', question)