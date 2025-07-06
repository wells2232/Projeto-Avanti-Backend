const itemConditionRepository = require("../repository/itemConditionRepository");

async function getAllItemConditions() {
  return itemConditionRepository.findAll();
}

module.exports = {
  getAllItemConditions,
};
