const {
  itemStatusController,
  proposalStatusController,
} = require("../controllers/statusController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { Router } = require("express");

const itemStatusRouter = Router();
const proposalStatusRouter = Router();

/// Item Status Routes ///
itemStatusRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  itemStatusController.handleCreateItemStatus
);

itemStatusRouter.get("/", itemStatusController.handleGetAllItemStatuses);

itemStatusRouter.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  itemStatusController.handleDeleteItemStatus
);

/// Proposal Status Routes ///
proposalStatusRouter.post(
  "/",
  authenticateToken,
  isAdmin,
  proposalStatusController.handleCreateProposalStatus
);

proposalStatusRouter.get(
  "/",
  proposalStatusController.handleGetAllProposalStatuses
);

proposalStatusRouter.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  proposalStatusController.handleDeleteProposalStatus
);

module.exports = {
  itemStatusRouter,
  proposalStatusRouter,
};
