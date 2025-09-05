const mongoose = require('mongoose')

// schema //blueprint/instances  of the user

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Song title is required'],
      trim: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: [true, 'Artist is required']
    },

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: [true, 'Artist is required']
    },

    duration: {
      type: Number,
      required: [true, 'Song duration is required']
    },
    audioUrl: {
      type: String,
      required: [true, 'Audio is required']
    },

    coverImage: {
      type: String,
      default:
        'https://pixabay.com/illustrations/ai-generated-musician-8612007/'
    },

    releasedDate: {
      type: Date,
      default: Date.now()
    },
    genre: {
      type: String,
      trim: true
    },

    plays: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },

    isExplicit: {
      type: Boolean,
      default: false
    },
    featuredArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
      }
    ]
  },

  {
    timestamps: true
  }
)

//compile to for the model
const Artist = mongoose.model('Artist', songSchema)

module.exports = Artist
