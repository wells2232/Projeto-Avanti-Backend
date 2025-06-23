const { Router } = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { itemController } = require("../controllers/itemController");
const upload = require("../config/multerConfig.js");

const logRequestState = (req, res, next) => {
  console.log("--- Status da Requisição ---");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("--------------------------");
  next(); // Continua para o próximo middleware
};

const itemRouter = Router();

itemRouter.post(
  "/",
  authenticateToken,
  upload.single("itemImage"),
  logRequestState,
  itemController.handleCreateItem
);

itemRouter.get("/", itemController.handleGetAllItems);

itemRouter.delete("/:id", authenticateToken, itemController.handleDeleteItem);

module.exports = itemRouter;
