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
      'bachelor': "Bachelor's Degree",
      'master': "Master's Degree",
      'phd': 'PhD',
      'other': 'Other'
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Education</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
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
                      <div className="font-medium text-gray-900">{mentee.firstName} {mentee.lastName}</div>
                      <div className="text-sm text-gray-500">{mentee.nationality}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getEducationLabel(mentee.currentEducation)}</div>
                      <div className="text-xs text-gray-500">{mentee.institution}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentee.fieldOfStudy}</td>
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
                  <h2 className="text-2xl font-bold">{selectedMentee.firstName} {selectedMentee.lastName}</h2>
                  <p className="text-blue-100 mt-1">{selectedMentee.email}</p>
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
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedMentee.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-900">{new Date(selectedMentee.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-900 capitalize">{selectedMentee.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="font-medium text-gray-900">{selectedMentee.nationality}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-600">Education Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Education Level</p>
                    <p className="font-medium text-gray-900">{getEducationLabel(selectedMentee.currentEducation)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p className="font-medium text-gray-900">{selectedMentee.institution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Field of Study</p>
                    <p className="font-medium text-gray-900">{selectedMentee.fieldOfStudy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year of Study</p>
                    <p className="font-medium text-gray-900">{selectedMentee.yearOfStudy}</p>
                  </div>
                </div>
              </div>

              {/* Mentorship Preferences */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-600">Mentorship Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Career Interests</p>
                    <p className="font-medium text-gray-900">{selectedMentee.careerInterests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mentorship Goals</p>
                    <p className="font-medium text-gray-900">{selectedMentee.mentorshipGoals}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Preferred Mentor Background</p>
                      <p className="font-medium text-gray-900">{selectedMentee.preferredMentorBackground || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-medium text-gray-900">{selectedMentee.availability}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language & Additional */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600">Language & Additional Information</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">English Proficiency</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedMentee.englishProficiency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Other Languages</p>
                      <p className="font-medium text-gray-900">{selectedMentee.otherLanguages || 'Not specified'}</p>
                    </div>
                  </div>
                  {selectedMentee.linkedin && (
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn Profile</p>
                      <a href={selectedMentee.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                        {selectedMentee.linkedin}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Motivation</p>
                    <p className="font-medium text-gray-900">{selectedMentee.motivation}</p>
                  </div>
                </div>
              </div>

              {/* Foundation Level (6th & 10th) */}
              {selectedMentee.currentEducation === '6th-10th' && selectedMentee.careerAspirations && (
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
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMentee.streamSelectionCertainty && (
                        <div>
                          <p className="text-sm text-gray-500">Stream Selection Certainty</p>
                          <p className="font-medium text-gray-900">{selectedMentee.streamSelectionCertainty}/5</p>
                        </div>
                      )}
                      {selectedMentee.currentGuidance && (
                        <div>
                          <p className="text-sm text-gray-500">Current Guidance Source</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.currentGuidance}</p>
                        </div>
                      )}
                      {selectedMentee.mentorshipInterest && (
                        <div>
                          <p className="text-sm text-gray-500">Mentorship Interest</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.mentorshipInterest}</p>
                        </div>
                      )}
                      {selectedMentee.learningStyle && (
                        <div>
                          <p className="text-sm text-gray-500">Learning Style</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.learningStyle}</p>
                        </div>
                      )}
                    </div>
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
              {selectedMentee.currentEducation === '11th-12th' && selectedMentee.professionalVision && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500">Bridge Level Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.professionalVision && (
                      <div>
                        <p className="text-sm text-gray-500">Professional Vision (5 years)</p>
                        <p className="font-medium text-gray-900">{selectedMentee.professionalVision}</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMentee.currentDomain && (
                        <div>
                          <p className="text-sm text-gray-500">Current Domain/Stream</p>
                          <p className="font-medium text-gray-900">{selectedMentee.currentDomain}</p>
                        </div>
                      )}
                      {selectedMentee.careerClarityScore && (
                        <div>
                          <p className="text-sm text-gray-500">Career Clarity Score</p>
                          <p className="font-medium text-gray-900">{selectedMentee.careerClarityScore}/5</p>
                        </div>
                      )}
                      {selectedMentee.industryExposure && (
                        <div>
                          <p className="text-sm text-gray-500">Industry Exposure</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.industryExposure}</p>
                        </div>
                      )}
                      {selectedMentee.timeInvestment && (
                        <div>
                          <p className="text-sm text-gray-500">Daily Time Investment</p>
                          <p className="font-medium text-gray-900">{selectedMentee.timeInvestment}</p>
                        </div>
                      )}
                    </div>
                    {selectedMentee.choiceValidation && (
                      <div>
                        <p className="text-sm text-gray-500">Choice Validation</p>
                        <p className="font-medium text-gray-900">{selectedMentee.choiceValidation}</p>
                      </div>
                    )}
                    {selectedMentee.supportGap && (
                      <div>
                        <p className="text-sm text-gray-500">Support Gap</p>
                        <p className="font-medium text-gray-900">{selectedMentee.supportGap}</p>
                      </div>
                    )}
                    {selectedMentee.entranceExamStrategy && (
                      <div>
                        <p className="text-sm text-gray-500">Entrance Exam Strategy</p>
                        <p className="font-medium text-gray-900">{selectedMentee.entranceExamStrategy}</p>
                      </div>
                    )}
                    {selectedMentee.skillGapAwareness && (
                      <div>
                        <p className="text-sm text-gray-500">Skill Gap Awareness</p>
                        <p className="font-medium text-gray-900">{selectedMentee.skillGapAwareness}</p>
                      </div>
                    )}
                    {selectedMentee.decisionSatisfaction && (
                      <div>
                        <p className="text-sm text-gray-500">Decision Satisfaction</p>
                        <p className="font-medium text-gray-900">{selectedMentee.decisionSatisfaction}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Launch Level (University) */}
              {selectedMentee.currentEducation === 'bachelor' && selectedMentee.ultimateCareerGoal && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500">Launch Level Details</h3>
                  <div className="space-y-4">
                    {selectedMentee.ultimateCareerGoal && (
                      <div>
                        <p className="text-sm text-gray-500">Ultimate Career Goal</p>
                        <p className="font-medium text-gray-900">{selectedMentee.ultimateCareerGoal}</p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMentee.postStudyCertainty && (
                        <div>
                          <p className="text-sm text-gray-500">Post-Study Certainty</p>
                          <p className="font-medium text-gray-900">{selectedMentee.postStudyCertainty}/5</p>
                        </div>
                      )}
                      {selectedMentee.careerDirection && (
                        <div>
                          <p className="text-sm text-gray-500">Career Direction</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.careerDirection}</p>
                        </div>
                      )}
                      {selectedMentee.skillConfidence && (
                        <div>
                          <p className="text-sm text-gray-500">Skill Confidence</p>
                          <p className="font-medium text-gray-900">{selectedMentee.skillConfidence}/5</p>
                        </div>
                      )}
                      {selectedMentee.portfolioStatus && (
                        <div>
                          <p className="text-sm text-gray-500">Portfolio Status</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.portfolioStatus}</p>
                        </div>
                      )}
                      {selectedMentee.resumeReadiness && (
                        <div>
                          <p className="text-sm text-gray-500">Resume Readiness</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.resumeReadiness}</p>
                        </div>
                      )}
                      {selectedMentee.industryAwareness && (
                        <div>
                          <p className="text-sm text-gray-500">Industry Awareness</p>
                          <p className="font-medium text-gray-900">{selectedMentee.industryAwareness}/5</p>
                        </div>
                      )}
                    </div>
                    {selectedMentee.internshipExperience && (
                      <div>
                        <p className="text-sm text-gray-500">Internship Experience</p>
                        <p className="font-medium text-gray-900">{selectedMentee.internshipExperience}</p>
                      </div>
                    )}
                    {selectedMentee.networkingEfforts && (
                      <div>
                        <p className="text-sm text-gray-500">Networking Efforts</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedMentee.networkingEfforts}</p>
                      </div>
                    )}
                    {selectedMentee.biggestChallenge && (
                      <div>
                        <p className="text-sm text-gray-500">Biggest Challenge</p>
                        <p className="font-medium text-gray-900">{selectedMentee.biggestChallenge}</p>
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

              {/* Final Validation & Feedback */}
              {selectedMentee.problemStatementValidation && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-orange-500">Final Validation & Feedback</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMentee.problemStatementValidation && (
                        <div>
                          <p className="text-sm text-gray-500">Problem Statement Validation</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.problemStatementValidation.replace('-', ' ')}</p>
                        </div>
                      )}
                      {selectedMentee.mentorshipNecessity && (
                        <div>
                          <p className="text-sm text-gray-500">Mentorship Necessity</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.mentorshipNecessity.replace('-', ' ')}</p>
                        </div>
                      )}
                      {selectedMentee.referralIntent && (
                        <div>
                          <p className="text-sm text-gray-500">Referral Intent</p>
                          <p className="font-medium text-gray-900 capitalize">{selectedMentee.referralIntent}</p>
                        </div>
                      )}
                      {selectedMentee.urgencyLevel && (
                        <div>
                          <p className="text-sm text-gray-500">Urgency Level</p>
                          <p className="font-medium text-gray-900">{selectedMentee.urgencyLevel}/5</p>
                        </div>
                      )}
                    </div>
                    {selectedMentee.openFeedback && (
                      <div>
                        <p className="text-sm text-gray-500">Open Feedback</p>
                        <p className="font-medium text-gray-900">{selectedMentee.openFeedback}</p>
                      </div>
                    )}
                    {selectedMentee.outcomeExpectation && (
                      <div>
                        <p className="text-sm text-gray-500">Outcome Expectation</p>
                        <p className="font-medium text-gray-900">{selectedMentee.outcomeExpectation}</p>
                      </div>
                    )}
                    {selectedMentee.biggestPainPoint && (
                      <div>
                        <p className="text-sm text-gray-500">Biggest Pain Point</p>
                        <p className="font-medium text-gray-900">{selectedMentee.biggestPainPoint}</p>
                      </div>
                    )}
                    {selectedMentee.mentorshipFormatPreference && (
                      <div>
                        <p className="text-sm text-gray-500">Mentorship Format Preference</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedMentee.mentorshipFormatPreference}</p>
                      </div>
                    )}
                    {selectedMentee.willingnessToInvest && (
                      <div>
                        <p className="text-sm text-gray-500">Willingness to Invest</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedMentee.willingnessToInvest}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
