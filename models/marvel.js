const mongoose = require("mongoose")

// Schema and model from mongoose
const { Schema, model } = mongoose

// marvel Schema
const marvelSchema = new Schema({
    actor: String,
    heroName: String,
    heroAlive: Boolean,
    movies: Number
})

// Model method
const Marvel = model('Marvel', marvelSchema)

// model export
module.exports = Marvel