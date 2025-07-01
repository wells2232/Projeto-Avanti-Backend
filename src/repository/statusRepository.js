const prisma = require("../lib/prisma");

// ----- Item Status Repository -----
async function createItemStatus(name, description) {
  const itemStatus = await prisma.itemStatuses.create({
    data: {
      status_name: name,
      description: description,
    },
  });
  return itemStatus;
}

async function findItemStatusByName(name) {
  return await prisma.itemStatuses.findUnique({
    where: {
      status_name: name,
    },
  });
}

async function findAllItemStatuses() {
  const itemStatuses = await prisma.itemStatuses.findMany({
    orderBy: {
      status_name: "asc",
    },
    select: {
      id: true,
      status_name: true,
      description: true,
    },
  });
  return itemStatuses;
}

async function deleteItemStatus(id) {
  const itemStatus = await prisma.itemStatuses.delete({
    where: {
      id: id,
    },
  });
  return itemStatus;
}

/// ------- Proposal Status Repository -------
async function createProposalStatus(name, description) {
  return await prisma.proposalStatuses.create({
    data: {
      status_name: name,
      description: description,
    },
  });
}

async function findProposalStatusByName(name) {
  return await prisma.proposalStatuses.findUnique({
    where: {
      status_name: name,
    },
  });
}

async function findAllProposalStatuses() {
  return await prisma.proposalStatuses.findMany({
    orderBy: {
      status_name: "asc",
    },
    select: {
      id: true,
      status_name: true,
      description: true,
    },
  });
}

async function deleteProposalStatus(id) {
  return await prisma.proposalStatuses.delete({
    where: {
      id: id,
    },
  });
}

module.exports = {
  itemStatusRepository: {
    create: createItemStatus,
    findAll: findAllItemStatuses,
    delete: deleteItemStatus,
    findByName: findItemStatusByName,
  },
  proposalStatusRepository: {
    create: createProposalStatus,
    findAll: findAllProposalStatuses,
    delete: deleteProposalStatus,
    findByName: findProposalStatusByName,
  },
};
