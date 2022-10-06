// Import Dependencies
const { Schema } = require('mongoose')
const mongoose = require('./connection')

// Schema
const { Squema } = mongoose

// Comment Schema
const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

// Export Schema
module.exports = commentSchema