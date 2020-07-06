const { agent } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('can signup a user with POST', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'test',
        password: 'password',
        profilePhotoUrl: 'http://someimage.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          username: 'test',
          profilePhotoUrl: 'http://someimage.com'
        });
      });
  });

  it('can login a user via POST', () => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'test0',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          username: 'test0',
          profilePhotoUrl: expect.any(String)
        });
      });
  });

  it('can verify if a user is logged in', () => {
    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          username: 'test0',
          profilePhotoUrl: expect.any(String)
        });
      });
  });
});
