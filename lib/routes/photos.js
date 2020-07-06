const { Router } = require('express');
const Photo = require('../models/Photo');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Photo
      .create({ ...req.body, user: req.user._id })
      .then(photo => res.send(photo))
      .catch(next);
  });
