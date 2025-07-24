import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accountType: {
      type: String,
      enum: ['savings', 'current', 'investment'],
      default: 'savings',
    },
    currency: {
      type: String,
      default: 'GHS',
    },
    balance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'frozen', 'closed'],
      default: 'active',
    },
    openedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Optional: method to format balance (e.g. for display)
AccountSchema.methods.getFormattedBalance = function () {
  return `${this.currency} ${this.balance.toFixed(2)}`;
};

const Account = mongoose.model('Account', AccountSchema);

export default Account;
