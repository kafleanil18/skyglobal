import mongoose from 'mongoose';

const employerRequestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  industrySector: { type: String, default: 'MEP, Electrical & Technical Trades' },
  headcount: { type: String, default: '1-5 Candidates' },
  destinationCountry: { type: String, default: 'Malta' },
  timeline: { type: String, default: 'Immediate (Within 30 Days)' },
  requestDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'New' },
  notes: { type: String, default: '' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const EmployerRequest = mongoose.model('EmployerRequest', employerRequestSchema);
