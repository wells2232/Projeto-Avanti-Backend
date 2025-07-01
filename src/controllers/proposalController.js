const proposalService = require("../services/proposalService");

// Requisita as propostas feita pelo current user 
async function handleCreateProposal(req, res) {
  try {
    const { message, targetItemId, offeredItemIds } = req.body;
    const proposerId = req.user.id;

    // Para que toda proposta criada tenha status "Pendente" como default.
    const statusId = "6b09c9cf-e12b-439b-886e-73c7d71ac29b"

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
      DestinatárioProposta: proposal.targetItem.user?.name,
      message: proposal.message,
      status: proposal.status.status_name,
      createdAt: proposal.createdAt,
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
      status: proposal.status.status_name,
      createdAt: proposal.createdAt,
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

async function handleDeleteProposal(req, res) {
  try {
     // Define que a Id da proposta vira no params 
    const id = req.params.id;

    // Define que o Id do usuario que atualizou a proposta será o usuario atual. 
    const proposerId = req.user.id;

    // Chama o repositorio de remoção de proposta e atribui a remoção a variavel 'result'
    const result = await proposalService.deleteProposal(id, proposerId);

    // Mensagem exibida quando a remoção é realizada
    res.status(200).json({ message: "Proposta deletado com sucesso." });

    // Se der erro vai retornar essa mensagem
  } catch (error) {
    return res.status(500).json({ 
      message: error.message || "Erro ao deletar o proposta." });
  }
}

async function handleUpdateProposal(req, res) {
  try {
    const id = req.params.id;
    const proposerId = req.user.id;
    const { message  } =req.body;

    // Para que toda proposta editada tenha status "Pendente" como default.
    const statusId = "6b09c9cf-e12b-439b-886e-73c7d71ac29b"

    // Validar se o usuário está autenticado
    if (!proposerId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    };

    const ProposalData = {};
    if (message) ProposalData.message = message;
    if (statusId) ProposalData.statusId = statusId;

    const result = await proposalService.updateProposal(id, proposerId, ProposalData);

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      message: error.message || "Erro ao atualizar o item." 
    });
  }
}

async function handleAcceptProposalStatus(req, res) {
  try {
    const userId = req.user.id; // quem está logado
    const proposalId = req.params.id;
    const statusId = "e7867bbf-be34-45d4-8a26-2d03fcfc66c3"; // status 'aceitado' enviado.

    if (!statusId) {
      return res.status(400).json({ message: "statusId é obrigatório." });
    }

    const result = await proposalService.updateReceivedProposalStatus(
      proposalId,
      userId,
      statusId
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao atualizar status da proposta.",
    });
  }
}

async function handleDeclineProposalStatus(req, res) {
  try {
    const userId = req.user.id; // quem está logado
    const proposalId = req.params.id;
    const statusId = "dbc40e90-d337-4b87-9e72-38bea4477271"; // status 'Recusado' enviado.

    if (!statusId) {
      return res.status(400).json({ message: "statusId é obrigatório." });
    }

    const result = await proposalService.updateReceivedProposalStatus(
      proposalId,
      userId,
      statusId
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erro ao atualizar status da proposta.",
    });
  }
}



module.exports = {
  proposalController: { handleCreateProposal, 
                        handleFindUserProposals,
                        handleReceivedUserProposals, 
                        handleDeleteProposal, 
                        handleUpdateProposal,
                        handleAcceptProposalStatus,
                        handleDeclineProposalStatus
                      },
};
