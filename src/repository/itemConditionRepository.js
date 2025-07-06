const prisma = require("../lib/prisma");

async function findAll() {
  try {
    const itemConditions = await prisma.itemConditions.findMany();
    return itemConditions;
  } catch (error) {
    console.error("Error fetching item conditions:", error);
    throw error;
  }
}

module.exports = {
  findAll,
};
