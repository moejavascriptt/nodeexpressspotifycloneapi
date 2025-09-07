const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

//middleware to protect routes - verify JWT token and set req.user

const protect = asyncHandler(async (req, res, next) => {
  let token

  //check if token exists in authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get the token from the header
      token = req.headers.authorization.split(' ')[1]
      //verify token
      const decoded = jwt.verify(token, process.env.JWT)
      console.log(decoded)
      // set req.user to the user found in the token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.UNAUTHORIZED)
      throw new Error('Not authorized, token failed')
    }
  }
})

module.exports = {
  protect
}
