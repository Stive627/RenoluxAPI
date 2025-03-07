const express = require('express')
const multer = require('multer')
const { addMedia, updateMedia, deleteMedia, showMedia, getPlans } = require('./mediaController')

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/medias/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    } 
})

const upload = multer({storage:storage})
const routerMedia = express.Router()
routerMedia.post('/add', upload.single('media') ,addMedia)
routerMedia.put('/update/:id', upload.single('media'), updateMedia)
routerMedia.delete('/delete/:id',  deleteMedia)
routerMedia.get('/show',  showMedia)
routerMedia.get('/plans', getPlans) 

module.exports = routerMedia