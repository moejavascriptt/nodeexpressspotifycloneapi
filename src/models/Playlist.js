const mongoose = require('mongoose')

// schema //blueprint/instances  of the user

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Playlist name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },

  coverImage: {
    type: String,
    default: 'https://pixabay.com/illustrations/ai-generated-musician-8612007/'
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required']
  },

  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }
  ],

  isPublic: {
    type: Boolean,
    default: false
  },

  followers: {
    type: Number,
    default: 0
  },

  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  timestamps: true
})

//compile to for the model
const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
