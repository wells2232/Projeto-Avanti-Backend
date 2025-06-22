const prisma = require("../lib/prisma");

async function findAllItems() {
  return await prisma.items.findMany({
    select: {
      id: true,
      item_name: true,
      description: true,
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
  });
}

async function create(itemData, categoryIds) {
  return prisma.$transaction(async (tx) => {
    const item = await tx.items.create({
      data: {
        item_name: itemData.name,
        description: itemData.description,
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

module.exports = {
  create,
  findAllItems,
};
