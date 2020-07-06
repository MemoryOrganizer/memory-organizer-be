const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Memory = require('../lib/models/Memory');

module.exports = async({ users = 5, memories = 20 } = {}) => {
  const createdUsers = await User.create([...Array(users)].map((_, i) => ({
    username: `test${i}`,
    password: 'password',
    profilePhotoUrl: chance.url()
  })));

  await Memory.create([...Array(memories)].map(() => ({
    user: chance.pickone(createdUsers)._id,
    title: chance.word(),
    description: chance.sentence(),
    photo: chance.url(),
    tags: [chance.hashtag],
    date: chance.date(),
    location: chance.state(),
    participants: [chance.name(), chance.name()],
    rating: chance.natural({ min: 1, max: 5 }),
    privateNotes: [chance.sentence()]
  })));
};
