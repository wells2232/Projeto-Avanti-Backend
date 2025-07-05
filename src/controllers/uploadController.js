const uploadService = require("../services/uploadService");

async function getUploadSignature(req, res, next) {
  try {
    const signatureData = await uploadService.generateUploadSignature();

    res.status(200).json({
      ...signatureData,
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
