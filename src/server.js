require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const authRouter = require("./routes/authRouter");
const proposalRouter = require("./routes/proposalRouter");
const categoryRouter = require("./routes/categoryRouter");
const {
  itemStatusRouter,
  proposalStatusRouter,
} = require("./routes/statusRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  // Frontend URL
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use("/api", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/items", itemRouter);

app.use("/api/proposals", proposalRouter);

app.use("/api/categories", categoryRouter);

app.use("/api/item-statuses", itemStatusRouter);

app.use("/api/proposal-statuses", proposalStatusRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
