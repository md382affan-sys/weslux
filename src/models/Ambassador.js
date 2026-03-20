import mongoose from 'mongoose';

const AmbassadorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roleInterest: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  ideas: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.models.Ambassador || mongoose.model('Ambassador', AmbassadorSchema);
