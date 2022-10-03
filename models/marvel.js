const mongoose = require("mongoose")

const { Schema, model } = mongoose

const marvelSchema = new Schema({
    title: String,
    actor: String,
    heroName: String,
    alive: Boolean  
})

const Marvel = model('Marvel', marvelSchema)

module.exports = Marvel