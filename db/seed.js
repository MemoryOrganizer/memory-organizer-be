const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ users = 5 } = {}) => {
  await User.create([...Array(users)].map((_, i) => ({
    username: `test${i}`,
    password: 'password',
    profilePhotoUrl: chance.url()
  })));
};
