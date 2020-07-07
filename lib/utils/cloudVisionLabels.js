require('dotenv').config();

async function labelCloudVision(img) {
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
  return labels;
}
  
labelCloudVision('https://images.unsplash.com/photo-1542052722982-1c9f552a534b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80');
  
module.exports({
  labelCloudVision
});
