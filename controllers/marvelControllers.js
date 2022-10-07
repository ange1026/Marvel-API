// Dependencies
const express = require('express')
const Marvel = require('../models/marvel')
// const { populate } = require('../models/user')

// Create Route
const router = express.Router()

// INDEX -> GET
router.get('/', (req, res) => {
    Marvel.find({})
    .populate('comments.author', 'username')
      .then(marvel => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId

        res.render('marvel/index', { marvel, username, loggedIn, userId })
      })
      .catch(err => console.log(err))
})

// SHOW -> GET
router.get('/:id', (req, res) => {
    const id = req.params.id

    Marvel.findById(id)
    .populate('comments.author', 'username')
    .then(marvel => {
        // res.json({ marvel: marvel})
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId

        res.render('marvel/show', { marvel, username, loggedIn, userId })
    })
    .catch(err => console.log(err))
})

// GET for new fruit
// renders the form to create a fruit
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('marvel/new', { username, loggedIn, userId })
})

// CREATE -> POST
router.post('/', (req, res) => {
    req.body.heroAlive = req.body.heroAlive === 'on' ? true : false
    req.body.owner = req.session.userId
    Marvel.create(req.body)
    .then(marvel => {
        // res.status(201).json({ marvel: marvel.toObject() })
        res.redirect('/marvel')
    })
    .catch(error => res.json(error))
})


// GET request
router.get('/mine', (req, res) => {
    Marvel.find({ owner: req.session.userId })
        .then(marvel => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            // res.status(200).json({ marvel: marvel })
            res.render('marvel/index', { marvel, username, loggedIn, userId })
        })
    // or throw an error if there is one
        .catch(error => res.json(error))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    // const username = req.session.username
    // const loggedIn = req.session.loggedIn
    // const userId = req.session.userId
    res.send('edit page')
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
        res.redirect('/marvel')
    })
    .catch(err => res.json(err))
})

// Export router
module.exports = router