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
        fruit.comments.push(req.body)
        return marvel.save()
    })
    .catch(error => console.log(error))
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
                res.sendStatus(204)
            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(401)
        }
      })

      .catch(error => console.log(error))
})

module.exports = router