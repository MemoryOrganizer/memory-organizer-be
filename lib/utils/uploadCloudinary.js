require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
});

module.exports = (path) => {
  const uniqueFilename = new Date().toISOString();

  return cloudinary.uploader.upload(
    path, { public_id: `memory-photos/${uniqueFilename}` });
};
