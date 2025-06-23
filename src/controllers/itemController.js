const itemService = require("../services/itemService");

async function handleCreateItem(req, res) {
  try {
    console.log("req.body recebido:", req.body);

    const { item_name, description, conditionId, statusId, categoryIds } =
      req.body;

    const userId = req.user.id;
    const imageFile = req.file; // Arquivo de imagem enviado

    const itemData = {
      name: item_name,
      description: description,
      conditionId: conditionId,
      statusId: statusId,
    };

    const newItem = await itemService.createItem(
      itemData,
      categoryIds,
      userId,
      imageFile
    );
    res.status(201).json(newItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao criar o item." });
  }
}

async function handleGetAllItems(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // Padrão para a página 1
    const limit = parseInt(req.query.limit) || 50; // Padrão para 10 itens por página

    const { items, total, totalPages } = await itemService.findAllItems(
      page,
      limit
    );

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

    res.status(200).json({
      page,
      limit,
      totalItems: total,
      totalPages,
      items: formattedItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao buscar os itens." });
  }
}

async function handleDeleteItem(req, res) {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    await itemService.deleteItem(itemId, userId);

    res.status(200).json({ message: "Item deletado com sucesso." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao deletar o item." });
  }
}

module.exports = {
  itemController: {
    handleCreateItem,
    handleGetAllItems,
    handleDeleteItem,
  },
};
