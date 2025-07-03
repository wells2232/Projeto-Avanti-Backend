const {
  itemStatusController,
  proposalStatusController,
} = require("../controllers/statusController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/isAdminMiddleware");
const { Router } = require("express");

const itemStatusRouter = Router();
const proposalStatusRouter = Router();

/// Item Status Routes ///
itemStatusRouter.post(
  "/",
  isAuthenticated,
  isAdmin,
  itemStatusController.handleCreateItemStatus
);

itemStatusRouter.get("/", itemStatusController.handleGetAllItemStatuses);

itemStatusRouter.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  itemStatusController.handleDeleteItemStatus
);

/// Proposal Status Routes ///
proposalStatusRouter.post(
  "/",
  isAuthenticated,
  isAdmin,
  proposalStatusController.handleCreateProposalStatus
);

proposalStatusRouter.get(
  "/",
  proposalStatusController.handleGetAllProposalStatuses
);

proposalStatusRouter.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  proposalStatusController.handleDeleteProposalStatus
);

module.exports = {
  itemStatusRouter,
  proposalStatusRouter,
};
