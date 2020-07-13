const mongoose = require('mongoose');
const uploadCloudinary = require('../utils/uploadCloudinary');
const fs = require('fs');
const { labelCloudVision } = require('../utils/cloudVisionLabels.js');

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
  if(process.env.NODE_ENV === 'test') return this.url = 'hi';
  return uploadCloudinary(this.photoPath)
    .then((res) => Promise.all([
      res,
      fs.unlink(this.photoPath) // dont use unlinkSync because it will block the event loop
    ]))
    .then(([res]) => {
      this.url = res.url;
      return this.url;
    })
    .then((res) => labelCloudVision(res, result => result.score > .8))
    .then((results) => {
      this.tags = results.map(result => result.description);
    });
});

photoSchema.virtual('path').set(function(path){
  this.photoPath = path;
});

module.exports = mongoose.model('Photo', photoSchema);
