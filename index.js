const express = require('express')

const server = express()

//importing posts router
const postsRouter = require('./posts/posts-router')

server.use(express.json())
server.use('/api/posts', postsRouter)

















server.listen(8000, () => {
    console.log('server running on http://localhost:8000')
})