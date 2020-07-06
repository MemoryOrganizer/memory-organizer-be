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
      .find({ user: req.user._id })
      .then(memories => res.send(memories))
      .catch(next);
  });
  
