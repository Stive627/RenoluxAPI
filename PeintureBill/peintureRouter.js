const express = require('express')
const { peintureDevis } = require('./peintureController')
const peintureRouter = express.Router()
peintureRouter.post('/', peintureDevis)

module.exports = peintureRouter