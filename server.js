// Dependencies
require("dotenv").config() 
const express = require("express") 
const path = require("path") 
const UserRouter = require('./controllers/userControllers')
const marvelRouter = require('./controllers/marvelControllers')
const middleware = require('./utils/middleware')

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
app.use('/users', UserRouter)

// Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))