const MediaModel = require('./Media')
const getUrlKey = require('../functions/getUrlKey')
const {S3Client, DeleteObjectCommand} = require('@aws-sdk/client-s3')
require('dotenv').config()

const s3 = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})

const addMedia = async(req, res) => {
    const {category} = req.body
    const file = req.file
    if(!category || !file) return res.send('There are the emplty fields.')
    try{ 
        const media = new MediaModel({url:file.location, category:category})
        await media.save()
        .then(() => res.status(200).send(media))
        .catch(err => res.status(400).send(err))
    }
    catch(error){res.status(400).send(error)}
}

const deleteMedia = async(req, res) => { 
    try {
        const media = await MediaModel.findOneAndDelete({_id:req.params.id})
        const key = getUrlKey(media.url)
        const command = new DeleteObjectCommand({
            Bucket:process.env.AWS_BUCKET,
            Key:decodeURI(key)
        })
        await s3.send(command)
        res.status(200).send('The media is deleted.')
    } catch (error) {
        res.status(400).send(error)
    }
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


module.exports = {deleteMedia, showMedia, addMedia}