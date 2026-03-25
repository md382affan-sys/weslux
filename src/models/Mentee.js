import mongoose from 'mongoose';

const menteeSchema = new mongoose.Schema({
  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: true 
  },
  nationality: { type: String, required: true },
  
  // Education Information
  currentEducation: { 
    type: String, 
    enum: ['6th-10th', '11th-12th', 'bachelor', 'master', 'phd', 'other'],
    required: true 
  },
  institution: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  
  // Mentorship Preferences
  careerInterests: { type: String, required: true },
  mentorshipGoals: { type: String, required: true },
  preferredMentorBackground: { type: String },
  availability: { 
    type: String, 
    enum: ['1-2-hours-week', '3-4-hours-week', '5+-hours-week', 'flexible'],
    required: true 
  },
  
  // Language & Additional Info
  englishProficiency: { 
    type: String, 
    enum: ['basic', 'intermediate', 'advanced', 'native'],
    required: true 
  },
  otherLanguages: { type: String },
  linkedin: { type: String },
  motivation: { type: String, required: true },
  
  // Foundation Level (6th & 10th Grade) - Optional
  careerAspirations: { type: String },
  academicInterests: { type: String },
  streamSelectionCertainty: { type: String },
  currentGuidance: { type: String },
  mentorshipInterest: { type: String },
  exposureLevel: { type: String },
  exposureDetail: { type: String },
  roleModel: { type: String },
  skillAwareness: { type: String },
  fearFactor: { type: String },
  decisionPressure: { type: String },
  decisionPressureExplain: { type: String },
  learningStyle: { type: String },
  curiosityCheck: { type: String },
  
  // Bridge Level (11th & 12th Grade) - Optional
  professionalVision: { type: String },
  currentDomain: { type: String },
  choiceValidation: { type: String },
  industryExposure: { type: String },
  supportGap: { type: String },
  careerClarityScore: { type: String },
  backupPlan: { type: String },
  backupPlanExplain: { type: String },
  entranceExamStrategy: { type: String },
  informationSource: { type: String },
  skillGapAwareness: { type: String },
  timeInvestment: { type: String },
  decisionSatisfaction: { type: String },
  realWorldExposure: { type: String },
  realWorldExposureDetail: { type: String },
  
  // Launch Level (University Students) - Optional
  ultimateCareerGoal: { type: String },
  postStudyCertainty: { type: String },
  mentorshipNetwork: { type: String },
  careerDirection: { type: String },
  skillConfidence: { type: String },
  portfolioStatus: { type: String },
  internshipExperience: { type: String },
  networkingEfforts: { type: String },
  biggestChallenge: { type: String },
  resumeReadiness: { type: String },
  industryAwareness: { type: String },
  salaryExpectations: { type: String },
  actionTaken: { type: String },
  jobReadinessNeeds: [{ type: String }],
  
  // Final Validation & Feedback - Optional
  problemStatementValidation: { type: String },
  mentorshipNecessity: { type: String },
  openFeedback: { type: String },
  referralIntent: { type: String },
  outcomeExpectation: { type: String },
  
  // Additional for Section 3 & 4 - Optional
  mentorshipFormatPreference: { type: String },
  willingnessToInvest: { type: String },
  urgencyLevel: { type: String },
  biggestPainPoint: { type: String }
}, { timestamps: true });

// Force model refresh in development
if (mongoose.models.Mentee) {
  delete mongoose.models.Mentee;
}

export default mongoose.model('Mentee', menteeSchema);
