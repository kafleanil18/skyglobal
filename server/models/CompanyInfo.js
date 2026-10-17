import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema({
  name: { type: String, default: 'Sky Global HR Consultancy' },
  shortName: { type: String, default: 'SkyGlobal' },
  tagline: { type: String, default: 'Connecting talent with job opportunities worldwide' },
  description: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  phoneRaw: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  whatsappRaw: { type: String, default: '' },
  email: { type: String, default: '' },
  officeHours: {
    weekdays: { type: String, default: 'Mon - Sat: 9:00 AM – 7:00 PM' },
    sunday: { type: String, default: 'Sun: Closed' }
  },
  social: {
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' }
  },
  stats: { type: Array, default: [] }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);
