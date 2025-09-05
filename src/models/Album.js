const mongoose = require('mongoose')

// schema //blueprint/instances  of the user

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Album title is required'],
      trim: true
    },
    arist: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Artist is required'],
      ref: 'Artist'
    },
    releatedDate: {
      type: String,
      default: Date.now()
    },
    coverImage: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2017/06/28/04/31/music-2449732_640.jpg'
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],

    genre: {
      type: String,
      trim: true
    },
    likes: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      trim: true
    },
    isExplicit: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true
  }
)

//compile to for the model
const Album = mongoose.model('Album', albumSchema)

module.exports = Album
