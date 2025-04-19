const express = require('express')
const { addComment, deleteComment, displayComment } = require('./CommentController')
const routerComment = express.Router()

routerComment.post('/add', addComment)
routerComment.delete('/delete/:id', deleteComment )
routerComment.get('/', displayComment)

module.exports = routerComment