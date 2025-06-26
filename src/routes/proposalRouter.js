const { Router } = require("express");
const { proposalController } = require("../controllers/proposalController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validateProposalData } = require("../middlewares/validateProposal");

const proposalRouter = Router();

proposalRouter.post(
  "/create",
  authenticateToken,
  validateProposalData,
  proposalController.handleCreateProposal
);

proposalRouter.get(
  "/me/:id",
  authenticateToken,
  proposalController.handleFindUserProposals
);

module.exports = proposalRouter;
