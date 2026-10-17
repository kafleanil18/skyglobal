import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'Visa Policy' },
  date: { type: String, default: '' },
  image: { type: String, default: '' },
  summary: { type: String, default: '' },
  content: { type: String, default: '' },
  source: { type: String, default: 'SkyGlobal HR Market Intelligence' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const Blog = mongoose.model('Blog', blogSchema);
