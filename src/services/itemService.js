const itemRepository = require("../repository/itemRepository");

async function createItem(itemData, categoryIds, userId, imageFile) {
  const dataForRepo = {
    ...itemData,
    userId: userId,
    image_url: imageFile ? imageFile.path : null,
    imageId: imageFile ? imageFile.filename : null,
  };

  // console.log("Data for repository:", dataForRepo);

  const item = await itemRepository.create(dataForRepo, categoryIds);
  return item;
}

async function updateItem(itemId, itemData, categoryIds, userId, imageFile) {
  const item = await itemRepository.findById(itemId);
  if (!itemId) {
    throw new Error("ID do item não fornecido.");
  }
  if (!item) {
    throw new Error("Item não encontrado.");
  }
  if (item.userId !== userId) {
    const err = new Error("Você não tem permissão para atualizar este item.");
    err.name = "UnauthorizedError";
    throw err;
  }
  const dataForRepo = {
    ...itemData,
    userId: userId,
    image_url: imageFile ? imageFile.path : null,
    imageId: imageFile ? imageFile.filename : null,
  };

  return await itemRepository.updateItem(itemId, dataForRepo, categoryIds);
}

async function updateStatus(itemId, statusId) {
  return await itemRepository.updateStatus(itemId, statusId);
}

async function findAllItems(where, page = 1, limit = 10) {
  return await itemRepository.findAllItems(where, page, limit);
}

async function deleteItem(itemId, userId) {
  const item = await itemRepository.findById(itemId);

  if (!itemId) {
    throw new Error("ID do item não fornecido.");
  }

  if (!item) {
    throw new Error("Item não encontrado.");
  }

  if (item.userId !== userId) {
    const err = new Error("Você não tem permissão para deletar este item.");
    err.name = "UnauthorizedError";
    throw err;
  }
  return await itemRepository.deleteItem(itemId);
}

async function findItemById(itemId) {
  return await itemRepository.findById(itemId);
}

module.exports = {
  createItem,
  findAllItems,
  deleteItem,
  findItemById,
  updateItem,
};
