const authController = require("../controllers/authController");
const { Router } = require("express");

const authRouter = Router();

authRouter.post("/verify-email", authController.handleVerifyEmail);

authRouter.post(
  "/request-password-reset",
  authController.handleRequestPasswordReset
);

authRouter.post("/reset-password", authController.handleResetPassword);

module.exports = authRouter;
