const { Router } = require('express');
const Photo = require('../models/Photo');
const ensureAuth = require('../middleware/ensureAuth');
const multerUpload = require('../middleware/multerUpload');

module.exports = Router()
  .post('/', ensureAuth, multerUpload, (req, res, next) => {
    Photo
      .create({ ...req.body, path: req.file.path, user: req.user._id })
      .then(photo => res.send(photo))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Photo
      .findById(req.params.id)
      .then(photos => res.send(photos))
      .catch(next);
  })

  .put('/:id', ensureAuth, (req, res, next) => {
    Photo
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(photo => res.send(photo))
      .catch(next);
  })

  .delete ('/:id', ensureAuth, (req, res, next) => {
    Photo
      .findByIdAndDelete(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });
