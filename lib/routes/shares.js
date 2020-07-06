const { Router } = require('express');
const Share = require('../models/Share');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router();
