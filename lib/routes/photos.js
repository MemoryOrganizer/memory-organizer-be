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

  // make sure the person updating a memory owns the memory
  .put('/:id', ensureAuth, (req, res, next) => {
    Photo
      .findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
      .then(photo => res.send(photo))
      .catch(next);
  })

  // make sure the person deleting a memory owns the memory
  .delete ('/:id', ensureAuth, (req, res, next) => {
    Photo
      .findOneAndDelete({ _id: req.params.id, user: req.user._id })
      .then(deleted => res.send(deleted))
      .catch(next);
  });
