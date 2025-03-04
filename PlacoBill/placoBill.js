const mongoose = require('mongoose')
const {Schema} = mongoose

const PlacoSchema = new Schema({
    title:{type: String, required:true},
    price: {type:Number, required:true},
    surface: {type:Number, required:true},
    vice_placo_qte:{type:Number, required:true},
    vice_placo_prix: {type:Number, required:true},
    bande_armee_qte: {type:Number, required:true},
    bande_armee_prix:{type:Number, required:true},
    bande_joint_qte: {type:Number, required:true},
    bande_joint_prix:{type:Number, required:true},
    enduit_colle_qte:{type:Number, required:true},
    enduit_colle_prix: {type:Number, required:true},
    enduit_lissage_qte: {type:Number, required:true},
    enduit_lissage_prix:{type:Number, required:true},
    corniere_qte: {type:Number, required:true},
    corniere_prix:{type:Number, required:true},
    plaque_placo_qte: {type:Number, required:true},
    plaque_placo_prix: {type:Number, required:true},
    cheville_qte: {type:Number, required:true},
    cheville_prix:{type:Number, required:true},
    fourrure_qte: {type:Number, required:true},
    fourrure_prix:{type:Number, required:true},

},{timestamps:true})

const PlacoModel = mongoose.model('Placo', PlacoSchema)

module.exports = PlacoModel