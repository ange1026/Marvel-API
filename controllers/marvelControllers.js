// Dependencies
const express = require('express')
const Marvel = require('../models/marvel')
const { populate } = require('../models/user')

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
router.get('/', (req, res) => {
    Marvel.find({})
    .populate('comments.author', 'username')
      .then(marvel => {
        res.json({marvel: marvel})
      })
      .catch(err => console.log(err))
})

// SHOW -> GET
router.get('/:id', (req, res) => {
    const id = req.params.id

    Marvel.findById(id)
    .populate('comments.author', 'username')
    .then(marvel => {
        res.json({ marvel: marvel})
    })
    .catch(err => console.log(err))
})

// CREATE -> POST
router.post('/', (req, res) => {

    req.body.owner = req.session.userId
    Marvel.create(req.body)
    .then(marvel => {
        res.status(201).json({ marvel: marvel.toObject() })
    })
    .catch(error => res.json(error))
})

// UPDATE -> PUT
router.put('/:id', (req, res) => {
    const id = req.params.id

    Marvel.findById(id)
    .then(marvel => {

        if (marvel.owner == req.session.userId) {
            res.sendStatus(204)
            return marvel.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
    })
    .catch(error => res.json(error))
})

// DELETE -> DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Marvel.findByIdAndRemove(id)
    .then(marvel => {
        res.sendStatus(204)
    })
    .catch(err => res.json(err))
})

// Export router
module.exports = router