import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, default: '' },
  company: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: 'Candidate (Visa Approved)' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
