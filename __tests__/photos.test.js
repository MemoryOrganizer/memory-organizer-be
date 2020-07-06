const { agent,  prepare, getLoggedInUser } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Photo = require('../lib/models/Photo');
const Memory = require('../lib/models/Memory');

describe('photo routes', () => {
  it('will make a photo via POST', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.findOne({ user: loggedInUser._id }));
    return agent
      .post('/api/v1/photos')
      .send({
        memory: memory._id,
        url: 'picture.png',
        tags: ['#supercoding']
      })
      .then(res => expect(res.body).toEqual({
        __v: 0,
        _id: expect.anything(),
        user: loggedInUser.id,
        memory: memory._id,
        url: 'picture.png',
        tags: ['#supercoding']
      }));
  });
});
