const { categoryController } = require("../controllers/categoryController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { Router } = require("express");

const categoryRouter = Router();

categoryRouter.post(
  "/create",
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
