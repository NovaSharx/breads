// Dependencies

const mongoose = require('mongoose')
const {Schema} = mongoose

// Schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
})

// Model and Export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker