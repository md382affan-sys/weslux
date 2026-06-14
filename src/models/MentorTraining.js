import mongoose from 'mongoose';

const MentorTrainingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  whyMentor: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  
  // Email verification via OTP
  emailVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  
  // Status Management
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  statusNote: { type: String },
  
  // Certificate Management
  certificateEarned: {
    type: Boolean,
    default: false,
  },
  certificateId: {
    type: String,
  },
  completionDate: {
    type: Date,
  },
  finalQuizScore: {
    type: Number,
  },
  allQuizScores: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

export default mongoose.models.MentorTraining || mongoose.model('MentorTraining', MentorTrainingSchema);
