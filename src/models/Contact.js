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
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
