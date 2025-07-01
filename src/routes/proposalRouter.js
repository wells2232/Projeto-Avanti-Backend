const { Router } = require("express");
const { proposalController } = require("../controllers/proposalController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validateProposalData } = require("../middlewares/validateProposal");
const { proposal } = require("../lib/prisma");

const proposalRouter = Router();

proposalRouter.post(
  "/create",
  authenticateToken,
  validateProposalData,
  proposalController.handleCreateProposal
);

// Criada para visualizar as propostas criadas(made) pelo current user
proposalRouter.get(
  "/made",
  authenticateToken,
  proposalController.handleFindUserProposals
);

// Criada para visualizar as propostas recebidas(receveid) pelo current user
proposalRouter.get(
  "/received",
  authenticateToken,
  proposalController.handleReceivedUserProposals
);

// Quando for dado o comando HTTP DELETE mais a rota '/id' é chamado o proposal controle de delete
proposalRouter.delete(
  "/:id",
  authenticateToken,
  proposalController.handleDeleteProposal
);

proposalRouter.put(
  "/:id",
  authenticateToken,
  proposalController.handleUpdateProposal
);

proposalRouter.post(
  "/:id/accept",
  authenticateToken,
  proposalController.handleAcceptProposal
);

proposalRouter.post(
  "/:id/decline",
  authenticateToken,
  proposalController.handleDeclineProposal
);


module.exports = proposalRouter;
