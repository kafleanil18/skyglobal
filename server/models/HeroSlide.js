import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: 'Talent Acquisition' },
  location: { type: String, default: 'Bur Dubai HQ' },
  stat: { type: String, default: '100% Vetted Candidates' },
  order: { type: Number, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
