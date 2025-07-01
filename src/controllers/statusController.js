const {
  itemStatusService,
  proposalStatusService,
} = require("../services/statusService");

// ----- Item Status Controller -----
async function handleCreateItemStatus(req, res) {
  const { name, description } = req.body;
  try {
    const itemStatus = await itemStatusService.createItemStatus(
      name,
      description
    );
    res.status(201).json(itemStatus);
  } catch (error) {
    console.error("Error creating item status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAllItemStatuses(req, res) {
  try {
    const itemStatuses = await itemStatusService.findAllItemStatuses();
    res.status(200).json(itemStatuses);
  } catch (error) {
    console.error("Error fetching item statuses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteItemStatus(req, res) {
  const { id } = req.params;
  try {
    const itemStatus = await itemStatusService.deleteItemStatus(id);
    res.status(200).json(itemStatus);
  } catch (error) {
    console.error("Error deleting item status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// ----- Proposal Status Controller -----

async function handleCreateProposalStatus(req, res) {
  const { name, description } = req.body;
  try {
    const proposalStatus = await proposalStatusService.createProposalStatus(
      name,
      description
    );
    res.status(201).json(proposalStatus);
  } catch (error) {
    console.error("Error creating proposal status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAllProposalStatuses(req, res) {
  try {
    const proposalStatuses =
      await proposalStatusService.findAllProposalStatuses();
    res.status(200).json(proposalStatuses);
  } catch (error) {
    console.error("Error fetching proposal statuses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteProposalStatus(req, res) {
  const { id } = req.params;
  try {
    const proposalStatus = await proposalStatusService.deleteProposalStatus(id);
    res.status(200).json(proposalStatus);
  } catch (error) {
    console.error("Error deleting proposal status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  itemStatusController: {
    handleCreateItemStatus,
    handleGetAllItemStatuses,
    handleDeleteItemStatus,
  },
  proposalStatusController: {
    handleCreateProposalStatus,
    handleGetAllProposalStatuses,
    handleDeleteProposalStatus,
  },
};
