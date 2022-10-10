// Import Dependencies
const express = require('express')
const Marvel = require('../models/marvel')

const router = express.Router()


// ROUTES //

// Post
router.post('/:marvelId', (req, res) => {
    const marvelId = req.params.marvelId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }

    Marvel.findById(marvelId)

    .then(marvel => {
        marvel.comments.push(req.body)
        return marvel.save()
    })
    .then (marvel => {
        res.redirect(`/marvel/${marvel.id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})


// Delete
router.delete('/delete/:marvelId/:commId', (req, res) => {
    const marvelId = req.params.marvelId
    const commId = req.params.commId

    Marvel.findById(marvelId)
      .then(marvel => {
        const theComment = marvel.comments.id(commId)
        console.log('Comment found:', theComment)

        if (req.session.loggedIn) {
            if (theComment.author == req.session.userId) {
                theComment.remove()
                marvel.save()
                // res.sendStatus(204)
                res.redirect(`/marvel/${marvel.id}`)
            } else {
                // res.sendStatus(401)
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        } else {
            // res.sendStatus(401)
            const err = 'you%20are%20not%20authorized%20for%20this%20action'
            res.redirect(`/error?error=${err}`)
        }
      })

      .catch(err => res.redirect(`/error?error=${err}`))
})

module.exports = router