const proposalService = require("../services/proposalService");

// Requisita as propostas feita pelo current user 
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

async function handleReceivedUserProposals(req, res) {
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
      await proposalService.findProposalsReceived(userId, page, limit);

    console.log("Proposals:", proposals);

    const formattedProposals = proposals.map((proposal) => ({
      id: proposal.id,
      message: proposal.message,
      proposerId: proposal.proposerId,
      proposerName: proposal.proposer?.name,
      user: {
        id: proposal.targetItem.user?.id,
        name: proposal.targetItem.user?.name,
      },
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

// async function handleDeleteProposal(req, res) {
//   try {
//     const id = req.params.id;
//     const proposerId = req.user.id;

//     await proposalService.deleteItem(id, proposerId);

//     res.status(200).json({ message: "Proposta deletado com sucesso." });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: error.message || "Erro ao deletar o proposta." });
//   }
// }

// async function handleUpdateProposal(req, res) {
//   try {
//     const itemId = req.params.id;
//     const { item_name, description, conditionId, statusId, categoryIds } =
//       req.body;
//     const userId = req.user.id;
//     const imageFile = req.file; // Arquivo de imagem enviado

//     const itemData = {
//       name: item_name,
//       description: description,
//       conditionId: conditionId,
//       statusId: statusId,
//     };

//     const updatedItem = await itemService.updateItem(
//       itemId,
//       itemData,
//       categoryIds,
//       userId,
//       imageFile
//     );

//     res.status(200).json(updatedItem);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: error.message || "Erro ao atualizar o item." });
//   }
// }


module.exports = {
  proposalController: { handleCreateProposal, 
                        handleFindUserProposals,
                        handleReceivedUserProposals, 
                        // handleDeleteProposal, handleUpdateProposal 
                      },
};
