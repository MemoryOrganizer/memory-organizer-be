const { Router } = require('express');
const Memory = require('../models/Memory');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Memory
      .create({ ...req.body, user: req.user._id })
      .then(memory => res.send(memory))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Memory
      .findTags(req.query.search, req.user._id)
      .then(memories => res.send(memories))
      .catch(next);
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    Memory
      .findById(req.params.id)
      .populate({
        path: 'photos',
        select: { _id: true, tags: true, url:true }
      })
      .then(memory => res.send(memory))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Memory
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(memory => res.send(memory))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Memory
      .findByIdAndDelete(req.params.id)
      .then(memory => res.send(memory))
      .catch(next);
  });

