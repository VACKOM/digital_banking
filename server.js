import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import accountRouter from "./routes/accountRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Digital Banking API is running");
});

app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);
app.use("/api/transaction", transactionRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
