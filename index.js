// delete this file now :)
require('dotenv').config();

const express = require('express');
const app = express();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
});

const photoUpload = multer({ dest: 'uploaded/' }).single('photo');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));

app.post('/', photoUpload, (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  const path = req.file.path;
  const uniqueFilename = new Date().toISOString();

  cloudinary.uploader.upload(
    path, { public_id: `memory-photos/${uniqueFilename}` }, // directory and tags are optional
  )
    .then(image => {
      console.log('file uploaded to Cloudinary');
      // remove file from server
      const fs = require('fs');
      fs.unlinkSync(path);
      // return image details
      res.json(image);
    })
    .catch(next);
});

app.listen(7890);
