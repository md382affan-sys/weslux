'use client';
import { useState } from 'react';
import { Header, Footer } from '@/components';
import SuccessModal from '@/components/SuccessModal';

export default function MenteeFormPage() {
  const [educationLevel, setEducationLevel] = useState('');
  const [formData, setFormData] = useState({
    // Required DB fields
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '',
    nationality: '', currentEducation: '', institution: '', fieldOfStudy: '',
    yearOfStudy: '', careerInterests: '', mentorshipGoals: '', preferredMentorBackground: '',
    availability: '', englishProficiency: '', otherLanguages: '', linkedin: '', motivation: '',
    // Additional comprehensive fields
    careerAspirations: '', academicInterests: '', streamSelectionCertainty: '',
    currentGuidance: '', mentorshipInterest: '', exposureLevel: '', exposureDetail: '',
    roleModel: '', skillAwareness: '', fearFactor: '', decisionPressure: '',
    decisionPressureExplain: '', learningStyle: '', curiosityCheck: '',
    professionalVision: '', currentDomain: '', choiceValidation: '', industryExposure: '',
    supportGap: '', careerClarityScore: '', backupPlan: '', backupPlanExplain: '',
    entranceExamStrategy: '', informationSource: '', skillGapAwareness: '', timeInvestment: '',
    decisionSatisfaction: '', realWorldExposure: '', realWorldExposureDetail: '',
    ultimateCareerGoal: '', postStudyCertainty: '', mentorshipNetwork: '',
    careerDirection: '', skillConfidence: '', portfolioStatus: '', internshipExperience: '',
    networkingEfforts: '', biggestChallenge: '', resumeReadiness: '', industryAwareness: '',
    salaryExpectations: '', actionTaken: '', jobReadinessNeeds: [],
    problemStatementValidation: '', mentorshipNecessity: '', openFeedback: '',
    referralIntent: '', outcomeExpectation: '', mentorshipFormatPreference: '',
    willingnessToInvest: '', urgencyLevel: '', biggestPainPoint: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const currentValues = formData[name] || [];
      setFormData({
        ...formData,
        [name]: checked ? [...currentValues, value] : currentValues.filter(v => v !== value)
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEducationLevelChange = (e) => {
    const level = e.target.value;
    setEducationLevel(level);
    setFormData({ ...formData, currentEducation: level });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/mentee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowSuccess(true);
        setEducationLevel('');
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '',
          nationality: '', currentEducation: '', institution: '', fieldOfStudy: '',
          yearOfStudy: '', careerInterests: '', mentorshipGoals: '', preferredMentorBackground: '',
          availability: '', englishProficiency: '', otherLanguages: '', linkedin: '', motivation: '',
          careerAspirations: '', academicInterests: '', streamSelectionCertainty: '',
          currentGuidance: '', mentorshipInterest: '', exposureLevel: '', exposureDetail: '',
          roleModel: '', skillAwareness: '', fearFactor: '', decisionPressure: '',
          decisionPressureExplain: '', learningStyle: '', curiosityCheck: '',
          professionalVision: '', currentDomain: '', choiceValidation: '', industryExposure: '',
          supportGap: '', careerClarityScore: '', backupPlan: '', backupPlanExplain: '',
          entranceExamStrategy: '', informationSource: '', skillGapAwareness: '', timeInvestment: '',
          decisionSatisfaction: '', realWorldExposure: '', realWorldExposureDetail: '',
          ultimateCareerGoal: '', postStudyCertainty: '', mentorshipNetwork: '',
          careerDirection: '', skillConfidence: '', portfolioStatus: '', internshipExperience: '',
          networkingEfforts: '', biggestChallenge: '', resumeReadiness: '', industryAwareness: '',
          salaryExpectations: '', actionTaken: '', jobReadinessNeeds: [],
          problemStatementValidation: '', mentorshipNecessity: '', openFeedback: '',
          referralIntent: '', outcomeExpectation: '', mentorshipFormatPreference: '',
          willingnessToInvest: '', urgencyLevel: '', biggestPainPoint: ''
        });
      } else {
        setError(data.message || 'Failed to submit application');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                WES Luxembourg: Mentorship Program Registration
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Join our comprehensive mentorship program
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Section 1: Applicant Profile</h2>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone / WhatsApp *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="+352 123 456 789" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Gender *</label>
                          <select name="gender" value={formData.gender} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nationality *</label>
                        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Educational Level *</label>
                        <select name="currentEducation" value={formData.currentEducation} onChange={handleEducationLevelChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="">Select level</option>
                          <option value="6th-10th">6th or 10th Grade</option>
                          <option value="11th-12th">11th or Final Year 12th Grade</option>
                          <option value="bachelor">College / University Student</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Institution/School *</label>
                        <input type="text" name="institution" value={formData.institution} onChange={handleChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Field of Study *</label>
                          <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Computer Science" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Year of Study *</label>
                          <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="5+">5th Year or Above</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conditional Sections Based on Education Level */}
                  {educationLevel === '6th-10th' && (
                    <div className="border-t-4 border-green-500 pt-8">
                      <h2 className="text-2xl font-bold mb-4">Section 2: Foundation Level (6th & 10th Grade)</h2>
                      <p className="text-gray-600 mb-6">Early aspirations and stream-selection support</p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Career Aspirations *</label>
                          <p className="text-sm text-gray-500 mb-2">If you could pursue any career without limitations, what is your ultimate "dream" role?</p>
                          <textarea name="careerAspirations" value={formData.careerAspirations} onChange={handleChange} required rows="4"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Academic Interests *</label>
                          <p className="text-sm text-gray-500 mb-2">Which subjects do you currently find most engaging or natural to you?</p>
                          <input type="text" name="academicInterests" value={formData.academicInterests} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Stream Selection Certainty *</label>
                          <p className="text-sm text-gray-500 mb-2">On a scale of 1–5, how confident are you about the academic stream you plan to choose next?</p>
                          <select name="streamSelectionCertainty" value={formData.streamSelectionCertainty} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not confident at all</option>
                            <option value="2">2 - Slightly confident</option>
                            <option value="3">3 - Moderately confident</option>
                            <option value="4">4 - Very confident</option>
                            <option value="5">5 - Extremely confident</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Guidance *</label>
                          <p className="text-sm text-gray-500 mb-2">Who is your primary source of advice when making decisions about your future education?</p>
                          <select name="currentGuidance" value={formData.currentGuidance} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="parents">Parents</option>
                            <option value="teachers">Teachers</option>
                            <option value="peers">Peers</option>
                            <option value="no-one">No one</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Mentorship Interest *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you feel you would benefit from a "Big Brother/Sister" figure to help navigate your upcoming academic transitions?</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="radio" name="mentorshipInterest" value="yes" checked={formData.mentorshipInterest === 'yes'} onChange={handleChange} required className="mr-2" />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="mentorshipInterest" value="no" checked={formData.mentorshipInterest === 'no'} onChange={handleChange} className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Exposure Level *</label>
                          <p className="text-sm text-gray-500 mb-2">Have you ever attended any workshop, seminar, or watched content related to your dream career?</p>
                          <select name="exposureLevel" value={formData.exposureLevel} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        {formData.exposureLevel === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Please provide details</label>
                            <textarea name="exposureDetail" value={formData.exposureDetail} onChange={handleChange} rows="3"
                              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium mb-2">Role Model Influence *</label>
                          <p className="text-sm text-gray-500 mb-2">Is there someone you look up to in your dream field? What do you admire about them?</p>
                          <textarea name="roleModel" value={formData.roleModel} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Skill Awareness *</label>
                          <p className="text-sm text-gray-500 mb-2">What skills do you think are required to succeed in your dream career?</p>
                          <input type="text" name="skillAwareness" value={formData.skillAwareness} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Fear Factor *</label>
                          <p className="text-sm text-gray-500 mb-2">What is your biggest fear when thinking about your future career?</p>
                          <textarea name="fearFactor" value={formData.fearFactor} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Decision Pressure *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you feel pressure from family or society while choosing your stream?</p>
                          <select name="decisionPressure" value={formData.decisionPressure} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        {formData.decisionPressure === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Please explain</label>
                            <textarea name="decisionPressureExplain" value={formData.decisionPressureExplain} onChange={handleChange} rows="3"
                              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium mb-2">Learning Style *</label>
                          <p className="text-sm text-gray-500 mb-2">How do you prefer to learn new things?</p>
                          <select name="learningStyle" value={formData.learningStyle} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="videos">Videos</option>
                            <option value="books">Books</option>
                            <option value="practical">Practical / Hands-on</option>
                            <option value="mentorship">Mentorship</option>
                            <option value="mixed">Mixed approach</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Curiosity Check *</label>
                          <p className="text-sm text-gray-500 mb-2">If given a free month, what would you love to learn or explore?</p>
                          <textarea name="curiosityCheck" value={formData.curiosityCheck} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  {educationLevel === '11th-12th' && (
                    <div className="border-t-4 border-purple-500 pt-8">
                      <h2 className="text-2xl font-bold mb-4">Section 2: Bridge Level (11th & 12th Grade)</h2>
                      <p className="text-gray-600 mb-6">Alignment of current study with long-term goals</p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Professional Vision *</label>
                          <p className="text-sm text-gray-500 mb-2">Describe the professional impact you hope to have in your chosen field 5 years from now.</p>
                          <textarea name="professionalVision" value={formData.professionalVision} onChange={handleChange} required rows="4"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Domain *</label>
                          <p className="text-sm text-gray-500 mb-2">Which academic stream are you currently enrolled in?</p>
                          <input type="text" name="currentDomain" value={formData.currentDomain} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Science, Commerce, Arts" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Choice Validation *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you feel your current domain aligns with your genuine interests, or was it chosen based on external factors?</p>
                          <textarea name="choiceValidation" value={formData.choiceValidation} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Industry Exposure *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you currently have access to any professional mentors working in the industry you wish to join?</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="radio" name="industryExposure" value="yes" checked={formData.industryExposure === 'yes'} onChange={handleChange} required className="mr-2" />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="industryExposure" value="no" checked={formData.industryExposure === 'no'} onChange={handleChange} className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Support Gap *</label>
                          <p className="text-sm text-gray-500 mb-2">What is the most significant piece of information or guidance you feel is currently missing from your school environment?</p>
                          <textarea name="supportGap" value={formData.supportGap} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Career Clarity Score *</label>
                          <p className="text-sm text-gray-500 mb-2">On a scale of 1–5, how clear are you about your career path after 12th?</p>
                          <select name="careerClarityScore" value={formData.careerClarityScore} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not clear at all</option>
                            <option value="2">2 - Slightly clear</option>
                            <option value="3">3 - Moderately clear</option>
                            <option value="4">4 - Very clear</option>
                            <option value="5">5 - Extremely clear</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Backup Plan *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you have an alternative career option if your primary plan doesn't work?</p>
                          <select name="backupPlan" value={formData.backupPlan} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        {formData.backupPlan === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Please explain your backup plan</label>
                            <textarea name="backupPlanExplain" value={formData.backupPlanExplain} onChange={handleChange} rows="3"
                              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium mb-2">Entrance Exam Strategy *</label>
                          <p className="text-sm text-gray-500 mb-2">Are you preparing for any competitive exams?</p>
                          <input type="text" name="entranceExamStrategy" value={formData.entranceExamStrategy} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., SAT, JEE, NEET, or None" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Information Source *</label>
                          <p className="text-sm text-gray-500 mb-2">Where do you mostly get career information from?</p>
                          <select name="informationSource" value={formData.informationSource} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="youtube">YouTube</option>
                            <option value="coaching">Coaching Centers</option>
                            <option value="school">School</option>
                            <option value="friends">Friends</option>
                            <option value="family">Family</option>
                            <option value="online-research">Online Research</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Skill Gap Awareness *</label>
                          <p className="text-sm text-gray-500 mb-2">What skills do you feel you currently lack for your desired career?</p>
                          <textarea name="skillGapAwareness" value={formData.skillGapAwareness} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Time Investment *</label>
                          <p className="text-sm text-gray-500 mb-2">How many hours per day do you actively invest in career preparation?</p>
                          <select name="timeInvestment" value={formData.timeInvestment} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="0-1">0-1 hours</option>
                            <option value="1-2">1-2 hours</option>
                            <option value="2-4">2-4 hours</option>
                            <option value="4-6">4-6 hours</option>
                            <option value="6+">6+ hours</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Decision Satisfaction *</label>
                          <p className="text-sm text-gray-500 mb-2">If given a chance, would you change your current stream? Why?</p>
                          <textarea name="decisionSatisfaction" value={formData.decisionSatisfaction} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Real-world Exposure *</label>
                          <p className="text-sm text-gray-500 mb-2">Have you done any internships, projects, or real-world learning?</p>
                          <select name="realWorldExposure" value={formData.realWorldExposure} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        {formData.realWorldExposure === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Please provide details</label>
                            <textarea name="realWorldExposureDetail" value={formData.realWorldExposureDetail} onChange={handleChange} rows="3"
                              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium mb-2">Mentorship Format Preference *</label>
                          <p className="text-sm text-gray-500 mb-2">How would you prefer mentorship?</p>
                          <select name="mentorshipFormatPreference" value={formData.mentorshipFormatPreference} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1-1">1:1</option>
                            <option value="group">Group</option>
                            <option value="workshops">Workshops</option>
                            <option value="online">Online Sessions</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Willingness to Invest *</label>
                          <p className="text-sm text-gray-500 mb-2">Would you be willing to invest in a structured mentorship program if it guarantees outcomes?</p>
                          <select name="willingnessToInvest" value={formData.willingnessToInvest} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="maybe">Maybe</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Urgency Level *</label>
                          <p className="text-sm text-gray-500 mb-2">How urgently do you feel you need career guidance?</p>
                          <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not urgent</option>
                            <option value="2">2 - Slightly urgent</option>
                            <option value="3">3 - Moderately urgent</option>
                            <option value="4">4 - Very urgent</option>
                            <option value="5">5 - Extremely urgent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Biggest Pain Point *</label>
                          <p className="text-sm text-gray-500 mb-2">What frustrates you the most about your current career journey?</p>
                          <textarea name="biggestPainPoint" value={formData.biggestPainPoint} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  {educationLevel === 'bachelor' && (
                    <div className="border-t-4 border-indigo-500 pt-8">
                      <h2 className="text-2xl font-bold mb-4">Section 2: Launch Level (University Students)</h2>
                      <p className="text-gray-600 mb-6">Industry readiness, skill gaps, and professional networking</p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Ultimate Career Goal *</label>
                          <p className="text-sm text-gray-500 mb-2">What is your specific target role or objective upon graduation?</p>
                          <input type="text" name="ultimateCareerGoal" value={formData.ultimateCareerGoal} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Software Engineer, Entrepreneur" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Post-Study Certainty *</label>
                          <p className="text-sm text-gray-500 mb-2">How certain are you that you want to remain in this specific career path for the long term?</p>
                          <select name="postStudyCertainty" value={formData.postStudyCertainty} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not certain at all</option>
                            <option value="2">2 - Slightly certain</option>
                            <option value="3">3 - Moderately certain</option>
                            <option value="4">4 - Very certain</option>
                            <option value="5">5 - Extremely certain</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Mentorship Network *</label>
                          <p className="text-sm text-gray-500 mb-2">Aside from professors or family, do you have a professional mentor guiding your career strategy?</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="radio" name="mentorshipNetwork" value="yes" checked={formData.mentorshipNetwork === 'yes'} onChange={handleChange} required className="mr-2" />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="mentorshipNetwork" value="no" checked={formData.mentorshipNetwork === 'no'} onChange={handleChange} className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Career Direction *</label>
                          <p className="text-sm text-gray-500 mb-2">Are you aiming for Job, Higher Studies, Startup, or Freelancing?</p>
                          <select name="careerDirection" value={formData.careerDirection} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="job">Job</option>
                            <option value="higher-studies">Higher Studies</option>
                            <option value="startup">Startup</option>
                            <option value="freelancing">Freelancing</option>
                            <option value="undecided">Undecided</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Skill Confidence *</label>
                          <p className="text-sm text-gray-500 mb-2">On a scale of 1–5, how confident are you in your current technical/field skills?</p>
                          <select name="skillConfidence" value={formData.skillConfidence} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not confident</option>
                            <option value="2">2 - Slightly confident</option>
                            <option value="3">3 - Moderately confident</option>
                            <option value="4">4 - Very confident</option>
                            <option value="5">5 - Extremely confident</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Portfolio Status *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you have a portfolio, projects, or proof of work?</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="radio" name="portfolioStatus" value="yes" checked={formData.portfolioStatus === 'yes'} onChange={handleChange} required className="mr-2" />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="portfolioStatus" value="no" checked={formData.portfolioStatus === 'no'} onChange={handleChange} className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Internship Experience *</label>
                          <p className="text-sm text-gray-500 mb-2">Have you completed any internships? If yes, describe briefly.</p>
                          <textarea name="internshipExperience" value={formData.internshipExperience} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your experience or write 'None'"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Networking Efforts *</label>
                          <p className="text-sm text-gray-500 mb-2">How often do you connect with professionals on LinkedIn or other platforms?</p>
                          <select name="networkingEfforts" value={formData.networkingEfforts} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="rarely">Rarely</option>
                            <option value="never">Never</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Biggest Challenge *</label>
                          <p className="text-sm text-gray-500 mb-2">What is currently stopping you from achieving your career goals?</p>
                          <textarea name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Resume Readiness *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you have an updated resume ready for opportunities?</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="radio" name="resumeReadiness" value="yes" checked={formData.resumeReadiness === 'yes'} onChange={handleChange} required className="mr-2" />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="resumeReadiness" value="no" checked={formData.resumeReadiness === 'no'} onChange={handleChange} className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Industry Awareness *</label>
                          <p className="text-sm text-gray-500 mb-2">How updated are you with trends in your field?</p>
                          <select name="industryAwareness" value={formData.industryAwareness} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not updated</option>
                            <option value="2">2 - Slightly updated</option>
                            <option value="3">3 - Moderately updated</option>
                            <option value="4">4 - Very updated</option>
                            <option value="5">5 - Extremely updated</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Salary Expectations *</label>
                          <p className="text-sm text-gray-500 mb-2">What are your expected starting career outcomes (role/salary/industry)?</p>
                          <input type="text" name="salaryExpectations" value={formData.salaryExpectations} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Junior Developer, €40k, Tech" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Action Taken *</label>
                          <p className="text-sm text-gray-500 mb-2">What concrete steps have you taken in the last 3 months toward your career?</p>
                          <textarea name="actionTaken" value={formData.actionTaken} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Job-Readiness Needs *</label>
                          <p className="text-sm text-gray-500 mb-2">Which areas do you need the most support in? (Select all that apply)</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="checkbox" name="jobReadinessNeeds" value="cv-resume" checked={formData.jobReadinessNeeds.includes('cv-resume')} onChange={handleChange} className="mr-2" />
                              CV/Resume Building
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" name="jobReadinessNeeds" value="networking" checked={formData.jobReadinessNeeds.includes('networking')} onChange={handleChange} className="mr-2" />
                              Networking
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" name="jobReadinessNeeds" value="technical-upskilling" checked={formData.jobReadinessNeeds.includes('technical-upskilling')} onChange={handleChange} className="mr-2" />
                              Technical Upskilling
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" name="jobReadinessNeeds" value="interview-prep" checked={formData.jobReadinessNeeds.includes('interview-prep')} onChange={handleChange} className="mr-2" />
                              Interview Preparation
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" name="jobReadinessNeeds" value="soft-skills" checked={formData.jobReadinessNeeds.includes('soft-skills')} onChange={handleChange} className="mr-2" />
                              Soft Skills
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Mentorship Format Preference *</label>
                          <p className="text-sm text-gray-500 mb-2">How would you prefer mentorship?</p>
                          <select name="mentorshipFormatPreference" value={formData.mentorshipFormatPreference} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1-1">1:1</option>
                            <option value="group">Group</option>
                            <option value="workshops">Workshops</option>
                            <option value="online">Online Sessions</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Willingness to Invest *</label>
                          <p className="text-sm text-gray-500 mb-2">Would you be willing to invest in a structured mentorship program if it guarantees outcomes?</p>
                          <select name="willingnessToInvest" value={formData.willingnessToInvest} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="maybe">Maybe</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Urgency Level *</label>
                          <p className="text-sm text-gray-500 mb-2">How urgently do you feel you need career guidance?</p>
                          <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="1">1 - Not urgent</option>
                            <option value="2">2 - Slightly urgent</option>
                            <option value="3">3 - Moderately urgent</option>
                            <option value="4">4 - Very urgent</option>
                            <option value="5">5 - Extremely urgent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Biggest Pain Point *</label>
                          <p className="text-sm text-gray-500 mb-2">What frustrates you the most about your current career journey?</p>
                          <textarea name="biggestPainPoint" value={formData.biggestPainPoint} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section 2: Mentorship Preferences */}
                  <div className="border-t-4 border-blue-500 pt-8">
                    <h2 className="text-2xl font-bold mb-4">Section 3: Mentorship Preferences</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Career Interests *</label>
                        <textarea name="careerInterests" value={formData.careerInterests} onChange={handleChange} required rows="3"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="What career paths interest you?"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Mentorship Goals *</label>
                        <textarea name="mentorshipGoals" value={formData.mentorshipGoals} onChange={handleChange} required rows="3"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="What do you hope to achieve?"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Mentor Background</label>
                        <input type="text" name="preferredMentorBackground" value={formData.preferredMentorBackground} onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Tech industry, Finance" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Availability *</label>
                        <select name="availability" value={formData.availability} onChange={handleChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="">Select availability</option>
                          <option value="1-2-hours-week">1-2 hours per week</option>
                          <option value="3-4-hours-week">3-4 hours per week</option>
                          <option value="5+-hours-week">5+ hours per week</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Language & Additional Info */}
                  <div className="border-t-4 border-purple-500 pt-8">
                    <h2 className="text-2xl font-bold mb-4">Section 4: Language & Additional Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">English Proficiency *</label>
                        <select name="englishProficiency" value={formData.englishProficiency} onChange={handleChange} required
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="">Select level</option>
                          <option value="basic">Basic</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="native">Native/Fluent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Other Languages</label>
                        <input type="text" name="otherLanguages" value={formData.otherLanguages} onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., French, German" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="https://linkedin.com/in/yourprofile" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Why do you want to join this mentorship program? *</label>
                        <textarea name="motivation" value={formData.motivation} onChange={handleChange} required rows="4"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about your motivation..."></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Final Validation & Feedback */}
                  {educationLevel && (
                    <div className="border-t-4 border-orange-500 pt-8">
                      <h2 className="text-2xl font-bold mb-4">Section 5: Final Validation & Feedback</h2>
                      <p className="text-gray-600 mb-6">Help us understand your perspective</p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Problem Statement Validation *</label>
                          <p className="text-sm text-gray-500 mb-2">Do you agree with: "Most students possess a degree but lack a clear professional roadmap"?</p>
                          <select name="problemStatementValidation" value={formData.problemStatementValidation} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="strongly-agree">Strongly Agree</option>
                            <option value="agree">Agree</option>
                            <option value="neutral">Neutral</option>
                            <option value="disagree">Disagree</option>
                            <option value="strongly-disagree">Strongly Disagree</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Mentorship Necessity *</label>
                          <p className="text-sm text-gray-500 mb-2">In your honest opinion, is professional mentoring a "luxury" or a "necessity" for students today?</p>
                          <select name="mentorshipNecessity" value={formData.mentorshipNecessity} onChange={handleChange} required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="necessity">Necessity</option>
                            <option value="luxury">Luxury</option>
                            <option value="somewhere-between">Somewhere Between</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Open Feedback *</label>
                          <p className="text-sm text-gray-500 mb-2">If you could change one thing about how students are currently guided toward their careers, what would it be?</p>
                          <textarea name="openFeedback" value={formData.openFeedback} onChange={handleChange} required rows="4"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Referral Intent *</label>
                          <p className="text-sm text-gray-500 mb-2">Would you recommend such a mentorship program to your friends?</p>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="radio" name="referralIntent" value="yes" checked={formData.referralIntent === 'yes'} onChange={handleChange} required className="mr-2" />
                              Yes
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="referralIntent" value="no" checked={formData.referralIntent === 'no'} onChange={handleChange} className="mr-2" />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Outcome Expectation *</label>
                          <p className="text-sm text-gray-500 mb-2">What result would make this mentorship program "worth it" for you?</p>
                          <textarea name="outcomeExpectation" value={formData.outcomeExpectation} onChange={handleChange} required rows="3"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <button type="submit" disabled={loading}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50">
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)}
        message="Application submitted successfully!"
      />
    </div>
  );
}
