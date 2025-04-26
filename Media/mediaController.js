const fs = require('node:fs')
const MediaModel = require('./Media')
require('dotenv').config()

const addMedia = async(req, res) => {
    const {category} = req.body
    const files = req.files
    if(!category || !files) return res.send('There are the emplty fields.')
    const finalContent = files.reduce((acc, curr,indx) => ([...acc, {url:curr.path, category:category}]), [])
    try{
        await MediaModel.insertMany(finalContent)
        .then((value) => res.status(200).send(value))
        .catch(err => res.status(400).send(err))
    }
    catch(error){res.status(400).send(error)}
}

const deleteMedia = async(req, res) => { 
    await MediaModel.findOneAndDelete({_id:req.params.id})
    .then(()=> res.status(200).send('The file is deleted'))
    .catch(err => res.status(400).send(err))

} 

const showMedia = async(req, res) => {
    try{ 
        const medias = await MediaModel.find().sort({createdAt:-1})
        return res.status(200).send(medias)
    }
    catch(err){
        res.status(400).send(err)
    }
} 

const getPlans = (req, res) => {
    try{
        fs.readdir('public/plans/', async(err, files) => {
            if(err) return res.status(400).send(err)
            res.status(200).send(files)
        })
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports = {addMedia, deleteMedia, showMedia, getPlans}