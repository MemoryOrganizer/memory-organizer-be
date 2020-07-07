const mongoose = require('mongoose');
const uploadCloudinary = require('../utils/uploadCloudinary');

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


photoSchema.pre('save', function() {
  return uploadCloudinary(this.photoPath)
    .then((res) => this.url = res.url);
    // .then cloudvision
    // .then(this.tags = vision tags)
});

photoSchema.virtual('path').set(function(path){
  this.photoPath = path;
});

module.exports = mongoose.model('Photo', photoSchema);
