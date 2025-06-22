const { Router } = require("express");
const { userController } = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const userRouter = Router();

userRouter.post("/auth/register", userController.handleRegister);

userRouter.post("/auth/login", userController.handleLogin);

userRouter.post("/auth/logout", userController.handleLogout);

userRouter.get(
  "/auth/me",
  authenticateToken,
  userController.handleGetCurrentUser
);

module.exports = userRouter;
