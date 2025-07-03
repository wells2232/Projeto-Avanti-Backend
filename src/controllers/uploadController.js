const uploadService = require("../services/uploadService");

async function getUploadSignature(req, res, next) {
  try {
    const signatureData = await uploadService.generateUploadSignature();

    res.status(200).json({
      ...signatureData,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "trade-app-items", // Nome da pasta no Cloudinary onde as imagens serão salvas
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadController: {
    getUploadSignature,
  },
};
