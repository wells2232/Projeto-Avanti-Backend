const { proposal } = require("../lib/prisma");
const prisma = require("../lib/prisma");
const proposalRepository = require("../repository/proposalRepository");

async function createProposal(proposalData, offeredItemIds, proposerId) {
  const { message, targetItemId, statusId } = proposalData;

    // Validar se o usuário 
    if (!proposerId) {
      throw new Error("ID não fornecido.");
    }

      // Validar se offeredItemIds é um array
    if (!Array.isArray(offeredItemIds) || offeredItemIds.length === 0) {
      throw new Error("Deve fornecer pelo menos um item para oferecer.");
    }

    if (!targetItemId) {
      throw new Error("ID do item alvo não fornecido.");
    }

    if(!message || message.trim() === ""){
      throw new Error("Mensagem não fornecida.");
    }

    if (!Array.isArray(offeredItemIds) || offeredItemIds.length === 0){
        throw new Error("Deve fornecer pelo menos um item para oferecer.");
    }

  // Verifica se todos os itens oferecidos pertencem ao usuario logado
  const offeredItems =
   await prisma.items.findMany({
      where: {
        id : { in: offeredItemIds },
        userId: proposerId,
      }
    });

    if (offeredItems.length !== offeredItemIds.length){
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

  const dataForRepo = {
    message,
    proposerId,
    targetItemId,
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


async function updateProposal(id, proposerId, updateProposal) {
  if (!id || !proposerId) {
    throw new Error("ID da proposta ou do usuário não fornecido.");
  }

  const updated = await proposalRepository.updateProposalById(id, proposerId, updateProposal);

  if (updated.count === 0) {
    throw new Error("Proposta não encontrada ou não pertence ao usuário.");
  }

  return { message: "Proposta atualizada com sucesso." };
}


module.exports = {
  createProposal,
  findUserProposals,
  findProposalsReceived,
  deleteProposal,
  updateProposal
};
