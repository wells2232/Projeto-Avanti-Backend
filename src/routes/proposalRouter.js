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

proposalRouter.delete("/:id", authenticateToken, proposalController.handleDeleteProposal);

// proposalRouter.put(
//   "/:id",
//   authenticateToken,
//   upload.single("itemImage"),
//   logRequestState,
//   proposalController.handleUpdateItem
// );



module.exports = proposalRouter;
