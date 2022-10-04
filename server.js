// Dependencies
require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 

// Models
const Marvel = require('./models/marvel.js')

// Database Connection
const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// Mongoose
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occurred: \n", error))

// Express Application Object
const app = express()

// Middleware
app.use(morgan("tiny")) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public")) 
app.use(express.json()) 

// ROUTES
app.get('/', (req, res) => {
    res.send('Server is running')
})

// Seed route
app.get('/marvel/heroes', (req, res) => {
    const marvelMovies = [
        {actor: 'Tom Holland', heroName: 'Spider-Man', heroAlive: true, movies: 3},
        {actor: 'Chris Evans', heroName: 'Captain America', heroAlive: true, movies: 3},
        {actor: 'Scarlett Johansson', heroName: 'Black Widow', heroAlive: false, movies: 1},
        {actor: 'Robert Downey Jr', heroName: 'Iron-Man', heroAlive: false, movies: 3},
        {actor: 'Chris Hemsworth', heroName: 'Thor', heroAlive: true, movies: 4}
    ]

    Marvel.deleteMany({})
    .then(() => {
        Marvel.create(marvelMovies)
         .then(data => {
            res.json(data)
         })
    })
})

// INDEX -> GET
app.get('/marvel', (req, res) => {
    Marvel.find({})
      .then(marvel => {
        res.json({marvel: marvel})
      })
      .catch(err => console.log(err))
})

// SHOW -> GET
app.get('/marvel/:id', (req, res) => {
    const id = req.params.id
    Marvel.findById(id)
    .then(marvel => {
        res.json({ marvel: marvel})
    })
    .catch(err => console.log(err))
})

// CREATE -> POST
app.post('/marvel', (req, res) => {
    Marvel.create(req.body)
    .then(marvel => {
        res.status(201).json({ marvel: marvel.toObject() })
    })
    .catch(error => console.log(error))
})

// UPDATE -> PUT
app.put('/marvel/:id', (req, res) => {
    const id = req.params.id
    Marvel.findByIdAndUpdate(id, req.body, {new: true })
    .then(marvel => {
        console.log('the new marvel update', marvel)
        res.sendStatus(204)
    })
})

// Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))