const { agent,  prepare, getLoggedInUser } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Memory = require('../lib/models/Memory');
const { find } = require('../lib/models/Memory');

describe('memory routes', () => {
  it('will make a new memory', async() => {
    const loggedInUser = await getLoggedInUser();
    return agent
      .post('/api/v1/memories')
      .send({
        title: 'my new memory',
        description: 'hehe',
        tag: ['#coding']
      })
      .then(res => {
        expect(res.body).toEqual({
          '_id': expect.anything(),
          'description': 'hehe',
          'participants': expect.any(Array),
          'tags': expect.any(Array),
          'privateNotes': expect.any(Array),
          'title': 'my new memory',
          'user': loggedInUser.id,
        });
      });
  });

  it('will get all of a logged in users memories', async() => {
    const loggedInUser = await getLoggedInUser();
    
    const memories = prepare(await Memory.find({ user: loggedInUser._id })
      .populate({
        path: 'photos',
        select: { _id: true, tags: true, url: true }
      }));

    return agent
      .get('/api/v1/memories')
      .then(res => {
        expect(res.body).toEqual(memories);
      });
  });

  it('can get a memory by id', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.findOne({ user: loggedInUser._id })
      .populate({
        path: 'photos',
        select: { _id: true, tags: true, url: true }
      }));


    return agent
      .get(`/api/v1/memories/${memory._id}`)
      .then(res => {
        expect(res.body).toEqual(memory);
      });
  });

  it('can update a memory by id via PATCH', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.findOne({ user: loggedInUser._id }));

    return agent
      .patch(`/api/v1/memories/${memory._id}`)
      .send({
        title: 'new title'
      })
      .then(res => {
        expect(res.body).toEqual({ ...memory, title: 'new title' });
      });
  });
  it('can delete a memory by id', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.findOne({ user: loggedInUser._id }));

    return agent
      .delete(`/api/v1/memories/${memory._id}`)
      .then(res => {
        expect(res.body).toEqual(memory);
      });
  });

  it('can Delete a pho by id', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.findOne({ user: loggedInUser._id }));

    return agent
      .delete(`/api/v1/memories/${memory._id}`)
      .then(res => {
        expect(res.body).toEqual(memory);
      });
  });
});
