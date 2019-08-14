const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)
   

module.exports = router
