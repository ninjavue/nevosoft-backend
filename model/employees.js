const { Schema, model } = require('mongoose')


const Emplooye = new Schema({
    full_name: String,
    img: {
        type: [String],
        required: true
    },
    salary: String,
    job: String,
    createdAt: Date,
    status:{
        type: Boolean,
        default: true
    }
})

module.exports = model('Emplooye', Emplooye)