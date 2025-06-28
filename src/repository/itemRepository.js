const prisma = require("../lib/prisma");

async function findAllItems(where, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.items.findMany({
      where,
      skip: skip,
      take: limit,
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        item_name: true,
        description: true,
        image_url: true,
        image_public_id: true,
        categories: {
          select: {
            category: {
              select: {
                id: true,
                category_name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        condition: {
          select: {
            condition: true, // Apenas o nome da condição
          },
        },
        status: {
          select: {
            status_name: true, // Apenas o nome do status
          },
        },
      },
    }),
    prisma.items.count(),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function create(itemData, categoryIds) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.items.create({
      data: {
        item_name: itemData.name,
        description: itemData.description,
        image_url: itemData.image_url, // Optional image URL
        image_public_id: itemData.imageId, // Optional image ID
        userId: itemData.userId, // Assuming userId is passed in itemData
        conditionId: itemData.conditionId || 1, // Default to condition ID 1 if not provided
        statusId: itemData.statusId || 1, // Default to status ID 1 if not provided

        categories: {
          create: categoryIds.map((catId) => ({
            category: {
              connect: {
                id: catId,
              },
            },
          })),
        },
      },
    });

    return item;
  });
}

async function deleteItem(itemId) {
  return prisma.items.delete({
    where: { id: itemId },
  });
}

async function findById(itemId) {
  return prisma.items.findUnique({
    where: { id: itemId },
  });
}

async function updateItem(itemId, itemData, categoryIds) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.items.update({
      where: { id: itemId },
      data: {
        item_name: itemData.name,
        description: itemData.description,
        image_url: itemData.image_url, // Optional image URL
        image_public_id: itemData.imageId, // Optional image ID
        userId: itemData.userId, // Assuming userId is passed in itemData
        conditionId: itemData.conditionId || 1, // Default to condition ID 1 if not provided
        statusId: itemData.statusId || 1, // Default to status ID 1 if not provided

        categories: {
          deleteMany: {}, // Remove all existing categories
          create: categoryIds.map((catId) => ({
            category: {
              connect: {
                id: catId,
              },
            },
          })),
        },
      },
    });

    return item;
  });
}

module.exports = {
  create,
  findAllItems,
  deleteItem,
  findById,
  updateItem,
};
