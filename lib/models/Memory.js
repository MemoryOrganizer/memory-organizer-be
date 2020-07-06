const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  location: {
    type: String
  },
  participants: {
    type: [String]
  },
  photo: {
    // reference photo model later
    type: String
  },
  rating: {
    type: Number
  },
  tags: {
    type: [String]
  },
  privateNotes: {
    type: [String]
  }
})

module.exports = mongoose.model('Memory', memorySchema);
