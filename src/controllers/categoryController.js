const { ca } = require("zod/v4/locales");
const categoryService = require("../services/categoryService");

async function handleCreateCategory(req, res) {
  const { categoryName } = req.body;
  try {
    const { category_name } = await categoryService.createCategory(
      categoryName
    );
    res.status(201).json({ category_name });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

async function handleGetAllCategories(req, res) {
  try {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await categoryService.deleteCategory(id);
    res.status(200).json(category);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  categoryController: {
    handleCreateCategory,
    handleGetAllCategories,
    handleDeleteCategory,
  },
};
