// Dependencies
const express = require('express')
const Marvel = require('../models/marvel')

// Create Route
const router = express.Router()


// const marvelMovies = [
//     {actor: 'Tom Holland', heroName: 'Spider-Man', heroAlive: true, movies: 3},
//     {actor: 'Chris Evans', heroName: 'Captain America', heroAlive: true, movies: 3},
//     {actor: 'Scarlett Johansson', heroName: 'Black Widow', heroAlive: false, movies: 1},
//     {actor: 'Robert Downey Jr', heroName: 'Iron-Man', heroAlive: false, movies: 3},
//     {actor: 'Chris Hemsworth', heroName: 'Thor', heroAlive: true, movies: 4}
// ]


// INDEX -> GET
router.get('/marvel', (req, res) => {
    Marvel.find({})
      .then(marvel => {
        res.json({marvel: marvel})
      })
      .catch(err => console.log(err))
})

// SHOW -> GET
router.get('/marvel/:id', (req, res) => {
    const id = req.params.id
    Marvel.findById(id)
    .then(marvel => {
        res.json({ marvel: marvel})
    })
    .catch(err => console.log(err))
})

// CREATE -> POST
router.post('/marvel', (req, res) => {
    Marvel.create(req.body)
    .then(marvel => {
        res.status(201).json({ marvel: marvel.toObject() })
    })
    .catch(error => console.log(error))
})

// UPDATE -> PUT
router.put('/marvel/:id', (req, res) => {
    const id = req.params.id
    Marvel.findByIdAndUpdate(id, req.body, {new: true })
    .then(marvel => {
        console.log('the new marvel update', marvel)
        res.sendStatus(204)
    })
})

// DELETE -> DELETE
router.delete('/marvel/:id', (req, res) => {
    const id = req.params.id
    Marvel.findByIdAndRemove(id)
    .then(marvel => {
        res.sendStatus(204)
    })
    .catch(err => res.json(err))
})

// Export router
module.exports = router