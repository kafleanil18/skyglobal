import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  jobId: { type: String, default: 'general-pool' },
  jobTitle: { type: String, default: 'General International Talent Pool' },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  currentCountry: { type: String, default: '' },
  experienceYears: { type: String, default: '3-5 years' },
  preferredDestination: { type: String, default: 'Malta' },
  appliedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Pending' },
  resumeName: { type: String, default: 'Attached_Resume.pdf' },
  resumeDataUrl: { type: String, default: null },
  resumeSize: { type: Number, default: null },
  resumeType: { type: String, default: null },
  notes: { type: String, default: '' },
  adminNotes: { type: String, default: '' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const Application = mongoose.model('Application', applicationSchema);
