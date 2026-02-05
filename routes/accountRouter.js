import express from "express";
import auth from '../middleware/auth.js';
import {

    createAccount,
    getAccount,
    updateAccount,
    deleteAccount
} from "../controllers/accountController.js"



const accountRouter = express.Router();

accountRouter.post('/', auth, createAccount);
accountRouter.get('/', auth, getAccount);
accountRouter.put('/:id', auth, updateAccount);
accountRouter.post('/:id', auth, deleteAccount);

export default accountRouter;