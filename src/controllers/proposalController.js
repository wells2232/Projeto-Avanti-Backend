const proposalService = require("../services/proposalService");

async function handleCreateProposal(req, res) {
  try {
    const { message, targetItemId, statusId, offeredItemIds } = req.body;
    const proposerId = req.user.id;

    // Validar se o usuário está autenticado
    if (!proposerId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const proposalData = {
      message,
      targetItemId,
      statusId,
    };

    console.log("Offered Items IDs:", offeredItemIds);

    // Chamar o serviço para criar a proposta
    const newProposal = await proposalService.createProposal(
      proposalData,
      offeredItemIds,
      proposerId
    );

    res.status(201).json(newProposal);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao criar o item.",
    });
  }
}

async function handleFindUserProposals(req, res) {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1; // Padrão de página 1
    const limit = parseInt(req.query.limit) || 10; // Padrão de 10 itens por página

    // Validar se o usuário está autenticado
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    console.log("User ID:", userId);

    // Chamar o serviço para buscar as propostas do usuário
    const { proposals, total, totalPages } =
      await proposalService.findUserProposals(userId, page, limit);

    console.log("Proposals:", proposals);
    const formattedProposals = proposals.map((proposal) => ({
      id: proposal.id,
      message: proposal.message,
      proposerId: proposal.proposerId,
      targetItem: {
        id: proposal.targetItem.id,
        itemName: proposal.targetItem.item_name,
        imageUrl: proposal.targetItem.image_url,
      },
      offeredItems: (proposal.offeredItems || []).map((item) => ({
        id: item.item.id,
        itemName: item.item.item_name,
        imageUrl: item.item.image_url,
      })),
      status: proposal.status.status_name,
      createdAt: proposal.createdAt,
    }));

    res.status(200).json({
      page,
      limit,
      totalItems: total,
      totalPages,
      proposals: formattedProposals,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao buscar propostas do usuário.",
    });
  }
}

module.exports = {
  proposalController: { handleCreateProposal, handleFindUserProposals },
};
