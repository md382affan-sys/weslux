import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  organizationType: {
    type: String,
    required: true,
    enum: [
      // Companies
      'corporation', 'sme', 'startup', 'nonprofit',
      // Schools
      'school', 'college', 'vocational', 'international',
      // Government
      'ministry', 'agency', 'municipal', 'public',
      // CSO
      'ngo', 'community', 'advocacy', 'foundation',
      'other'
    ]
  },
  partnerCategory: {
    type: String,
    required: true,
    enum: ['companies', 'schools', 'government', 'cso']
  },
  interests: [{
    type: String
  }],
  message: {
    type: String,
    trim: true
  },
  
  // Admin Status Management
  status: { 
    type: String, 
    enum: ['pending', 'replied', 'other'],
    default: 'pending'
  },
  statusNote: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
