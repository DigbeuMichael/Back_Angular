const express = require('express')
const router = express.Router()
const user = require('../controllers/authController')

router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
//router.get('/',user.hello)


module.exports= router; 