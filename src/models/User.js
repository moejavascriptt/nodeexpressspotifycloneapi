const mongoose = require('mongoose')

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

//compile to for the model
const User = mongoose.model('User', userSchema)

module.exports = User
