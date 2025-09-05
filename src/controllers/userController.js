const asyncHandler = require('express-async-handler')
const { statusCodes } = rquire('http-status-codes')
const User = require('../models/User')

//@desc - register a new user
//@route - POST /api/users/register

const registerUser = asyncHandler(async (req, res) => {
  // get the payload
  const { name, email, password } = req.body
  // check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(statusCodes.BAD_REQUEST)
    throw new Error('User already exists')
  }

  // create a new user
  const user = await User.create({
    name,
    email,
    password
  })
  if (user) {
    res.status(statusCodes.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture
    })
  } else {
    res.status(statusCodes.BAD_REQUEST)
  }
})

module.exports = {
    registerUser, 
}