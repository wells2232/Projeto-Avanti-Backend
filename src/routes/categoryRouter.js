const { categoryController } = require("../controllers/categoryController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { Router } = require("express");

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  categoryController.handleCreateCategory
);

categoryRouter.get("/", categoryController.handleGetAllCategories);

categoryRouter.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  categoryController.handleDeleteCategory
);

module.exports = categoryRouter;
