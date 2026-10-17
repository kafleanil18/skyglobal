import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, default: 'Active Hiring' },
  badge: { type: String, default: 'International Hub' },
  image: { type: String, default: '' },
  overview: { type: String, default: '' },
  highlight: { type: String, default: '' },
  details: { type: [String], default: [] }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const Country = mongoose.model('Country', countrySchema);
