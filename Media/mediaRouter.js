const express = require('express')
const multer = require('multer')
const { addMedia, deleteMedia, showMedia} = require('./mediaController')
const {S3Client} = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
require('dotenv').config()

const s3 = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})


const storage = multerS3({
    s3:s3,
    bucket:process.env.AWS_BUCKET,
    metadata:function(req, file, cb){
        cb(null, {fieldName:file.fieldname})
    },
    key:function(req, file, cb){
        const fileName = Date.now()+ '-' + file.originalname;
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage});

const routerMedia = express.Router()
routerMedia.post('/add', upload.single('img') , addMedia)
routerMedia.delete('/delete/:id',  deleteMedia)
routerMedia.get('/show',  showMedia)


module.exports = routerMedia