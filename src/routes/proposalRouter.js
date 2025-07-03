const { Router } = require("express");
const { proposalController } = require("../controllers/proposalController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { validateProposalData } = require("../middlewares/validateProposal");
const { proposal } = require("../lib/prisma");

const proposalRouter = Router();

proposalRouter.post(
  "/create",
  isAuthenticated,
  validateProposalData,
  proposalController.handleCreateProposal
);

// Criada para visualizar as propostas criadas(made) pelo current user
proposalRouter.get(
  "/made",
  isAuthenticated,
  proposalController.handleFindUserProposals
);

// Criada para visualizar as propostas recebidas(receveid) pelo current user
proposalRouter.get(
  "/received",
  isAuthenticated,
  proposalController.handleReceivedUserProposals
);

// Quando for dado o comando HTTP DELETE mais a rota '/id' é chamado o proposal controle de delete
proposalRouter.delete(
  "/:id",
  isAuthenticated,
  proposalController.handleDeleteProposal
);

proposalRouter.put(
  "/:id",
  isAuthenticated,
  validateProposalData,
  proposalController.handleUpdateProposal
);

proposalRouter.post(
  "/:id/accept",
  isAuthenticated,
  proposalController.handleAcceptProposal
);

proposalRouter.post(
  "/:id/decline",
  isAuthenticated,
  proposalController.handleDeclineProposal
);

module.exports = proposalRouter;
