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
  rating: {
    type: Number
  },
  tags: {
    type: [String]
  },
  privateNotes: {
    type: [String]
  }
}, {
  toJSON: {
    virtuals: true,
    transorm: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }, toObject: {
    virtuals: true
  }
});

memorySchema.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'memory'
});

module.exports = mongoose.model('Memory', memorySchema);
