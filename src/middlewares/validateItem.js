function validateCategoryData(req, res, next) {
  try {
    // Transformar categoryIds em array se necessário
    if (req.body.categoryIds) {
      if (typeof req.body.categoryIds === "string") {
        try {
          req.body.categoryIds = JSON.parse(req.body.categoryIds);
        } catch (error) {
          req.body.categoryIds = req.body.categoryIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id);
        }
      }

      // Validar se é array
      if (!Array.isArray(req.body.categoryIds)) {
        return res.status(400).json({
          message: "categoryIds deve ser um array.",
        });
      }

      // Validar se array não está vazio
      if (req.body.categoryIds.length === 0) {
        return res.status(400).json({
          message: "Deve oferecer pelo menos uma categoria.",
        });
      }
    }

    next();
  } catch (error) {
    console.error("Erro ao validar dados da categoria:", error);
    return res.status(400).json({
      message: "Dados inválidos na requisição.",
    });
  }
}

module.exports = {
  validateCategoryData,
};
