import { v4 as uuidv4 } from "uuid";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  const {
    type,
    amount,
    currency = "GHS",
    description = "",
    senderAccount,
    receiverAccount,
  } = req.body;

  try {
    // Basic validation
    if (!type || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transaction details" });
    }

    // Find sender account and verify ownership
    const sender = await Account.findOne({
      _id: senderAccount,
      userId: req.user.id,
    });
    if (!sender) {
      return res.status(404).json({ message: "Sender account not found" });
      console.log(userId);
    }

    // Check for sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Find receiver account if applicable
    let receiver = null;
    if ((type === "transfer" || type === "payment") && receiverAccount) {
      receiver = await Account.findById(receiverAccount);
      if (!receiver) {
        return res.status(404).json({ message: "Receiver account not found" });
      }
    }

    // Deduct from sender
    sender.balance -= amount;
    await sender.save();

    // Credit receiver
    if (receiver) {
      receiver.balance += amount;
      await receiver.save();
    }

    // Save transaction
    const transaction = new Transaction({
      type,
      amount,
      currency,
      description,
      status: "completed",
      senderAccount,
      receiverAccount,
      account: senderAccount,
      reference: `TXN-${Date.now()}-${uuidv4().slice(0, 8)}`,
    });

    await transaction.save();

    res.status(201).json({ message: "Transaction successful", transaction });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Internal server error " });
  }
};

// Get all transactions for a user's accounts
export const getUserTransactions = async (req, res) => {
  try {
    const userAccounts = await Account.find({ userId: req.user.id }).select(
      "_id"
    );
    const accountIds = userAccounts.map((acc) => acc._id);

    const transactions = await Transaction.find({
      account: { $in: accountIds },
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single transaction
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      "senderAccount receiverAccount"
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a transaction (admin or manual cleanup)
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction updated", transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a transaction (admin or manual cleanup)
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted", transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
