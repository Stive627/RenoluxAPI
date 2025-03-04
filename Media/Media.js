const mongoose = require('mongoose')
const {Schema} = mongoose

const MediaSchema = new Schema({
    url:{type:String, required:true},
    category:{type:String, required:true},
}, {timestamps:true})

const MediaModel = mongoose.model('Media', MediaSchema)
module.exports = MediaModel