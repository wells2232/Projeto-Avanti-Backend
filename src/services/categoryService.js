const categoryRepository = require("../repository/categoryRepository");

async function createCategory(name) {
  const category = await categoryRepository.createCategory(name);
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
