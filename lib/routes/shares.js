const { Router } = require('express');
const Share = require('../models/Share');
const ensureAuth = require('../middleware/ensureAuth');
const { findByIdAndDelete } = require('../models/Share');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Share
      .create({ ...req.body, user: req.user._id })
      .then(share => res.send(share))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    Share
      .find({ user: req.user._id })
      .then(shared => res.send(shared))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Share
      .findById(req.params.id)
      .then(shared => res.send(shared))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Share
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Share  
      .findByIdAndDelete(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })
;
