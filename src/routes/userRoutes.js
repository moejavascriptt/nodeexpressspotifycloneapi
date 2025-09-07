const express = require('express')
const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/userController')
const { protect } = require('../middlewares/auth')
const userRouter = express.Router()

// public
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', protect, getUserProfile)

module.exports = userRouter
