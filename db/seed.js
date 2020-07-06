const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Memory = require('../lib/models/Memory');
const Photo = require('../lib/models/Photo');

module.exports = async({ users = 5, memories = 20, photos = 25, shares = 10 } = {}) => {
  const tags = ['fun', 'tree', 'happy'];

  const createdUsers = await User.create([...Array(users)].map((_, i) => ({
    username: `test${i}`,
    password: 'password',
    profilePhotoUrl: chance.url()
  })));

  const createdMemories = await Memory.create([...Array(memories)].map(() => ({
    user: chance.pickone(createdUsers)._id,
    title: chance.word(),
    description: chance.sentence(),
    tags: [chance.hashtag],
    date: chance.date(),
    location: chance.state(),
    participants: [chance.name(), chance.name()],
    rating: chance.natural({ min: 1, max: 5 }),
    privateNotes: [chance.sentence()]
  })));

  await Photo.create([...Array(photos)].map(() => ({
    memory: chance.pickone(createdMemories)._id,
    user: chance.pickone(createdUsers)._id,
    tags: chance.pickset(tags, 2),
    url: chance.url
  })));

  const createdPhotos = await Photo.create([...Array(photos)].map(() => ({
    memory: chance.pickone(createdMemories)._id,
    user: chance.pickone(createdUsers)._id,
    userAccess: [chance.pickset(createdUsers, 2)]
  })));
};
