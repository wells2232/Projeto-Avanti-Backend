const prisma = require("../lib/prisma");

async function createCategory(name) {
  const category = await prisma.category.create({
    data: {
      name: name,
    },
  });
  return category;
}

async function findAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
  return categories;
}

async function deleteCategory(id) {
  const category = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return category;
}

module.exports = {
  createCategory,
  findAllCategories,
  deleteCategory,
};
