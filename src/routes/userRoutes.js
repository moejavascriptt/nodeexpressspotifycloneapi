const express = require('express')
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController')
const { protect } = require('../middlewares/auth')
const userRouter = express.Router()

// public routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// private routes
userRouter.get('/profile', protect, getUserProfile)
userRouter.put('/profile', protect, updateUserProfile)

module.exports = userRouter
