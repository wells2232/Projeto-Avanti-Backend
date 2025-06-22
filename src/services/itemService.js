const itemRepository = require("../repository/itemRepository");

async function createItem(itemData, categoryIds, userId) {
  const dataForRepo = {
    ...itemData,
    userId: userId,
  };

  console.log("Data for repository:", dataForRepo);
  console.log("Category IDs:", categoryIds);

  const item = itemRepository.create(dataForRepo, categoryIds);
  return item;
}

async function findAllItems() {
  const items = await itemRepository.findAllItems();
  return items;
}

module.exports = {
  createItem,
  findAllItems,
};
