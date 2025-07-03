const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { uploadController } = require("../controllers/uploadController");

const uploadRouter = Router();

uploadRouter.get(
  "/signature",
  isAuthenticated,
  uploadController.getUploadSignature
);

module.exports = uploadRouter;
