const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  memory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memory'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userAccess: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Share', shareSchema);
