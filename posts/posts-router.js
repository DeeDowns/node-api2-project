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
        console.log(post) 
        if(post.length > 0) {
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
        if(comment.length > 0) {
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
    // Posts.insert(req.body)
    // .then(post => {
    //     // console.log(post)
    //     // console.log(req.body.title.length)
    //     if(req.body.title.length <= 0 || req.body.contents.length <= 0) {
    //         return res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
    //     } else if(req.body.title && req.body.contents) {
    //         res.status(201).json(req.body) 
    //     } 
    // })
    // .catch(error => {
    //     res.status(500).json({ error: 'There was an error while saving the post to the database'})
    // })

    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
    } else if( req.body.title && req.body.contents) {
        Posts.insert(req.body)
        res.status(201).json(req.body) 
    } else {
        res.status(500).json({ error: 'There was an error while saving the post to the database'})
    }
})

//POST new comment post by id
router.post('/:post_id/comments', (req, res) => {
    const { post_id } = req.params
    const { text } = req.body
    Posts.insertComment({text, post_id})
    .then(comment_id => {
        // res.status(200).json(comment_id)
        console.log(text.length)
        if (text.length <= 0) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        } else if (comment_id) {
            res.status(200).json(comment_id)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }  
    })
    .catch(error => {
        console.log('post comment error',error)
        res.status(500).json({ error: "There was an error while saving the comment to the database"})
    })

})

//PUT edit post
router.put('/:id', (req, res) => {
    const { title, contents } = req.body
    const { id } = req.params
   
    console.log(title, contents)
    Posts.update(id, {title, contents})
    .then(updatedPost => {
        console.log('put',updatedPost)
        if(!title && !contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else if(updatedPost) {
            res.status(200).json(updatedPost)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post information could not be modified." })
    })
})


//DELETE post
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json({ message: 'the post has been removed'})
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The post could not be removed'})
    })
})

module.exports = router