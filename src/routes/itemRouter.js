const { Router } = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { itemController } = require("../controllers/itemController");

const itemRouter = Router();

itemRouter.post("/", authenticateToken, itemController.handleCreateItem);

itemRouter.get("/", itemController.handleGetAllItems);

module.exports = itemRouter;
