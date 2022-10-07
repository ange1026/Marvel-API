
// Import Dependencies
const mongoose = require("mongoose")
const User = require('./user')

const commentSchema = require('./comment')


// Schema and model from mongoose
const { Schema, model } = mongoose

// Marvel Schema
const marvelSchema = new Schema({
    character: String,
    heroName: String,
    heroAlive: Boolean,
    movies: Number,
    owner: {
        type: Schema.Types.ObjectId,

        ref:'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

// Model method
const Marvel = model('Marvel', marvelSchema)

// Model export
module.exports = Marvel