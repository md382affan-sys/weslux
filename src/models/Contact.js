import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  subject: {
    type: String,
    required: true,
  },
  program: String,
  message: {
    type: String,
    required: true,
  },
  
  // Admin Status Management
  status: { 
    type: String, 
    enum: ['pending', 'replied', 'other'],
    default: 'pending'
  },
  statusNote: { type: String }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
