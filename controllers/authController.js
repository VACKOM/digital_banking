import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Helper function to generate a unique customer ID
const generateCustomerId = async () => {
  let id;
  let exists = true;

  while (exists) {
    id = 'CU' + Math.floor(100000 + Math.random() * 900000); // e.g., CU543210
    const existing = await User.findOne({ customerId: id });
    if (!existing) exists = false;
  }

  return id;
};

export const registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing request body' });
  }

  const {
    fullName,
    email,
    phone,
    role,
    isVerified = false,
    status = 'active',
    lastLogin = null,
    password,
  } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: 'Full name, email, and password are required' });
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customerId = await generateCustomerId();

    const user = new User({
      fullName,
      email: normalizedEmail,
      phone,
      role,
      isVerified,
      status,
      lastLogin,
      password: hashedPassword,
      customerId,
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ message: 'User registration successful', user: userResponse });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: err.message });
  }
};


// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials email' });
    console.log('Plain password:', password);
    console.log('Stored hash:', user.password);
    console.log('Comparison result:', await bcrypt.compare(password, user.password));
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials password' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set token in cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(200)
      .json({
        message: 'Logged in successfully',
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
