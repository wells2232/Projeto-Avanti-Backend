const { categoryController } = require("../controllers/categoryController");
const { isAdmin, authenticateToken } = require("../middlewares/authMiddleware");
const { Router } = require("express");

const categoryRouter = Router();

categoryRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  categoryController.handleCreateCategory
);

categoryRouter.get("/", categoryController.handleGetAllCategories);

categoryRouter.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  categoryController.handleDeleteCategory
);

module.exports = categoryRouter;
