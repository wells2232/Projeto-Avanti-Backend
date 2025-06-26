const prisma = require("../lib/prisma");

async function create(proposalData, offeredItemIds) {
  return prisma.$transaction(async (tx) => {
    const proposal = await tx.proposal.create({
      data: {
        message: proposalData.message,
        proposerId: proposalData.proposerId,
        targetItemId: proposalData.targetItemId,
        statusId: proposalData.statusId,
        offeredItems: {
          create: offeredItemIds.map((itemId) => ({
            item: {
              connect: {
                id: itemId,
              },
            },
          })),
        },
      },
    });

    return proposal;
  });
}

async function findUserProposals(userId, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [proposals, total] = await Promise.all([
    prisma.proposal.findMany({
      where: {
        proposerId: userId,
      },
      skip: offset,
      take: limit,
      include: {
        offeredItems: {
          include: {
            item: {
              select: {
                id: true,
                item_name: true,
                image_url: true,
              },
            },
          },
        },
        targetItem: {
          select: {
            id: true,
            item_name: true,
            image_url: true,
          },
        },
        status: {
          select: {
            status_name: true,
          },
        },
      },
    }),
    prisma.proposal.count({
      where: {
        proposerId: userId,
      },
    }),
  ]);
  return {
    proposals,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function findProposalByTargetIdAndProposerId(targetItemId, proposerId) {
  return prisma.proposal.findFirst({
    where: {
      targetItemId: targetItemId,
      proposerId: proposerId,
    },
  });
}

module.exports = {
  create,
  findUserProposals,
  findProposalByTargetIdAndProposerId,
};
