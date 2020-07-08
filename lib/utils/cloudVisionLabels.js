require('dotenv').config();

const labelCloudVision = async(img) => {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
    
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    credentials: {
      private_key: process.env.CLOUD_VISION_PRIVATE_KEY
      , client_email: process.env.CLOUD_VISION_CLIENT_EMAIL }
  });
    
  // Performs label detection on the image file
  const [result] = await client.labelDetection(img);
  const labels = result.labelAnnotations;
  console.log(labels);
  return labels;
  
};
   
module.exports = {
  labelCloudVision
};
