const prisma = require("../lib/prisma");

async function createItemStatus(name, description) {
  const itemStatus = await prisma.itemStatuses.create({
    data: {
      status_name: name,
      description: description,
    },
  });
  return itemStatus;
}

async function findAllItemStatuses() {
  const itemStatuses = await prisma.itemStatuses.findMany({
    orderBy: {
      status_name: "asc",
    },
    select: {
      id: true,
      status_name: true,
      description: true,
    },
  });
  return itemStatuses;
}

async function deleteItemStatus(id) {
  const itemStatus = await prisma.itemStatuses.delete({
    where: {
      id: id,
    },
  });
  return itemStatus;
}

module.exports = {
  createItemStatus,
  findAllItemStatuses,
  deleteItemStatus,
};
