import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  internshipType: { type: String, required: true },
  skills: { type: String, required: true },
  motivation: { type: String, required: true },

  documents: [{
    driveFileId: { type: String },
    driveLink: { type: String },
    fileName: { type: String },
    uploadedAt: { type: Date, default: null },
    _id: false
  }],

  // Admin Status Management
  status: {
    type: String,
    enum: ['pending', 'replied', 'other'],
    default: 'pending'
  },
  statusNote: { type: String }
}, { timestamps: true });

internshipSchema.index({ email: 1 });
internshipSchema.index({ createdAt: -1 });

if (mongoose.models.Internship) {
  delete mongoose.models.Internship;
}

export default mongoose.model('Internship', internshipSchema);