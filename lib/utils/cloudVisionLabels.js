// looks good. you don't need to dotenv.config here

// pass a filter function to this. Makes the logic in the middleware
// a bit nicer
const labelCloudVision = async(img, filter = () => true) => {
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

  return labels.filter(filter);
};

module.exports = {
  labelCloudVision
};
