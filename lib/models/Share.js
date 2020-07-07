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
  sharedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Share', shareSchema);
