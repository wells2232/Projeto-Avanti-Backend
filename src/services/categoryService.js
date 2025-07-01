const categoryRepository = require("../repository/categoryRepository");

async function createCategory(name) {
  const category = await categoryRepository.createCategory(name);

  if (!category) {
    throw new Error("Erro ao criar categoria");
  }

  return category;
}

async function findAllCategories() {
  const categories = await categoryRepository.findAllCategories();
  return categories;
}

async function deleteCategory(id) {
  const category = await categoryRepository.deleteCategory(id);
  return category;
}

module.exports = {
  createCategory,
  findAllCategories,
  deleteCategory,
};
