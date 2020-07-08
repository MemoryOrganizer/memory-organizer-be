const { agent,  prepare, getLoggedInUser } = require('../db/data-helpers');
const Share = require('../lib/models/Share');
const User = require('../lib/models/User');
const Memory = require('../lib/models/Memory');

describe('Share routes', () => {
  
  beforeEach(async() => {
    const loggedInUser = await getLoggedInUser();
    const sharer = prepare(await User.findOne({ _id: loggedInUser._id }));
    const memory = prepare(await Memory.create({ user: loggedInUser._id, title: 'testin title' }));
    const sharee = prepare(await User.findOne());
    return agent
      .post('/api/v1/shares')
      .send({
        memory: memory._id,
        user: sharer._id,
        sharedWith: sharee._id
      });
  });
  it('Creates share with POST', async() => {
    const loggedInUser = await getLoggedInUser();
    const sharer = prepare(await User.findOne({ _id: loggedInUser._id }));
    const memory = prepare(await Memory.findOne({ user: loggedInUser._id }));
    const sharee = prepare(await User.findOne());

    return agent
      .post('/api/v1/shares')
      .send({
        memory: memory._id,
        user: sharer._id,
        sharedWith: sharee._id
      })
      .then (res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          memory: memory._id,
          user: sharer._id,
          sharedWith: sharee._id
        });
      });
  });

  it('Retrieves shares with GET', async() => {
    const loggedInUser = await getLoggedInUser();
    const shared = prepare(await Share.find({ user: loggedInUser._id }));

    return agent
      .get('/api/v1/shares')
      .then(res => {
        expect(res.body).toEqual(shared);
      });
  });

  it('Retrieves share by id with GET', async() => {
    const loggedInUser = await getLoggedInUser();
    const share = prepare(await Share.findOne({ user: loggedInUser._id }));

    return agent
      .get(`/api/v1/shares/${share._id}`)
      .then(res => {
        expect(res.body).toEqual(share);
      });
  });

  it('Updates share with PATCH', async() => {
    const loggedInUser = await getLoggedInUser();
    const share = prepare(await Share.findOne({ user: loggedInUser._id }));
    const updateMem = prepare(await Memory.findOne({ user: loggedInUser._id }));

    return agent
      .patch(`/api/v1/shares/${share._id}`)
      .send({
        memory: updateMem._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: share._id,
          memory: updateMem._id,
          user: share.user,
          sharedWith: share.sharedWith
        });
      });
  });

  it('Delete a share with DELETE', async() => {
    const loggedInUser = await getLoggedInUser();
    const share = prepare(await Share.findOne({ user: loggedInUser._id }));

    return agent
      .delete(`/api/v1/shares/${share._id}`)
      .then(res => {
        expect(res.body).toEqual(share);
      });
  });
});
