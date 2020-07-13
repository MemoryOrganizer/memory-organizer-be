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

  // make sure the person updating a memory owns the memory
  .patch('/:id', ensureAuth, (req, res, next) => {
    Memory
      .findOneAndUpdate({ _id: req.params.id user: req.user._id }, req.body, { new: true })
      .then(memory => res.send(memory))
      .catch(next);
  })

  // make sure the person deleting a memory owns the memory
  .delete('/:id', ensureAuth, (req, res, next) => {
    Memory
      .findOneAndDelete({ _id: req.params.id user: req.user._id })
      .then(memory => res.send(memory))
      .catch(next);
  });

