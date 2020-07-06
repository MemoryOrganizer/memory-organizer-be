const { agent,  prepare, getLoggedInUser } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');


describe('User routes', () => {
  it('Delete a user with Delete', async() => {
    const user = prepare(await getLoggedInUser());

    return agent
      .delete(`/api/v1/users/${user._id}`)
      .then(res => {
        expect(res.body).toEqual(user);
      });
  });
  
  it('Updates user with a PATCH', async() => {
    const user = prepare(await getLoggedInUser());

    return agent
      .patch(`/api/v1/users/${user._id}`)
      .send({ username: 'mynewname' })
      .then(res => {
        expect(res.body).toEqual({ ...user, username: 'mynewname' });
      });
  });
});


