const cloudinary = require("cloudinary").v2;

async function generateUploadSignature() {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "trade-app-items", // Nome da pasta no Cloudinary onde as imagens serão salvas
    },
    process.env.CLOUDINARY_API_SECRET
  );
  return { timestamp, signature };
}

module.exports = {
  generateUploadSignature,
};
