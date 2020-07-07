const mongoose = require('mongoose');
const uploadCloudinary = require('../utils/uploadCloudinary');
const fs = require('fs');
const labelCloudVision = require('../utils/cloudVisionLabels.js');

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
    .then(fs.unlinkSync(this.photoPath))
    .then((res) => {
      this.url = res.url;
      labelCloudVision(res.url);
    })
    .then((results) => {
      const above80 = results.filter(result => result.score > .8).map(result => result.description);
      this.tags = above80;
    });
});

photoSchema.virtual('path').set(function(path){
  this.photoPath = path;
});

module.exports = mongoose.model('Photo', photoSchema);
