'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components';
import CategorySelection from '@/components/mentee-form/CategorySelection';
import ApplicantProfile from '@/components/mentee-form/ApplicantProfile';
import FoundationLevel from '@/components/mentee-form/FoundationLevel';
import BridgeLevel from '@/components/mentee-form/BridgeLevel';
import LaunchLevel from '@/components/mentee-form/LaunchLevel';
import YoungProfessional from '@/components/mentee-form/YoungProfessional';
import MentorQuestions from '@/components/mentee-form/MentorQuestions';
import FinalValidation from '@/components/mentee-form/FinalValidation';

export default function MenteeFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', educationLevel: '',
    careerAspirations: '', academicInterests: '', streamCertainty: '',
    currentGuidance: '', mentorshipProblems: '', exposureLevel: '',
    exposureDetails: '', roleModel: '', skillAwareness: '', fearFactor: '',
    familyExpectations: '', learningStyle: '', curiosityCheck: '',
    professionalVision: '', currentDomain: '', choiceValidation: '',
    industryAccess: '', supportGap: '', careerClarity: '', backupPlan: '',
    entranceExams: '', informationSource: '', skillGap: '', timeInvestment: '',
    decisionSatisfaction: '', realWorldExposure: '',
    fieldOfStudy: '', immediateCareerGoal: '', careerDirection: '',
    postStudyCertainty: '', mentorshipNetwork: '', skillConfidence: '',
    skillConfidentIn: '', skillNotConfidentIn: '', portfolioStatus: '',
    internshipExperience: '', networkingEfforts: '', cvReadiness: '',
    industryAwareness: '', salaryExpectations: '', actionTaken: '',
    biggestChallenge: '', jobReadinessNeeds: [],
    careerStart: '', currentExperience: '', careerSatisfaction: '',
    careerSupport: '', mentorshipExperience: '', careerDevelopment: '',
    careerMobility: '', initialMotivation: '', skillsToShare: '',
    challenges: '', resourcesNeeded: '', longTermMotivation: '',
    youngerGenExperience: '', menteeNeeds: '', perceivedValue: '',
    timeInvestmentMentor: '', coordinatorInvolvement: '',
    problemValidation: '', mentorshipNecessity: '', openFeedback: '',
    referralIntent: '', outcomeExpectation: '', willingnessToInvest: '',
    urgencyLevel: '', awareness: '', mentorshipStructure: '',
    successDefinition: '', formatPreference: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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


  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setFormData({ ...formData, educationLevel: selectedCategory });
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setCategory('');
    } else {
      setCurrentStep(prev => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTotalSteps = () => {
    return 4; // Category Selection + Profile + Category Questions + Final Validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/mentee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setCurrentStep(0);
          setCategory('');
          setFormData({
            fullName: '', email: '', phone: '', educationLevel: '',
            careerAspirations: '', academicInterests: '', streamCertainty: '',
            currentGuidance: '', mentorshipProblems: '', exposureLevel: '',
            exposureDetails: '', roleModel: '', skillAwareness: '', fearFactor: '',
            familyExpectations: '', learningStyle: '', curiosityCheck: ''
          });
        }, 3000);
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {currentStep === 0 && <CategorySelection onSelect={handleCategorySelect} />}
      
      {currentStep > 0 && (
        <main className="flex-grow bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Step {currentStep} of {getTotalSteps()}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {Math.round((currentStep / getTotalSteps()) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / getTotalSteps()) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16">
              <form onSubmit={currentStep === getTotalSteps() ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                
                {currentStep === 1 && <ApplicantProfile formData={formData} onChange={handleChange} />}
                
                {currentStep === 2 && category === '6th-10th' && (
                  <FoundationLevel formData={formData} onChange={handleChange} />
                )}
                
                {currentStep === 2 && category === '11th-12th' && (
                  <BridgeLevel formData={formData} onChange={handleChange} />
                )}
                
                {currentStep === 2 && category === 'university' && (
                  <LaunchLevel formData={formData} onChange={handleChange} />
                )}
                
                {currentStep === 2 && category === 'young-professional' && (
                  <YoungProfessional formData={formData} onChange={handleChange} />
                )}
                
                {currentStep === 2 && category === 'mentor' && (
                  <MentorQuestions formData={formData} onChange={handleChange} />
                )}

                {currentStep === 3 && (
                  <FinalValidation formData={formData} onChange={handleChange} category={category} />
                )}

                <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-300 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <span>←</span> Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : currentStep === getTotalSteps() ? (
                      <>Submit <span>✓</span></>
                    ) : (
                      <>Continue <span>→</span></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center transform animate-scaleIn shadow-2xl">
            <div className="text-7xl mb-6 animate-bounce">✅</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your application has been submitted successfully. We'll get back to you soon!
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
