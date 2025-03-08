const mongoose = require('mongoose')
const {Schema} = mongoose

const AdminSchema = new Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    medias:[{type:Schema.Types.ObjectId, ref:'Media'}]
}, 
{timestamps:true})
const AdminModel = mongoose.model('Admin', AdminSchema)
module.exports = AdminModel