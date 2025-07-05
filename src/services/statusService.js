const {
  itemStatusRepository,
  proposalStatusRepository,
} = require("../repository/statusRepository");

// ----- Item Status Service -----
async function createItemStatus(name, description) {
  const itemStatus = await itemStatusRepository.createItemStatus(
    name,
    description
  );
  return itemStatus;
}

async function findItemStatusByName(name) {
  const itemStatus = await itemStatusRepository.findItemStatusByName(name);
  if (!itemStatus) {
    throw new Error("Item status not found");
  }
  return itemStatus;
}

async function findAllItemStatuses() {
  const itemStatuses = await itemStatusRepository.findAll();
  return itemStatuses;
}

async function deleteItemStatus(id) {
  const itemStatus = await itemStatusRepository.deleteItemStatus(id);
  return itemStatus;
}

// ----- Proposal Status Service -----
async function createProposalStatus(name, description) {
  const proposalStatus = await proposalStatusRepository.createProposalStatus(
    name,
    description
  );
  return proposalStatus;
}

async function findProposalStatusByName(name) {
  const proposalStatus =
    await proposalStatusRepository.findProposalStatusByName(name);
  if (!proposalStatus) {
    throw new Error("Proposal status not found");
  }
  return proposalStatus;
}

async function findAllProposalStatuses() {
  const proposalStatuses = await proposalStatusRepository.findAll();
  return proposalStatuses;
}

async function deleteProposalStatus(id) {
  const proposalStatus = await proposalStatusRepository.deleteProposalStatus(
    id
  );
  return proposalStatus;
}

module.exports = {
  itemStatusService: {
    createItemStatus,
    findItemStatusByName,
    findAllItemStatuses,
    deleteItemStatus,
  },
  proposalStatusService: {
    createProposalStatus,
    findProposalStatusByName,
    findAllProposalStatuses,
    deleteProposalStatus,
  },
};
