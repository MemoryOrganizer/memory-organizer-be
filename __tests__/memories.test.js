const { agent,  prepare, getLoggedInUser } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Memory = require('../lib/models/Memory')

describe('memory routes', () => {
  it('will make a new memory', async() => {
    const loggedInUser = await getLoggedInUser()
    return agent
      .post('/api/v1/memories')
      .send({
        title: 'my new memory',
        description: 'hehe',
        tag: ['#coding'] 
      })
      .then(res => {
        expect(res.body).toEqual({
          "__v": 0,
          "_id": expect.anything(),
          "description": "hehe",
          "participants": expect.any(Array),
          "tags": expect.any(Array),
          "privateNotes": expect.any(Array),
          "title": "my new memory",
          "user": loggedInUser.id,
        })
      })
  });

  it('will get all of a logged in users memories', async() => {
    const loggedInUser = await getLoggedInUser();
    const memories = prepare(await Memory.find({ user: loggedInUser._id }))

    return agent
      .get('/api/v1/memories')
      .then(res => {
        expect(res.body).toEqual(memories)
      })
  })

})