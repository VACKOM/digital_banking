import Account from '../models/Account.js';

// @desc    Create a new bank account for the user
// @route   POST /api/accounts
// @access  Private

// Utility function to generate a random 10-digit account number
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10-digit string
};

export const createAccount = async (req, res) => {
  try {
    const { accountType, balance } = req.body;

    if (!accountType || balance === undefined) {
      return res.status(400).json({ message: 'Account type and balance are required' });
    }

    // Keep generating until a unique account number is found
    let accountNumber;
    let isUnique = false;

    while (!isUnique) {
      accountNumber = generateAccountNumber();
      const existing = await Account.findOne({ accountNumber });
      if (!existing) isUnique = true;
    }

    const account = new Account({
      userId: req.user.id,
      accountType,
      accountNumber,
      balance,
    });

    const savedAccount = await account.save();
    res.status(201).json(savedAccount);
  } catch (err) {
    console.error('Create account error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all accounts for the logged-in user
// @route   GET /api/accounts
// @access  Private
export const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a user's account
// @route   PUT /api/accounts/:id
// @access  Private
export const updateAccount = async (req, res) => {
  try {
    const allowedUpdates = ['accountType', 'balance', 'status'];
    const updates = Object.keys(req.body);

    const isValid = updates.every((field) => allowedUpdates.includes(field));
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid fields in update' });
    }

    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a user's account
// @route   DELETE /api/accounts/:id
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({
      message: 'Account successfully deleted',
      account,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
