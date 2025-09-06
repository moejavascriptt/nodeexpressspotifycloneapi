const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// schema //blueprint/instances  of the user

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters']
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/collection/thumbnail/2025/06/05/island-2722471_1280.jpg'
    },
    isAdmin: {
      type: String,
      default: false
    },
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],

    likedAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
      }
    ],

    followedArtist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
      }
    ],
    followedPlaylist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
      }
    ]
  },
  {
    timestamps: true
  }
)
//Hash password before saving
userSchema.pre('save', async function (next) {
  //only hash the passord if its modified
  if (!this.isModified('password')) {
    next()
  }
  //hash the password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//compile to for the model
const User = mongoose.model('User', userSchema)

module.exports = User
