// User resource
// Import dependencies

const mongoose = require('./connection')

const { Schema, model } = mongoose

// User Model and Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

// Export model
module.exports = User