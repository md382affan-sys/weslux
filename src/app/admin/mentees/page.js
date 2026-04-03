'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function MenteesPage() {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchMentees(token);
  }, [router]);

  const fetchMentees = async (token) => {
    try {
      const res = await fetch('/api/mentee', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMentees(data.mentees);
      }
    } catch (err) {
      console.error('Failed to fetch mentees');
    } finally {
      setLoading(false);
    }
  };

  const getEducationLabel = (level) => {
    const labels = {
      '6th-10th': '6th or 10th Grade',
      '11th-12th': '11th or 12th Grade',
      'university': 'University Student',
      'young-professional': 'Young Professional',
      'mentor': 'Mentor'
    };
    return labels[level] || level;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Mentee Applications</h3>
          <p className="text-sm text-gray-500 mt-1">Manage mentee applications and match with mentors</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mentees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No mentee applications found.
                  </td>
                </tr>
              ) : (
                mentees.map((mentee) => (
                  <tr key={mentee._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{mentee.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentee.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getEducationLabel(mentee.educationLevel)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(mentee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedMentee(mentee)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMentee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMentee(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedMentee.fullName}</h2>
                  <p className="text-blue-100 mt-1">{selectedMentee.email}</p>
                  <p className="text-blue-100 text-sm mt-1">{selectedMentee.phone}</p>
                </div>
                <button
                  onClick={() => setSelectedMentee(null)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedMentee.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedMentee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedMentee.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{getEducationLabel(selectedMentee.educationLevel)}</p>
                  </div>
                </div>
              </div>

              {/* Foundation Level (6th & 10th) */}
              {selectedMentee.educationLevel === '6th-10th' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-500">Foundation Level Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.careerAspirations && (
                      <div>
                        <p className="text-sm text-gray-500">Career Aspirations</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerAspirations}</p>
                      </div>
                    )}
                    {selectedMentee.academicInterests && (
                      <div>
                        <p className="text-sm text-gray-500">Academic Interests</p>
                        <p className="font-medium text-gray-900">{selectedMentee.academicInterests}</p>
                      </div>
                    )}
                    {selectedMentee.streamCertainty && (
                      <div>
                        <p className="text-sm text-gray-500">Stream Selection Certainty</p>
                        <p className="font-medium text-gray-900">{selectedMentee.streamCertainty}</p>
                      </div>
                    )}
                    {selectedMentee.currentGuidance && (
                      <div>
                        <p className="text-sm text-gray-500">Current Guidance Source</p>
                        <p className="font-medium text-gray-900">{selectedMentee.currentGuidance}</p>
                      </div>
                    )}
                    {selectedMentee.mentorshipProblems && (
                      <div>
                        <p className="text-sm text-gray-500">Mentorship Problems</p>
                        <p className="font-medium text-gray-900">{selectedMentee.mentorshipProblems}</p>
                      </div>
                    )}
                    {selectedMentee.exposureLevel && (
                      <div>
                        <p className="text-sm text-gray-500">Exposure Level</p>
                        <p className="font-medium text-gray-900">{selectedMentee.exposureLevel}</p>
                      </div>
                    )}
                    {selectedMentee.exposureDetails && (
                      <div>
                        <p className="text-sm text-gray-500">Exposure Details</p>
                        <p className="font-medium text-gray-900">{selectedMentee.exposureDetails}</p>
                      </div>
                    )}
                    {selectedMentee.roleModel && (
                      <div>
                        <p className="text-sm text-gray-500">Role Model</p>
                        <p className="font-medium text-gray-900">{selectedMentee.roleModel}</p>
                      </div>
                    )}
                    {selectedMentee.skillAwareness && (
                      <div>
                        <p className="text-sm text-gray-500">Skill Awareness</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillAwareness}</p>
                      </div>
                    )}
                    {selectedMentee.fearFactor && (
                      <div>
                        <p className="text-sm text-gray-500">Fear Factor</p>
                        <p className="font-medium text-gray-900">{selectedMentee.fearFactor}</p>
                      </div>
                    )}
                    {selectedMentee.familyExpectations && (
                      <div>
                        <p className="text-sm text-gray-500">Family Expectations</p>
                        <p className="font-medium text-gray-900">{selectedMentee.familyExpectations}</p>
                      </div>
                    )}
                    {selectedMentee.learningStyle && (
                      <div>
                        <p className="text-sm text-gray-500">Learning Style</p>
                        <p className="font-medium text-gray-900">{selectedMentee.learningStyle}</p>
                      </div>
                    )}
                    {selectedMentee.curiosityCheck && (
                      <div>
                        <p className="text-sm text-gray-500">Curiosity Check</p>
                        <p className="font-medium text-gray-900">{selectedMentee.curiosityCheck}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bridge Level (11th & 12th) */}
              {selectedMentee.educationLevel === '11th-12th' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">Bridge Level Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.professionalVision && (
                      <div>
                        <p className="text-sm text-gray-500">Professional Vision (5 years)</p>
                        <p className="font-medium text-gray-900">{selectedMentee.professionalVision}</p>
                      </div>
                    )}
                    {selectedMentee.currentDomain && (
                      <div>
                        <p className="text-sm text-gray-500">Current Domain/Stream</p>
                        <p className="font-medium text-gray-900">{selectedMentee.currentDomain}</p>
                      </div>
                    )}
                    {selectedMentee.choiceValidation && (
                      <div>
                        <p className="text-sm text-gray-500">Choice Validation</p>
                        <p className="font-medium text-gray-900">{selectedMentee.choiceValidation}</p>
                      </div>
                    )}
                    {selectedMentee.industryAccess && (
                      <div>
                        <p className="text-sm text-gray-500">Industry Access</p>
                        <p className="font-medium text-gray-900">{selectedMentee.industryAccess}</p>
                      </div>
                    )}
                    {selectedMentee.supportGap && (
                      <div>
                        <p className="text-sm text-gray-500">Support Gap</p>
                        <p className="font-medium text-gray-900">{selectedMentee.supportGap}</p>
                      </div>
                    )}
                    {selectedMentee.careerClarity && (
                      <div>
                        <p className="text-sm text-gray-500">Career Clarity</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerClarity}</p>
                      </div>
                    )}
                    {selectedMentee.backupPlan && (
                      <div>
                        <p className="text-sm text-gray-500">Backup Plan</p>
                        <p className="font-medium text-gray-900">{selectedMentee.backupPlan}</p>
                      </div>
                    )}
                    {selectedMentee.entranceExams && (
                      <div>
                        <p className="text-sm text-gray-500">Entrance Exams</p>
                        <p className="font-medium text-gray-900">{selectedMentee.entranceExams}</p>
                      </div>
                    )}
                    {selectedMentee.informationSource && (
                      <div>
                        <p className="text-sm text-gray-500">Information Source</p>
                        <p className="font-medium text-gray-900">{selectedMentee.informationSource}</p>
                      </div>
                    )}
                    {selectedMentee.skillGap && (
                      <div>
                        <p className="text-sm text-gray-500">Skill Gap</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillGap}</p>
                      </div>
                    )}
                    {selectedMentee.timeInvestment && (
                      <div>
                        <p className="text-sm text-gray-500">Time Investment</p>
                        <p className="font-medium text-gray-900">{selectedMentee.timeInvestment}</p>
                      </div>
                    )}
                    {selectedMentee.decisionSatisfaction && (
                      <div>
                        <p className="text-sm text-gray-500">Decision Satisfaction</p>
                        <p className="font-medium text-gray-900">{selectedMentee.decisionSatisfaction}</p>
                      </div>
                    )}
                    {selectedMentee.realWorldExposure && (
                      <div>
                        <p className="text-sm text-gray-500">Real World Exposure</p>
                        <p className="font-medium text-gray-900">{selectedMentee.realWorldExposure}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Launch Level (University) */}
              {selectedMentee.educationLevel === 'university' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500">Launch Level Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.fieldOfStudy && (
                      <div>
                        <p className="text-sm text-gray-500">Field of Study</p>
                        <p className="font-medium text-gray-900">{selectedMentee.fieldOfStudy}</p>
                      </div>
                    )}
                    {selectedMentee.immediateCareerGoal && (
                      <div>
                        <p className="text-sm text-gray-500">Immediate Career Goal</p>
                        <p className="font-medium text-gray-900">{selectedMentee.immediateCareerGoal}</p>
                      </div>
                    )}
                    {selectedMentee.careerDirection && (
                      <div>
                        <p className="text-sm text-gray-500">Career Direction</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerDirection}</p>
                      </div>
                    )}
                    {selectedMentee.postStudyCertainty && (
                      <div>
                        <p className="text-sm text-gray-500">Post-Study Certainty</p>
                        <p className="font-medium text-gray-900">{selectedMentee.postStudyCertainty}</p>
                      </div>
                    )}
                    {selectedMentee.mentorshipNetwork && (
                      <div>
                        <p className="text-sm text-gray-500">Mentorship Network</p>
                        <p className="font-medium text-gray-900">{selectedMentee.mentorshipNetwork}</p>
                      </div>
                    )}
                    {selectedMentee.skillConfidence && (
                      <div>
                        <p className="text-sm text-gray-500">Skill Confidence</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillConfidence}</p>
                      </div>
                    )}
                    {selectedMentee.skillConfidentIn && (
                      <div>
                        <p className="text-sm text-gray-500">Skills Confident In</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillConfidentIn}</p>
                      </div>
                    )}
                    {selectedMentee.skillNotConfidentIn && (
                      <div>
                        <p className="text-sm text-gray-500">Skills Not Confident In</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillNotConfidentIn}</p>
                      </div>
                    )}
                    {selectedMentee.portfolioStatus && (
                      <div>
                        <p className="text-sm text-gray-500">Portfolio Status</p>
                        <p className="font-medium text-gray-900">{selectedMentee.portfolioStatus}</p>
                      </div>
                    )}
                    {selectedMentee.internshipExperience && (
                      <div>
                        <p className="text-sm text-gray-500">Internship Experience</p>
                        <p className="font-medium text-gray-900">{selectedMentee.internshipExperience}</p>
                      </div>
                    )}
                    {selectedMentee.networkingEfforts && (
                      <div>
                        <p className="text-sm text-gray-500">Networking Efforts</p>
                        <p className="font-medium text-gray-900">{selectedMentee.networkingEfforts}</p>
                      </div>
                    )}
                    {selectedMentee.cvReadiness && (
                      <div>
                        <p className="text-sm text-gray-500">CV Readiness</p>
                        <p className="font-medium text-gray-900">{selectedMentee.cvReadiness}</p>
                      </div>
                    )}
                    {selectedMentee.industryAwareness && (
                      <div>
                        <p className="text-sm text-gray-500">Industry Awareness</p>
                        <p className="font-medium text-gray-900">{selectedMentee.industryAwareness}</p>
                      </div>
                    )}
                    {selectedMentee.salaryExpectations && (
                      <div>
                        <p className="text-sm text-gray-500">Salary Expectations</p>
                        <p className="font-medium text-gray-900">{selectedMentee.salaryExpectations}</p>
                      </div>
                    )}
                    {selectedMentee.actionTaken && (
                      <div>
                        <p className="text-sm text-gray-500">Action Taken (Last 3 months)</p>
                        <p className="font-medium text-gray-900">{selectedMentee.actionTaken}</p>
                      </div>
                    )}
                    {selectedMentee.biggestChallenge && (
                      <div>
                        <p className="text-sm text-gray-500">Biggest Challenge</p>
                        <p className="font-medium text-gray-900">{selectedMentee.biggestChallenge}</p>
                      </div>
                    )}
                    {selectedMentee.jobReadinessNeeds && selectedMentee.jobReadinessNeeds.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Job-Readiness Needs</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedMentee.jobReadinessNeeds.map((need, idx) => (
                            <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm capitalize">
                              {need.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Young Professional */}
              {selectedMentee.educationLevel === 'young-professional' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Young Professional Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.careerStart && (
                      <div>
                        <p className="text-sm text-gray-500">Career Start</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerStart}</p>
                      </div>
                    )}
                    {selectedMentee.currentExperience && (
                      <div>
                        <p className="text-sm text-gray-500">Current Experience</p>
                        <p className="font-medium text-gray-900">{selectedMentee.currentExperience}</p>
                      </div>
                    )}
                    {selectedMentee.careerSatisfaction && (
                      <div>
                        <p className="text-sm text-gray-500">Career Satisfaction</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerSatisfaction}</p>
                      </div>
                    )}
                    {selectedMentee.careerSupport && (
                      <div>
                        <p className="text-sm text-gray-500">Career Support</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerSupport}</p>
                      </div>
                    )}
                    {selectedMentee.mentorshipExperience && (
                      <div>
                        <p className="text-sm text-gray-500">Mentorship Experience</p>
                        <p className="font-medium text-gray-900">{selectedMentee.mentorshipExperience}</p>
                      </div>
                    )}
                    {selectedMentee.careerDevelopment && (
                      <div>
                        <p className="text-sm text-gray-500">Career Development</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerDevelopment}</p>
                      </div>
                    )}
                    {selectedMentee.careerMobility && (
                      <div>
                        <p className="text-sm text-gray-500">Career Mobility</p>
                        <p className="font-medium text-gray-900">{selectedMentee.careerMobility}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mentor */}
              {selectedMentee.educationLevel === 'mentor' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-500">Mentor Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.initialMotivation && (
                      <div>
                        <p className="text-sm text-gray-500">Initial Motivation</p>
                        <p className="font-medium text-gray-900">{selectedMentee.initialMotivation}</p>
                      </div>
                    )}
                    {selectedMentee.skillsToShare && (
                      <div>
                        <p className="text-sm text-gray-500">Skills to Share</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillsToShare}</p>
                      </div>
                    )}
                    {selectedMentee.challenges && (
                      <div>
                        <p className="text-sm text-gray-500">Challenges</p>
                        <p className="font-medium text-gray-900">{selectedMentee.challenges}</p>
                      </div>
                    )}
                    {selectedMentee.resourcesNeeded && (
                      <div>
                        <p className="text-sm text-gray-500">Resources Needed</p>
                        <p className="font-medium text-gray-900">{selectedMentee.resourcesNeeded}</p>
                      </div>
                    )}
                    {selectedMentee.longTermMotivation && (
                      <div>
                        <p className="text-sm text-gray-500">Long Term Motivation</p>
                        <p className="font-medium text-gray-900">{selectedMentee.longTermMotivation}</p>
                      </div>
                    )}
                    {selectedMentee.youngerGenExperience && (
                      <div>
                        <p className="text-sm text-gray-500">Younger Generation Experience</p>
                        <p className="font-medium text-gray-900">{selectedMentee.youngerGenExperience}</p>
                      </div>
                    )}
                    {selectedMentee.menteeNeeds && (
                      <div>
                        <p className="text-sm text-gray-500">Mentee Needs Understanding</p>
                        <p className="font-medium text-gray-900">{selectedMentee.menteeNeeds}</p>
                      </div>
                    )}
                    {selectedMentee.perceivedValue && (
                      <div>
                        <p className="text-sm text-gray-500">Perceived Value</p>
                        <p className="font-medium text-gray-900">{selectedMentee.perceivedValue}</p>
                      </div>
                    )}
                    {selectedMentee.timeInvestmentMentor && (
                      <div>
                        <p className="text-sm text-gray-500">Time Investment</p>
                        <p className="font-medium text-gray-900">{selectedMentee.timeInvestmentMentor}</p>
                      </div>
                    )}
                    {selectedMentee.coordinatorInvolvement && (
                      <div>
                        <p className="text-sm text-gray-500">Coordinator Involvement</p>
                        <p className="font-medium text-gray-900">{selectedMentee.coordinatorInvolvement}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Final Validation & Feedback */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-500">Final Validation & Feedback</h3>
                <div className="space-y-4">
                  {selectedMentee.problemValidation && (
                    <div>
                      <p className="text-sm text-gray-500">Problem Validation</p>
                      <p className="font-medium text-gray-900">{selectedMentee.problemValidation}</p>
                    </div>
                  )}
                  {selectedMentee.mentorshipNecessity && (
                    <div>
                      <p className="text-sm text-gray-500">Mentorship Necessity</p>
                      <p className="font-medium text-gray-900">{selectedMentee.mentorshipNecessity}</p>
                    </div>
                  )}
                  {selectedMentee.openFeedback && (
                    <div>
                      <p className="text-sm text-gray-500">Open Feedback</p>
                      <p className="font-medium text-gray-900">{selectedMentee.openFeedback}</p>
                    </div>
                  )}
                  {selectedMentee.referralIntent && (
                    <div>
                      <p className="text-sm text-gray-500">Referral Intent</p>
                      <p className="font-medium text-gray-900">{selectedMentee.referralIntent}</p>
                    </div>
                  )}
                  {selectedMentee.outcomeExpectation && (
                    <div>
                      <p className="text-sm text-gray-500">Outcome Expectation</p>
                      <p className="font-medium text-gray-900">{selectedMentee.outcomeExpectation}</p>
                    </div>
                  )}
                  {selectedMentee.willingnessToInvest && (
                    <div>
                      <p className="text-sm text-gray-500">Willingness to Invest</p>
                      <p className="font-medium text-gray-900">{selectedMentee.willingnessToInvest}</p>
                    </div>
                  )}
                  {selectedMentee.urgencyLevel && (
                    <div>
                      <p className="text-sm text-gray-500">Urgency Level</p>
                      <p className="font-medium text-gray-900">{selectedMentee.urgencyLevel}</p>
                    </div>
                  )}
                  {selectedMentee.awareness && (
                    <div>
                      <p className="text-sm text-gray-500">Awareness</p>
                      <p className="font-medium text-gray-900">{selectedMentee.awareness}</p>
                    </div>
                  )}
                  {selectedMentee.mentorshipStructure && (
                    <div>
                      <p className="text-sm text-gray-500">Mentorship Structure</p>
                      <p className="font-medium text-gray-900">{selectedMentee.mentorshipStructure}</p>
                    </div>
                  )}
                  {selectedMentee.successDefinition && (
                    <div>
                      <p className="text-sm text-gray-500">Success Definition</p>
                      <p className="font-medium text-gray-900">{selectedMentee.successDefinition}</p>
                    </div>
                  )}
                  {selectedMentee.formatPreference && (
                    <div>
                      <p className="text-sm text-gray-500">Format Preference</p>
                      <p className="font-medium text-gray-900">{selectedMentee.formatPreference}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Application Date */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Applied On</p>
                  <p className="font-medium text-gray-900">{new Date(selectedMentee.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
