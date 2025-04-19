const CommentModel = require("./Comment")

const addComment = async(req, res) =>{
    const {firstname, email, message, stars} = req.body
    if(!firstname || !message || !stars) return res.status(400).send('There are the missing fields.')
    const comment = new CommentModel({...req.body})
    await comment.save()
    .then(()=>res.send({...req.body}))
    .catch((error)=>res.status(400).send(`An error occured. ${error}`))
}

const deleteComment = async(req, res) =>{
    await CommentModel.findByIdAndDelete({_id:req.params.id})
    .then(()=>res.send('The comment is deleted'))
    .catch((error)=> res.send('An error occured', error))
    
}
const displayComment = async(req, res) =>{
    await CommentModel.find()
    .then((data) => res.send(data))
    .catch((err) => res.send(`An error occured , ${err}`))
}

module.exports = {addComment, deleteComment, displayComment}

