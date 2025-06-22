const express = require("express");
const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", userRouter);

app.use("/api/items", itemRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
