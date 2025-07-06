const itemConditionController = require("../controllers/itemConditionController");
const { Router } = require("express");

const itemConditionRouter = Router();

// Rota para obter todas as condições de itens
itemConditionRouter.get(
  "/",
  itemConditionController.handleGetAllItemConditions
);

// Exporta o roteador
module.exports = itemConditionRouter;
