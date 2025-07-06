const itemConditionService = require("../services/itemConditionService");

async function handleGetAllItemConditions(req, res, next) {
  try {
    const itemConditions = await itemConditionService.getAllItemConditions();
    res.json(itemConditions);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  handleGetAllItemConditions,
};
