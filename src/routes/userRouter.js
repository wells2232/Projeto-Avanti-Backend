const { Router } = require("express");
const { userController } = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/auth/register", userController.handleRegister);

userRouter.post("/auth/login", userController.handleLogin);

// userRouter.get("/users", userController.handleGetAllUsers);

module.exports = userRouter;
