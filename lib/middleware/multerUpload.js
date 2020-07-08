const multer = require('multer');

module.exports = multer({ dest: 'uploaded/' }).single('photo');
