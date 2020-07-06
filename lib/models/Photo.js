const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  memory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memory'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: {
    type: [String]
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model('Photo', photoSchema);
