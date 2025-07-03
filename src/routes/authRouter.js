const authController = require("../controllers/authController");
const { Router } = require("express");

const authRouter = Router();

authRouter.post("/verify-email", authController.handleVerifyEmail);

module.exports = authRouter;
