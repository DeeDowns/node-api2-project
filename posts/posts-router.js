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

//POST new post
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        // console.log(req.body)
       req.body.title && req.body.contents ? res.status(201).json(post) : res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error while saving the post to the database'})
    })


})

module.exports = router