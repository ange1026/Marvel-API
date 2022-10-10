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
    if (req.session.loggedIn) {
        res.redirect('/marvel')
    } else {
        res.render('index.liquid')
    }
})

// Register routes
app.use('/marvel', marvelRouter)
app.use('/comments', commentRouter)
app.use('/users', UserRouter)

// Error Page
app.get('/error', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, username, loggedIn, userId})
})

// Catchall route -> this will redirect to the error page for anything
// that doesn't satisfy a controller.
app.all('*', (req, res) => {
    res.redirect('/error')
})

// Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))