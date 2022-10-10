// Import Dependencies
const mongoose = require('./connection')

// Schema
const { Schema } = mongoose

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