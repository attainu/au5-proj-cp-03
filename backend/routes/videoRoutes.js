const express = require('express')
const router = express.Router()
const {getvideos,createvideo} = require('../controllers/videoController')
//getlistofvideos
router.get('/getvideos',getvideos)
//insert video in the database
router.post('/createvideo',createvideo)
module.exports = router