const { Router } = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { itemController } = require("../controllers/itemController");
const upload = require("../config/multerConfig.js");
const { validateCategoryData } = require("../middlewares/validateItem.js");

const logRequestState = (req, res, next) => {
  console.log("--- Status da Requisição ---");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("--------------------------");
  next(); // Continua para o próximo middleware
};

const itemRouter = Router();

// Criar item
itemRouter.post(
  "/",
  authenticateToken,
  upload.single("itemImage"),
  logRequestState,
  validateCategoryData,
  itemController.handleCreateItem
);

// Buscar todos items
itemRouter.get("/", itemController.handleGetAllItems);

// Buscar Item por ID
itemRouter.get("/:id", itemController.handleGetItemById);

// Deletar Item
itemRouter.delete("/:id", authenticateToken, itemController.handleDeleteItem);

// Editar Item
itemRouter.put(
  "/:id",
  authenticateToken,
  upload.single("itemImage"),
  logRequestState,
  itemController.handleUpdateItem
);

module.exports = itemRouter;
