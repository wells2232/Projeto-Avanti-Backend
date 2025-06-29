const { proposal } = require("../lib/prisma");
const proposalRepository = require("../repository/proposalRepository");

async function createProposal(proposalData, offeredItemIds, proposerId) {
  const { message, targetItemId, statusId } = proposalData;

  // Validar se o usuário 
  if (!proposerId) {
    throw new Error("ID não fornecido.");
  }

  const existingProposal =
    await proposalRepository.findProposalByTargetIdAndProposerId(
      targetItemId,
      proposerId
    );
  if (existingProposal) {
    throw new Error(
      "Já existe uma proposta para este item alvo por este usuário."
    );
  }

  // Validar se o item alvo 
  if (!targetItemId) {
    throw new Error("ID do item alvo não fornecido.");
  }

  // Validar se a mensagem foi fornecida
  if (!message || message.trim() === "") {
    throw new Error("Mensagem não fornecida.");
  }

  // Validar se offeredItemIds é um array
  if (!Array.isArray(offeredItemIds) || offeredItemIds.length === 0) {
    throw new Error("Deve fornecer pelo menos um item para oferecer.");
  }

  const dataForRepo = {
    message,
    proposerId: proposerId,
    targetItemId: targetItemId,
    statusId,
  };

  const proposal = await proposalRepository.create(dataForRepo, offeredItemIds);
  return proposal;
}

//  Essa função retorna as propostas criadas(made) pelo current user 
async function findUserProposals(userId, page = 1, limit = 10) {
  if (!userId) {
    throw new Error("ID do usuário não fornecido.");
  }
  const proposals = await proposalRepository.findUserProposals(
    userId,
    page,
    limit
  );
  return proposals;
}

// Essa função retorna as propostas recebidas(received) pelo current user
async function findProposalsReceived(userId, page = 1, limit = 10) {
  if (!userId) {
    throw new Error("ID do usuário não fornecido.");
  }
  
  return await proposalRepository.findUserReceivedProposals(userId, page, limit);

}


async function deleteProposal(id, proposerId) {
  // verifica se o id da proposta ou usuario existe no BD
  if (!id || !proposerId) {
    throw new Error("ID da proposta ou do usuário não fornecido.");
  }

// Chama o repositorio que faz o delete dessa proposta por id e atribui essa remoção dessa proposta a variavel 'deleted' 
  const deleted = await proposalRepository.deleteProposalById(id, proposerId);

// Se 'deleted' estiver vazia então mostra o erro 
  if (deleted.count === 0) {
    throw new Error("Proposta não encontrada ou não pertence ao usuário.");
  }

// Quando é feito a remoção da proposta retorna essa mensagem
  return { message: "Proposta deletada com sucesso." };
}


module.exports = {
  createProposal,
  findUserProposals,
  findProposalsReceived,
  deleteProposal
};
