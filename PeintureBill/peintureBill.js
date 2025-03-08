const mongoose = require('mongoose')
const {Schema} = mongoose

const PeintureSchema = new Schema({
    title:{type: String, required:true},
    surface: {type:Number, required:true},
    price: {type:Number, required:true},
    sceau_peinture_qte: {type:Number, required:true},
    sceau_peinture_prix: {type:Number, required:true},
    pots_enduit_qte: {type:Number, required:true},
    pots_enduit_prix: {type:Number, required:true},
    sac_ciment_qte: {type:Number, required:true},
    sac_ciment_prix: {type:Number, required:true},
    pots_impression_qte: {type:Number, required:true},
    pots_impression_prix: {type:Number, required:true},
},{timestamps:true})

const PeintureModel = mongoose.model('Peinture', PeintureSchema)
module.exports = PeintureModel