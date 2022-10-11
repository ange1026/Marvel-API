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
      .catch(err => res.redirect(`/error?error=${err}`))
})

// // SHOW -> GET
// router.get('/:id', (req, res) => {
//     const id = req.params.id

//     Marvel.findById(id)
//     .populate('comments.author', 'username')
//     .then(marvel => {
//         // res.json({ marvel: marvel})
//         const username = req.session.username
//         const loggedIn = req.session.loggedIn
//         const userId = req.session.userId

//         res.render('marvel/show', { marvel, username, loggedIn, userId })
//     })
//     .catch(err => console.log(err))
// })

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
    .catch(err => res.redirect(`/error?error=${err}`))
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
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const marvelId = req.params.id

    Marvel.findById(marvelId)
        .then(marvel => {
            res.render('marvel/edit', { marvel, username, loggedIn, userId })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
        // res.send('edit page')
})

// UPDATE -> PUT
router.put('/:id', (req, res) => {
    console.log('req.body initially', req.body)
    const id = req.params.id

    req.body.heroAlive = req.body.heroAlive === 'on' ? true : false
    console.log('req.body after changing checkbox value', req.body)
    Marvel.findById(id)
    .then(marvel => {

        if (marvel.owner == req.session.userId) {
            return marvel.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
    })
    .then(() => {
        res.redirect(`/marvel/${id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE -> DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Marvel.findByIdAndRemove(id)
    .then(marvel => {
        res.redirect('/marvel')
    })
    .catch(err => res.redirect(`/error?error=${err}`))
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
    .catch(err => res.redirect(`/error?error=${err}`))
})

// Export router
module.exports = router