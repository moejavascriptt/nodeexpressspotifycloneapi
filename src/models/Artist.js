const mongoose = require('mongoose')

// schema //blueprint/instances  of the user

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true
    },
    bio: {
      type: String,
      trim: true
    },

    image: {
      type: String,
      default:
        'https://pixabay.com/illustrations/ai-generated-musician-8612007/'
    },
    genres: [
      {
        type: String,
        ref: 'Song'
      }
    ],

    followers: {
      type: Number,
      default: 0
    },
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
      }
    ],
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],
    isVerified: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true
  }
)

//compile to for the model
const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
