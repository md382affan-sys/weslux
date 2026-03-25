import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donationType: {
    type: String,
    enum: ['one-time', 'monthly'],
    required: true,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);
