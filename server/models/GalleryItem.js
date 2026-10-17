import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, default: '' },
  category: { type: String, default: 'Visa Handovers' },
  timeframe: { type: String, default: 'October 2026' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  images: { type: [String], default: [] },
  image: { type: String, default: '' },
  location: { type: String, default: 'SkyGlobal Dubai, UAE' },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
