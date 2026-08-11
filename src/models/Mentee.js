import mongoose from 'mongoose';

const menteeSchema = new mongoose.Schema({
  // Section 1: Applicant Profile
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  educationLevel: { 
    type: String, 
    enum: ['6th-10th', '11th-12th', 'university', 'young-professional', 'mentor'],
    required: true 
  },
  
  // Section 2: Foundation Level (6th & 10th Grade)
  careerAspirations: { type: String },
  academicInterests: { type: String },
  streamCertainty: { type: String },
  currentGuidance: { type: String },
  mentorshipProblems: { type: String },
  exposureLevel: { type: String },
  exposureDetails: { type: String },
  roleModel: { type: String },
  skillAwareness: { type: String },
  fearFactor: { type: String },
  familyExpectations: { type: String },
  learningStyle: { type: String },
  curiosityCheck: { type: String },
  
  // Section 3: Bridge Level (11th & 12th Grade)
  professionalVision: { type: String },
  currentDomain: { type: String },
  choiceValidation: { type: String },
  industryAccess: { type: String },
  supportGap: { type: String },
  careerClarity: { type: String },
  backupPlan: { type: String },
  entranceExams: { type: String },
  informationSource: { type: String },
  skillGap: { type: String },
  timeInvestment: { type: String },
  decisionSatisfaction: { type: String },
  realWorldExposure: { type: String },
  
  // Section 4: Launch Level (University Students)
  fieldOfStudy: { type: String },
  immediateCareerGoal: { type: String },
  careerDirection: { type: String },
  postStudyCertainty: { type: String },
  mentorshipNetwork: { type: String },
  skillConfidence: { type: String },
  skillConfidentIn: { type: String },
  skillNotConfidentIn: { type: String },
  portfolioStatus: { type: String },
  internshipExperience: { type: String },
  networkingEfforts: { type: String },
  cvReadiness: { type: String },
  industryAwareness: { type: String },
  salaryExpectations: { type: String },
  actionTaken: { type: String },
  biggestChallenge: { type: String },
  jobReadinessNeeds: [{ type: String }],
  
  // Section 5: Young Professionals
  careerStart: { type: String },
  currentExperience: { type: String },
  careerSatisfaction: { type: String },
  careerSupport: { type: String },
  mentorshipExperience: { type: String },
  careerDevelopment: { type: String },
  careerMobility: { type: String },
  
  // Section 6: Mentors
  initialMotivation: { type: String },
  skillsToShare: { type: String },
  challenges: { type: String },
  resourcesNeeded: { type: String },
  longTermMotivation: { type: String },
  youngerGenExperience: { type: String },
  menteeNeeds: { type: String },
  perceivedValue: { type: String },
  timeInvestmentMentor: { type: String },
  coordinatorInvolvement: { type: String },
  
  // Section 7: Final Validation & Feedback (Common for all)
  problemValidation: { type: String },
  mentorshipNecessity: { type: String },
  openFeedback: { type: String },
  referralIntent: { type: String },
  outcomeExpectation: { type: String },
  willingnessToInvest: { type: String },
  urgencyLevel: { type: String },
  awareness: { type: String },
  mentorshipStructure: { type: String },
  successDefinition: { type: String },
  formatPreference: { type: String },
  
  // Video Introduction
  videoIntroduction: {
    driveFileId: { type: String },
    driveLink: { type: String },
    fileName: { type: String },
    uploadedAt: { type: Date, default: null }
  },

  // Section 8: Application Review (Mentees only - Mentors Connect platform feedback)
  websiteRating: { type: String },
  navigationEase: { type: String },
  interfaceRating: { type: String },
  likedMost: { type: String },
  suggestedChanges: { type: String },
  additionalFeedback: { type: String },
  
  // Admin Status Management
  status: { 
    type: String, 
    enum: ['pending', 'replied', 'other'],
    default: 'pending'
  },
  statusNote: { type: String } // For 'other' status custom text
}, { timestamps: true });

// Add indexes for better query performance
menteeSchema.index({ email: 1 });
menteeSchema.index({ educationLevel: 1 });
menteeSchema.index({ createdAt: -1 });

// Force model refresh in development
if (mongoose.models.Mentee) {
  delete mongoose.models.Mentee;
}

export default mongoose.model('Mentee', menteeSchema);
