const categoryService = require("../services/categoryService");

async function handleCreateCategory(req, res) {
  const { name } = req.body;
  const slug = slugify(name);
  try {
    const { name, slug } = await categoryService.createCategory(
      name,
      slug
    );
    res.status(201).json({ name });
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
