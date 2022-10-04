// Dependencies
require("dotenv").config() 
const express = require("express") 
const path = require("path") 
const marvelRouter = require('./controllers/marvelControllers')


// Express Application Object
const app = express()

// Middleware
middleware(app)

// HOME ROUTE
app.get('/', (req, res) => {
    res.send('Server is running')
})

// Register routes
app.use('/marvel', marvelRouter)

// Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))