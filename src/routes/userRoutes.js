const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')
const userRouter = express.Router()
// public
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

module.exports = userRouter
