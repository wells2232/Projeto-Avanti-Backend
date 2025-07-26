const { Router } = require("express");
const userController = require("../controllers/userController");
const { validateRegister } = require("../middlewares/validadeRegister");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const userRouter = Router();

userRouter.post("/auth/register", validateRegister,  (req, res, next) =>
  userController.handleRegister(req, res, next)
);

userRouter.post("/auth/login", userController.handleLogin);

userRouter.post("/auth/logout", userController.handleLogout);

userRouter.get(
  "/auth/me",
  isAuthenticated,
  userController.handleGetCurrentUser

);

userRouter.patch(
  "/update/:id",
  isAuthenticated,
  userController.handleUpdateUser
);

userRouter.patch(
  "/me/change-password",
  isAuthenticated,
  userController.handleChangePassword
);

module.exports = userRouter;
