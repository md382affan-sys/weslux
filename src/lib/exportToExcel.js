import * as XLSX from 'xlsx';

export const exportMenteesToExcel = (mentees) => {
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

  const excelData = mentees.map(mentee => {
    const baseData = {
      'Full Name': mentee.fullName || '',
      'Email': mentee.email || '',
      'Phone': mentee.phone || '',
      'Education Level': getEducationLabel(mentee.educationLevel),
      'Status': !mentee.status || mentee.status === 'pending' ? 'Pending' : 
                mentee.status === 'replied' ? 'Replied' : 
                mentee.statusNote || 'Other',
      'Applied Date': new Date(mentee.createdAt).toLocaleString(),
    };

    // Add all fields based on category
    const categoryFields = {};
    
    if (mentee.educationLevel === '6th-10th') {
      Object.assign(categoryFields, {
        'Career Aspirations': mentee.careerAspirations || '',
        'Academic Interests': mentee.academicInterests || '',
        'Stream Certainty': mentee.streamCertainty || '',
        'Current Guidance': mentee.currentGuidance || '',
        'Mentorship Problems': mentee.mentorshipProblems || '',
        'Exposure Level': mentee.exposureLevel || '',
        'Exposure Details': mentee.exposureDetails || '',
        'Role Model': mentee.roleModel || '',
        'Skill Awareness': mentee.skillAwareness || '',
        'Fear Factor': mentee.fearFactor || '',
        'Family Expectations': mentee.familyExpectations || '',
        'Learning Style': mentee.learningStyle || '',
        'Curiosity Check': mentee.curiosityCheck || '',
      });
    } else if (mentee.educationLevel === '11th-12th') {
      Object.assign(categoryFields, {
        'Professional Vision': mentee.professionalVision || '',
        'Current Domain': mentee.currentDomain || '',
        'Choice Validation': mentee.choiceValidation || '',
        'Industry Access': mentee.industryAccess || '',
        'Support Gap': mentee.supportGap || '',
        'Career Clarity': mentee.careerClarity || '',
        'Backup Plan': mentee.backupPlan || '',
        'Entrance Exams': mentee.entranceExams || '',
        'Information Source': mentee.informationSource || '',
        'Skill Gap': mentee.skillGap || '',
        'Time Investment': mentee.timeInvestment || '',
        'Decision Satisfaction': mentee.decisionSatisfaction || '',
        'Real World Exposure': mentee.realWorldExposure || '',
      });
    } else if (mentee.educationLevel === 'university') {
      Object.assign(categoryFields, {
        'Field of Study': mentee.fieldOfStudy || '',
        'Immediate Career Goal': mentee.immediateCareerGoal || '',
        'Career Direction': mentee.careerDirection || '',
        'Post Study Certainty': mentee.postStudyCertainty || '',
        'Mentorship Network': mentee.mentorshipNetwork || '',
        'Skill Confidence': mentee.skillConfidence || '',
        'Skills Confident In': mentee.skillConfidentIn || '',
        'Skills Not Confident In': mentee.skillNotConfidentIn || '',
        'Portfolio Status': mentee.portfolioStatus || '',
        'Internship Experience': mentee.internshipExperience || '',
        'Networking Efforts': mentee.networkingEfforts || '',
        'CV Readiness': mentee.cvReadiness || '',
        'Industry Awareness': mentee.industryAwareness || '',
        'Salary Expectations': mentee.salaryExpectations || '',
        'Action Taken': mentee.actionTaken || '',
        'Biggest Challenge': mentee.biggestChallenge || '',
        'Job Readiness Needs': mentee.jobReadinessNeeds?.join(', ') || '',
      });
    } else if (mentee.educationLevel === 'young-professional') {
      Object.assign(categoryFields, {
        'Career Start': mentee.careerStart || '',
        'Current Experience': mentee.currentExperience || '',
        'Career Satisfaction': mentee.careerSatisfaction || '',
        'Career Support': mentee.careerSupport || '',
        'Mentorship Experience': mentee.mentorshipExperience || '',
        'Career Development': mentee.careerDevelopment || '',
        'Career Mobility': mentee.careerMobility || '',
      });
    } else if (mentee.educationLevel === 'mentor') {
      Object.assign(categoryFields, {
        'Initial Motivation': mentee.initialMotivation || '',
        'Skills to Share': mentee.skillsToShare || '',
        'Challenges': mentee.challenges || '',
        'Resources Needed': mentee.resourcesNeeded || '',
        'Long Term Motivation': mentee.longTermMotivation || '',
        'Younger Gen Experience': mentee.youngerGenExperience || '',
        'Mentee Needs': mentee.menteeNeeds || '',
        'Perceived Value': mentee.perceivedValue || '',
        'Time Investment': mentee.timeInvestmentMentor || '',
        'Coordinator Involvement': mentee.coordinatorInvolvement || '',
      });
    }

    // Final validation fields (common)
    const finalFields = {
      'Problem Validation': mentee.problemValidation || '',
      'Mentorship Necessity': mentee.mentorshipNecessity || '',
      'Open Feedback': mentee.openFeedback || '',
      'Referral Intent': mentee.referralIntent || '',
      'Outcome Expectation': mentee.outcomeExpectation || '',
      'Willingness to Invest': mentee.willingnessToInvest || '',
      'Urgency Level': mentee.urgencyLevel || '',
      'Awareness': mentee.awareness || '',
      'Mentorship Structure': mentee.mentorshipStructure || '',
      'Success Definition': mentee.successDefinition || '',
      'Format Preference': mentee.formatPreference || '',
    };

    return { ...baseData, ...categoryFields, ...finalFields };
  });

  downloadExcel(excelData, 'Mentee_Applications');
};

