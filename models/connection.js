// Dependecies
require('dotenv').config()
const mongoose = require('mongoose')

// Database Connection
const DEPLOYED_URL = process.env.DEPLOYED_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish connection
mongoose.connect(DEPLOYED_URL, CONFIG)

// Mongoose
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occurred: \n", error))

// Export connection
module.exports = mongoose