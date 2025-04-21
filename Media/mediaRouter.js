const express = require('express')
const multer = require('multer')
const { addMedia, deleteMedia, showMedia, getPlans } = require('./mediaController')

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/pictures/')
    },
    filename: function(req, file, cb){
        cb(null, getEncoded(file.originalname))
    } 
})

const upload = multer({storage:storage})
const routerMedia = express.Router()
routerMedia.post('/add', upload.single('img') ,addMedia)
routerMedia.delete('/delete/:id',  deleteMedia)
routerMedia.get('/show',  showMedia)
routerMedia.get('/plans', getPlans) 

module.exports = routerMedia