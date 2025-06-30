const itemStatusRepository = require("../repository/itemStatusRepository");

async function createItemStatus(name, description) {
  const itemStatus = await itemStatusRepository.createItemStatus(
    name,
    description
  );
  return itemStatus;
}

async function findAllItemStatuses() {
  const itemStatuses = await itemStatusRepository.findAllItemStatuses();
  return itemStatuses;
}

async function deleteItemStatus(id) {
  const itemStatus = await itemStatusRepository.deleteItemStatus(id);
  return itemStatus;
}

module.exports = {
  createItemStatus,
  findAllItemStatuses,
  deleteItemStatus,
};
