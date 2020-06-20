const express = require('express')
const router = express.Router()

const usercontroller = require('../controllers/userController')
const authController = require('./../controllers/authController');



router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/register',usercontroller)

module.exports = router