const express = require('express')
const { placoDevis } = require('./placoController')
const placoRouter = express.Router()
placoRouter.post('/', placoDevis)
module.exports = placoRouter 