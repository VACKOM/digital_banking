import mongoose from 'mongoose';


// Define the user schema
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'support'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'deactivated'],
      default: 'active',
    },
    customerId: {
      type: String,
      unique: true,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
   
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('User', UserSchema);

export default User;
