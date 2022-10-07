// Dependencies
require("dotenv").config() 
const express = require("express") 
const path = require("path") 
const UserRouter = require('./controllers/userControllers')
const marvelRouter = require('./controllers/marvelControllers')
const commentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')

// Express Application Object
// const app = express()
const app = require('liquid-express-views')(express())

// Middleware
middleware(app)

// HOME ROUTE
app.get('/', (req, res) => {
    // res.send('Server is running')
    res.render('index.liquid')
})

// Register routes
app.use('/marvel', marvelRouter)
app.use('/comments', commentRouter)
app.use('/users', UserRouter)

// Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))