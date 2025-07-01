const prisma = require("../lib/prisma");
const proposalRepository = require("../repository/proposalRepository");
const itemService = require("./itemService");
const {
  itemStatusRepository,
  proposalStatusRepository,
} = require("../repository/statusRepository");

async function createProposal(proposalData, offeredItemIds, proposerId) {
  const { message, targetItemId } = proposalData;

  const defaultStatusId = await proposalStatusRepository.findByName("Pendente");
  if (!defaultStatusId) {
    throw new Error("Status padrão 'Pendente' não encontrado.");
  }

  // Validar se offeredItemIds é um array
  if (!Array.isArray(offeredItemIds) || offeredItemIds.length === 0) {
    throw new Error("Deve fornecer pelo menos um item para oferecer.");
  }

  if (!targetItemId) {
    throw new Error("ID do item alvo não fornecido.");
  }

  if (!message || message.trim() === "") {
    throw new Error("Mensagem não fornecida.");
  }

  if (!Array.isArray(offeredItemIds) || offeredItemIds.length === 0) {
    throw new Error("Deve fornecer pelo menos um item para oferecer.");
  }

  // Verifica se todos os itens oferecidos pertencem ao usuario logado
  const offeredItems = await prisma.items.findMany({
    where: {
      id: { in: offeredItemIds },
      userId: proposerId,
    },
  });

  if (offeredItems.length !== offeredItemIds.length) {
    throw new Error("Todos os itens devem pertencer ao usuario logado.");
  }

  const targetItem = await prisma.items.findUnique({
    where: { id: targetItemId },
    select: { userId: true },
  });

  if (!targetItem) {
    throw new Error("Item alvo não encontrado.");
  }

  if (targetItem.userId === proposerId) {
    throw new Error("Você não pode fazer proposta para seu próprio item.");
  }

  // Verifica se já existe a proposta desse user para esse item
  const existingProposal =
    await proposalRepository.findProposalByTargetIdAndProposerId(
      targetItemId,
      proposerId
    );
  //se a proposta existir vai aparecer essa mensagem
  if (existingProposal) {
    throw new Error(
      "Já existe uma proposta para este item alvo por este usuário."
    );
  }

  const reservedStatus = await itemStatusRepository.findByName("Reservado");

  const itemsToUpdate = [targetItemId, ...offeredItemIds].map((itemId) =>
    itemService.updateStatus(itemId, reservedStatus.id)
  );

  // Atualiza o status dos itens oferecidos para "Reservado"
  await Promise.all(itemsToUpdate);

  const dataForRepo = {
    message,
    proposerId,
    targetItemId,
    statusId: defaultStatusId.id, // Padrão "Pendente"
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

  return await proposalRepository.findUserReceivedProposals(
    userId,
    page,
    limit
  );
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

async function updateProposal(id, proposerId, updateProposal) {
  if (!id || !proposerId) {
    throw new Error("ID da proposta ou do usuário não fornecido.");
  }

  const updated = await proposalRepository.updateProposalById(
    id,
    proposerId,
    updateProposal
  );

  if (updated.count === 0) {
    throw new Error("Proposta não encontrada ou não pertence ao usuário.");
  }

  return { message: "Proposta atualizada com sucesso." };
}

async function acceptProposal(proposalId, acceptingUserId) {
  const proposal = await proposalRepository.findByIdWithItems(proposalId);
  if (!proposal) {
    throw new Error("Proposta não encontrada.");
  }

  if (proposal.targetItem.userId !== acceptingUserId) {
    throw new Error("Ação não permitida: você não é o dono do item alvo.");
  }

  const tradedItemStatus = await itemStatusRepository.findByName("Trocado");
  const acceptedProposalStatus = await proposalStatusRepository.findByName(
    "Aceita"
  );

  if (!tradedItemStatus || !acceptedProposalStatus) {
    throw new Error("Status 'Trocado' ou 'Aceita' não encontrado.");
  }

  return prisma.$transaction(async (tx) => {
    await proposalRepository.updateStatus(
      proposalId,
      acceptedProposalStatus.id,
      tx
    );

    const targetItemId = proposal.targetItemId;
    const offeredItemIds = proposal.offeredItems.map(
      (offered) => offered.itemId
    );
    const allItemsIdsToUpdate = [targetItemId, ...offeredItemIds];

    const itemsToUpdate = allItemsIdsToUpdate.map((itemId) =>
      itemService.updateStatus(itemId, tradedItemStatus.id, tx)
    );

    await Promise.all(itemsToUpdate);

    return {
      success: true,
      updatedItems: allItemsIdsToUpdate.length,
      proposalId,
    };
  });
}

async function DeclineProposal(proposalId, DecliningUserId) {
  const proposal = await proposalRepository.findByIdWithItems(proposalId);
  if (!proposal) {
    throw new Error("Proposta não encontrada.");
  }

  if (proposal.targetItem.userId !== DecliningUserId) {
    throw new Error("Ação não permitida: você não é o dono do item alvo.");
  }

  const tradedItemStatus = await itemStatusRepository.findByName("Trocado");
  const DeclinedProposalStatus = await proposalStatusRepository.findByName(
    "Recusada"
  );

  if (!tradedItemStatus || !DeclinedProposalStatus) {
    throw new Error("Status 'Trocado' ou 'Recusada' não encontrado.");
  }

  return prisma.$transaction(async (tx) => {
    await proposalRepository.updateStatus(
      proposalId,
      DeclinedProposalStatus.id,
      tx
    );

    const targetItemId = proposal.targetItemId;
    const offeredItemIds = proposal.offeredItems.map(
      (offered) => offered.itemId
    );
    const allItemsIdsToUpdate = [targetItemId, ...offeredItemIds];

    const itemsToUpdate = allItemsIdsToUpdate.map((itemId) =>
      itemService.updateStatus(itemId, tradedItemStatus.id, tx)
    );

    await Promise.all(itemsToUpdate);

    return {
      success: true,
      updatedItems: allItemsIdsToUpdate.length,
      proposalId,
    };
  });
}

module.exports = {
  acceptProposal,
  DeclineProposal,
  createProposal,
  findUserProposals,
  findProposalsReceived,
  deleteProposal,
  updateProposal,
};
