const { Router } = require("express");

// Importa todos os roteadores modulares
const authRouter = require("./authRouter.js");
const userRouter = require("./userRouter.js");
const itemRouter = require("./itemRouter.js");
const proposalRouter = require("./proposalRouter.js");
const categoryRouter = require("./categoryRouter.js");
const { itemStatusRouter } = require("./statusRouter.js");
const itemConditionRouter = require("./itemConditionRouter.js");
const { proposalStatusRouter } = require("./statusRouter.js");
const uploadRouter = require("./uploadRouter.js");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = Router();

// Define o caminho base para cada roteador modular
router.use("/auth", authRouter);
router.use("/user", userRouter); // Rotas como /users/me, /users/update/:id
router.use("/items", itemRouter);
router.use("/proposals", isAuthenticated, proposalRouter);
router.use("/categories", categoryRouter);
router.use("/item-status", itemStatusRouter);
router.use("/item-conditions", itemConditionRouter);
router.use("/proposal-status", proposalStatusRouter);
router.use("/upload", uploadRouter);

module.exports = router;