export const exportVolunteersToExcel = (volunteers) => {
  const excelData = volunteers.map(volunteer => ({
    'First Name': volunteer.firstName || '',
    'Last Name': volunteer.lastName || '',
    'Email': volunteer.email || '',
    'Phone': volunteer.phone || '',
    'Country': volunteer.country || '',
    'Volunteer Role': volunteer.volunteerRole || '',
    'Profession': volunteer.profession || '',
    'Company': volunteer.company || '',
    'Experience': volunteer.experience || '',
    'Expertise': volunteer.expertise || '',
    'Availability': volunteer.availability || '',
    'Motivation': volunteer.motivation || '',
    'LinkedIn': volunteer.linkedin || '',
    'Status': !volunteer.status || volunteer.status === 'pending' ? 'Pending' : 
              volunteer.status === 'replied' ? 'Replied' : 
              volunteer.statusNote || 'Other',
    'Applied Date': new Date(volunteer.createdAt).toLocaleString(),
  }));

  downloadExcel(excelData, 'Volunteer_Applications');
};

export const exportAmbassadorsToExcel = (ambassadors) => {
  const excelData = ambassadors.map(ambassador => ({
    'Full Name': ambassador.fullName || '',
    'Email': ambassador.email || '',
    'Role Interest': ambassador.roleInterest || '',
    'Background': ambassador.background || '',
    'Ideas': ambassador.ideas || '',
    'Status': !ambassador.status || ambassador.status === 'pending' ? 'Pending' : 
              ambassador.status === 'replied' ? 'Replied' : 
              ambassador.statusNote || 'Other',
    'Applied Date': new Date(ambassador.createdAt).toLocaleString(),
  }));

  downloadExcel(excelData, 'Ambassador_Applications');
};

export const exportContactsToExcel = (contacts) => {
  const excelData = contacts.map(contact => ({
    'Name': contact.name || '',
    'Email': contact.email || '',
    'Phone': contact.phone || '',
    'Subject': contact.subject || '',
    'Program': contact.program || '',
    'Message': contact.message || '',
    'Status': !contact.status || contact.status === 'pending' ? 'Pending' : 
              contact.status === 'replied' ? 'Replied' : 
              contact.statusNote || 'Other',
    'Submitted Date': new Date(contact.createdAt).toLocaleString(),
  }));

  downloadExcel(excelData, 'Contact_Submissions');
};

export const exportPartnersToExcel = (partners) => {
  const excelData = partners.map(partner => ({
    'Full Name': partner.fullName || '',
    'Organization': partner.organization || '',
    'Email': partner.email || '',
    'Phone': partner.phone || '',
    'Organization Type': partner.organizationType || '',
    'Partner Category': partner.partnerCategory || '',
    'Interests': partner.interests?.join(', ') || '',
    'Message': partner.message || '',
    'Status': !partner.status || partner.status === 'pending' ? 'Pending' : 
              partner.status === 'replied' ? 'Replied' : 
              partner.statusNote || 'Other',
    'Applied Date': new Date(partner.createdAt).toLocaleString(),
  }));

  downloadExcel(excelData, 'Partner_Applications');
};

export const exportDonationsToExcel = (donations) => {
  const excelData = donations.map(donation => ({
    'Name': donation.anonymous ? 'Anonymous' : (donation.name || ''),
    'Email': donation.anonymous ? 'Anonymous' : (donation.email || ''),
    'Amount (€)': donation.amount || 0,
    'Donation Type': donation.donationType || '',
    'Anonymous': donation.anonymous ? 'Yes' : 'No',
    'Status': !donation.status || donation.status === 'pending' ? 'Pending' : 
              donation.status === 'replied' ? 'Replied' : 
              donation.statusNote || 'Other',
    'Donation Date': new Date(donation.createdAt).toLocaleString(),
  }));

  downloadExcel(excelData, 'Donations');
};

// Helper function to download Excel file
const downloadExcel = (data, filename) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Set column widths
  const colWidths = Object.keys(data[0]).map(() => ({ wch: 30 }));
  ws['!cols'] = colWidths;

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, filename);

  // Generate filename with current date
  const date = new Date().toISOString().split('T')[0];
  const fullFilename = `${filename}_${date}.xlsx`;

  // Download file
  XLSX.writeFile(wb, fullFilename);
};
