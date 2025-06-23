const itemService = require("../services/itemService");

async function handleCreateItem(req, res) {
  try {
    const { itemName, description, conditionId, statusId, categoryIds } =
      req.body;

    const userId = req.user.id;

    const itemData = {
      name: itemName,
      description: description || "", // Default to empty string if not provided
      conditionId: conditionId || 1, // Default condition to 1 if not provided
      statusId: statusId || 1, // Default status to 1 if not provided
    };

    const newItem = await itemService.createItem(itemData, categoryIds, userId);
    res.status(201).json(newItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao criar o item." });
  }
}

async function handleGetAllItems(req, res) {
  try {
    const items = await itemService.findAllItems();

    const formattedItems = items.map((item) => ({
      id: item.id,
      itemName: item.item_name,
      description: item.description,
      condition: item.condition.condition,
      status: item.status.status_name,
      categories: item.categories.map((cat) => ({
        id: cat.category.id,
        name: cat.category.category_name,
      })),
      user: {
        id: item.user.id,
        name: item.user.name,
      },
    }));

    res.status(200).json(formattedItems);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao buscar os itens." });
  }
}

module.exports = {
  itemController: {
    handleCreateItem,
    handleGetAllItems,
  },
};
