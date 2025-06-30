const { itemStatusController } = require("../controllers/itemStatusController");
const { isAdmin, authenticateToken } = require("../middlewares/authMiddleware");
const { Router } = require("express");

const itemStatusRouter = Router();

itemStatusRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  itemStatusController.handleCreateItemStatus
);

itemStatusRouter.get("/", itemStatusController.handleGetAllItemStatuses);

itemStatusRouter.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  itemStatusController.handleDeleteItemStatus
);

module.exports = itemStatusRouter;
