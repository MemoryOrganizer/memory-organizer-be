const { agent,  prepare, getLoggedInUser } = require('../db/data-helpers');
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

  it('get a photo with a Memory id vea GET', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.create({
      user: loggedInUser._id,
      title: 'my photo',
    }));
    const photos = prepare(await Photo.create({
      user: loggedInUser._id,
      tags: ['thats a tag'],
      memory: memory.id,
      url:'sdfasf'
    }));

    return agent
      .get(`/api/v1/photos/${photos._id}`)
      .then(res => {
        expect(res.body).toEqual(photos);
      });
  });


  it('get a photo with a User id vea GET', async() => {
    const loggedInUser = await getLoggedInUser();
    const photos = prepare(await Photo.findOne({ user: loggedInUser._id }));

    return agent
      .get(`/api/v1/photos/${photos._id}`)
      .then(res => {
        expect(res.body).toEqual(photos);
      });
  });


  it('Patch a photo with a User id vea PUT', async() => {
    const loggedInUser = await getLoggedInUser();
    const photos = prepare(await Photo.findOne({ user: loggedInUser._id }));

    return agent
      .put(`/api/v1/photos/${photos._id}`)
      .send({ tags: 'That New New tag' })
      .then(res => {
        expect(res.body).toEqual({ ...photos, tags: ['That New New tag'] });
      });
  });

  it('Patch a photo with a Memory id vea PUT', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.create({
      user: loggedInUser._id,
      title: 'my photo',
    }));

    const photos = prepare(await Photo.create({
      user: loggedInUser._id,
      memory: memory.id,
      url:'sdfasf'
    }));


    return agent
      .put(`/api/v1/photos/${photos._id}`)
      .send({ tags: 'That New New tag' })
      .then(res => {
        expect(res.body).toEqual({ ...photos, tags: ['That New New tag'] });
      });
  });

  it.only('Delete a photo with a Memory id vea Delete', async() => {
    const loggedInUser = await getLoggedInUser();
    const memory = prepare(await Memory.create({
      user: loggedInUser._id,
      title: 'my photo',
    }));

    const photos = prepare(await Photo.create({
      user: loggedInUser._id,
      memory: memory.id,
      url:'sdfasf'
    }));


    return agent
      .delete(`/api/v1/photos/${photos._id}`)
      .then(res => {
        expect(res.body).toEqual(photos);
      });
  });

  it.only('Patch a photo with a User id vea PUT', async() => {
    const loggedInUser = await getLoggedInUser();
    const photos = prepare(await Photo.findOne({ user: loggedInUser._id }));

    return agent
      .delete(`/api/v1/photos/${photos._id}`)
      .send()
      .then(res => {
        expect(res.body).toEqual(photos);
      });
  });
 
});
