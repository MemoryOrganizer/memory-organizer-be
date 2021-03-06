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
    transform: (doc, ret) => {
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

memorySchema.statics.findTags = function(searchFor, userId) {
  if(!searchFor) return this.find({ user: userId })
    .populate({
      path: 'photos',
      select: { _id: true, tags: true, url:true }
    });
  return this.aggregate([
    {
      '$match': {
        'user': mongoose.Types.ObjectId(userId)
      }
    }, {
      '$lookup': {
        'from': 'photos', 
        'localField': '_id', 
        'foreignField': 'memory', 
        'as': 'photos'
      }
    }, {
      '$match': {
        '$or': [
          {
            'title': {
              '$in': 
                searchFor
              
            }
          }, {
            'participants': {
              '$in': 
                searchFor
              
            }
          }, {
            'location': {
              '$in': 
                searchFor
              
            }
          }, {
            'description': {
              '$in': 
                searchFor
              
            }
          }, {
            'date': {
              '$in': 
                searchFor
              
            }
          }, {
            'rating': {
              '$in': 
                searchFor
              
            }
          }, {
            'tags': {
              '$in': 
                searchFor
              
            }
          }, {
            'photos.tags': {
              '$in': 
                searchFor
              
            }
          }
        ]
      }
    }, {
      '$project': {
        '__v': 0, 
        'photos.user': 0, 
        'photos.__v': 0
      }
    }
  ]);
};

module.exports = mongoose.model('Memory', memorySchema);
