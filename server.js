require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 

const Marvel = require('./models/marvel.js')

const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occurred: \n", error))

const app = express()

app.use(morgan("tiny")) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public")) 
app.use(express.json()) 


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

// INDEX
app.get('/marvel', (req, res) => {
    Marvel.find({})
      .then(marvel => {
        res.json({marvel: marvel})
      })
      .catch(err => console.log(err))
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))