const express = require('express')

const router = express.Router()

const Posts = require('../data/db.js')

//GET all posts 
router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    })
})

//GET all posts by id
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
 
})

//GET post comments
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comment => {
        if(comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The comments information could not be retrieved.'})
    })
})

module.exports = router