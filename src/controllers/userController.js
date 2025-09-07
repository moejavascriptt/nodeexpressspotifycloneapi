const asyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

//@desc - register a new user
//@route - POST /api/users/register
//@access - public

const registerUser = asyncHandler(async (req, res) => {
  // get the payload
  const { name, email, password } = req.body
  // check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST)
    throw new Error('User already exists')
  }

  // create a new user
  const user = await User.create({
    name,
    email,
    password
  })
  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture
    })
  } else {
    res.status(StatusCodes.BAD_REQUEST)
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //find the user
  const user = await User.findOne({ email })
  //check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.status(StatusCodes.OK).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      token: generateToken(user._id)
    })
  } else {
    res.status(StatusCodes.UNAUTHORIZED)
    throw new Error('Invalid email or password')
  }
})

//get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('likedSongs', 'title artist duration')
    .populate('likedAlbums', 'title artist coverImage')
    .populate('followedArtists', 'name image')
    .populate('followedPlaylists', 'name creator coverImage')
  if (user) {
    res.status(StatusCodes.OK).json(user)
  } else {
    res.status(StatusCodes.NOT_FOUND)
    throw new Error('User not found')
  }

  console.log('Profile ctrl', req.user)

  //  console.log('Profile ctlr')
})
//updateUserProfie
const updateUserProfile = asyncHandler(async (req, res) => {})
//toggleLikeSong
const toggleLikeSong = asyncHandler(async (req, res) => {})
//toggleFollowArtist
const toggleFollowArtist = asyncHandler(async (req, res) => {})
//toggleFollowPlaylist
const toggleFollowPlaylist = asyncHandler(async (req, res) => {})
//getUsers
const getUsers = asyncHandler(async (req, res) => {})

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
}
