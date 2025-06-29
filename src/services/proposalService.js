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
  } // Validar se o status foi fornecido
  if (!statusId) {
    throw new Error("Status não fornecido.");
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

module.exports = {
  createProposal,
  findUserProposals,
  findProposalsReceived,
};
