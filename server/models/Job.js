import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  rffNumber: { type: String, default: '' },
  title: { type: String, required: true },
  company: { type: String, default: 'Sky Global Partner Client' },
  location: { type: String, default: 'Malta, EU' },
  country: { type: String, default: 'Malta' },
  sector: { type: String, default: 'MEP, Electrical & Technical Trades' },
  type: { type: String, default: 'Full-time' },
  contract: { type: String, default: '1 Year Renewable' },
  salary: { type: String, default: '€1,400 – €1,750 / month' },
  vacancies: { type: Number, default: 4 },
  status: { type: String, default: 'Active' },
  visaSponsorship: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
  description: { type: String, default: '' },
  requirements: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  visaProcessing: { type: String, default: '⚡ Fast-track 3–4 Weeks' },
  perks: { type: [String], default: [] }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const Job = mongoose.model('Job', jobSchema);
