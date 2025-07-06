const itemService = require("../services/itemService");
const z = require("zod");

async function handleCreateItem(req, res) {
  try {
    const {
      item_name,
      description,
      conditionId,
      categoryIds,
      imageUrl,
      publicId,
    } = req.body;

    const userId = req.user.id;

    const itemData = {
      name: item_name,
      description: description,
      conditionId: conditionId,
      imageUrl: imageUrl,
      publicId: publicId,
    };

    console.log("Dados do item:", itemData);

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
    const querySchema = z.object({
      page: z.string().transform(Number).optional().default(1),
      limit: z.string().transform(Number).optional().default(10),
      status_name: z.string().optional(),
      condition_name: z.string().optional(),
      category_name: z.string().optional(),
    });

    const parsed = querySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        issues: parsed.error.issues,
      });
    }

    const { page, limit, status_name, condition_name, category_name } =
      parsed.data;

    const where = {};
    if (status_name) where.status.name = status_name;
    if (condition_name) where.condition.name = condition_name;
    if (category_name) {
      where.categories = {
        some: {
          category: {
            category_name: category_name,
          },
        },
      };
    }

    console.log("Filtro: ", where);

    const result = await itemService.findAllItems(where, page, limit);

    const formattedItems = result.items.map((item) => ({
      id: item.id,
      itemName: item.item_name,
      description: item.description,
      condition: item.condition.condition,
      status: item.status.status_name,
      imageUrl: item.image_url,
      imageId: item.image_public_id,
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
      totalItems: result.total,
      totalPages: result.totalPages,
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

async function handleUpdateItem(req, res) {
  try {
    const itemId = req.params.id;
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

    const updatedItem = await itemService.updateItem(
      itemId,
      itemData,
      categoryIds,
      userId,
      imageFile
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao atualizar o item." });
  }
}

async function handleGetItemById(req, res) {
  try {
    const itemId = req.params.id;
    const item = await itemService.findItemById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado." });
    }

    const formattedItem = {
      id: item.id,
      itemName: item.item_name,
      description: item.description,
      condition: item.condition.condition,
      status: item.status.status_name,
      imageUrl: item.image_url,
      imageId: item.imageId,
      categories: item.categories.map((cat) => ({
        id: cat.category.id,
        name: cat.category.category_name,
      })),
      user: {
        id: item.user.id,
        name: item.user.name,
      },
    };

    res.status(200).json(formattedItem);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Erro ao buscar o item." });
  }
}

module.exports = {
  itemController: {
    handleCreateItem,
    handleGetAllItems,
    handleDeleteItem,
    handleUpdateItem,
    handleGetItemById,
  },
};
