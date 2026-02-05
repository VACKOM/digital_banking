import express from "express";
import auth from '../middleware/auth.js';
import {

    createTransaction,
    getUserTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactionController.js"



const transactionRouter = express.Router();

transactionRouter.post('/', auth, createTransaction);
transactionRouter.get('/', auth, getUserTransactions);
transactionRouter.get('/:id', auth, getTransactionById);
transactionRouter.put('/:id', auth, updateTransaction);
transactionRouter.post('/:id', auth, deleteTransaction);

export default transactionRouter;