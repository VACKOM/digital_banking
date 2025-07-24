import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routers/authRouter.js";
import accountRouter from "./routers/accountRouter.js";
import transactionRouter from "./routers/transactionRouter.js"

dotenv.config();
const app = express();

// Add this middleware:
app.use(express.json()); // ✅ This enables req.body to work with JSON

app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);
app.use('/api/transaction', transactionRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("Database Connected");
        app.listen(process.env.PORT, () =>{
            console.log(`Server is running on ${process.env.PORT}`)
        })
    })
    .catch(err => console.error(err));