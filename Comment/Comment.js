const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
    firstname:{type:String, required:true},
    email:{type:String, required:true},
    message:{type:String, required:true},
    stars:{type:Number, required:true}
},{timestamps:true})

const CommentModel = mongoose.model('Comments', commentSchema)

module.exports = CommentModel