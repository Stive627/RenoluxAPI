const fs = require('node:fs')
const MediaModel = require('./Media')
require('dotenv').config()

const addMedia = async(req, res) => {
    const {category} = req.body
    const file = req.file
    if(!req.body.category || !req.file) return res.send('There are the emplty fields.')
        try{ 
            const media = new MediaModel({url:file.path, category:category})
            await media.save()
            res.send('The media is successfully added.')
        }
        catch(error){res.status(404).send(error)}
}

const updateMedia = async(req, res) => { 
    const file = req.file
    if(!req.body.category || !req.file) return res.send('The fields are missing')
    try{
        const media = await MediaModel.findById({_id:req.params.id}) 
        await media.updateOne({url:file.path, category:category}).catch(err => console.error(err))
        if(media.path !== file.path){
            fs.rm(media.path, (err) =>{
                if(err) return res.status(400).send(err)
            })
        }
        res.status(200).send('media updated')
    }
    catch(error){
        res.send(error)
    }    
}

const deleteMedia = async(req, res) => { 
    try{
        const media =  await MediaModel.findOneAndDelete({_id:req.params.id})
            fs.rm(media.contentType.url, (err) => {
                if(err) return res.send(err)
                res.send('The media is deleted')
            })
    }
    catch(error){
        res.status(400).send(`An error occured, ${error}`)
    }
} 

const showMedia = async(req, res) => {
    try{ 
        const medias = await MediaModel.find()
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

module.exports = {addMedia, updateMedia, deleteMedia, showMedia, getPlans}