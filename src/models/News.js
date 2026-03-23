import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    trim: true
  },
  day: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Funding', 'Partnerships', 'Legal', 'Platform', 'Outreach', 'Recognition', 'Program']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    enum: ['blue', 'green', 'purple', 'orange', 'indigo', 'teal', 'cyan', 'violet', 'pink', 'amber', 'emerald', 'red', 'yellow']
  },
  icon: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, {
  timestamps: true
});

export default mongoose.models.News || mongoose.model('News', newsSchema);
