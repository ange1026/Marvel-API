const mongoose = require("mongoose")

const { Schema, model } = mongoose

const marvelSchema = new Schema({
    actor: String,
    heroName: String,
    heroAlive: Boolean,
    movies: Number
})

const Marvel = model('Marvel', marvelSchema)

module.exports = Marvel