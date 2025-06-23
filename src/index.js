const express = require("express");
const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:5500", // Adjust this to your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

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
