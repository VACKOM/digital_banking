import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const TransactionSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'transfer', 'payment'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ['GHS', 'USD', 'EUR'], // Add more as needed
      default: 'GHS',
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
    senderAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    receiverAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    reference: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-generate a reference if not provided
TransactionSchema.pre('validate', function (next) {
  if (!this.reference) {
    this.reference = uuidv4();
  }
  next();
});

// Optionally auto-generate a description
TransactionSchema.pre('save', function (next) {
  if (!this.description) {
    this.description = `${this.type} of ${this.currency} ${this.amount}`;
  }
  next();
});

// Optional method to return a readable summary
TransactionSchema.methods.summary = function () {
  return `${this.type.toUpperCase()}: ${this.currency} ${this.amount.toFixed(2)} on ${this.transactionDate.toDateString()}`;
};

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
