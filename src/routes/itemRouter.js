const { Router } = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { itemController } = require("../controllers/itemController");
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
  isAuthenticated,
  validateCategoryData,
  itemController.handleCreateItem
);

// Buscar todos items
itemRouter.get("/", itemController.handleGetAllItems);

// Buscar Item por ID
itemRouter.get("/:id", itemController.handleGetItemById);

itemRouter.get(
  "/user/:id",
  isAuthenticated,
  itemController.handleGetUserItems
);

// Deletar Item
itemRouter.delete("/:id", isAuthenticated, itemController.handleDeleteItem);

// Editar Item
itemRouter.put(
  "/:id",
  isAuthenticated,
  logRequestState,
  itemController.handleUpdateItem
);

module.exports = itemRouter;
