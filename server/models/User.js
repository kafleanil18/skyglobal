import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  department: { type: String, default: 'General Administration' },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const User = mongoose.model('User', userSchema);
