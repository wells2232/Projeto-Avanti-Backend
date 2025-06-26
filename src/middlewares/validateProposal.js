function validateProposalData(req, res, next) {
  try {
    // Transformar offeredItemIds em array se necessário
    if (req.body.offeredItemIds) {
      if (typeof req.body.offeredItemIds === "string") {
        try {
          req.body.offeredItemIds = JSON.parse(req.body.offeredItemIds);
        } catch (error) {
          req.body.offeredItemIds = req.body.offeredItemIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id);
        }
      }

      // Validar se é array
      if (!Array.isArray(req.body.offeredItemIds)) {
        return res.status(400).json({
          message: "offeredItemIds deve ser um array.",
        });
      }

      // Validar se array não está vazio
      if (req.body.offeredItemIds.length === 0) {
        return res.status(400).json({
          message: "Deve oferecer pelo menos um item.",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Dados inválidos na requisição.",
    });
  }
}

module.exports = {
  validateProposalData,
};
