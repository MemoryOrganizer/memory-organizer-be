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
<<<<<<< HEAD
  userAccess: {
    type: Array,
    required: true
  }
=======
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
>>>>>>> fc6d9f5c9213c301d7943a53d397dba8dbba8d94
});

module.exports = mongoose.model('Share', shareSchema);
