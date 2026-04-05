import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  volunteerRole: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  company: String,
  experience: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },
  linkedin: String,
  
  // Admin Status Management
  status: { 
    type: String, 
    enum: ['pending', 'replied', 'other'],
    default: 'pending'
  },
  statusNote: { type: String }
}, { timestamps: true });

export default mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
