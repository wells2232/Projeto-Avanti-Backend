// src/app.js
const express = require("express");
const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const authRouter = require("./routes/authRouter");
const proposalRouter = require("./routes/proposalRouter");
const categoryRouter = require("./routes/categoryRouter");
const uploadRouter = require("./routes/uploadRouter");
const {
  itemStatusRouter,
  proposalStatusRouter,
} = require("./routes/statusRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/index.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:5500",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api", mainRouter);

module.exports = { app };
