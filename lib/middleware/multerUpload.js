require('dotenv').config();
const express = require('express');
const app = express();
const multer = require('multer');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));

module.exports = multer({ dest: 'uploaded/' }).single('photo');
