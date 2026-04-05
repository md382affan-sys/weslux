import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email templates
export const emailTemplates = {
  contact: {
    user: (data) => ({
      subject: 'Thank you for contacting WES Luxembourg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Reaching Out!</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your message and will get back to you shortly.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            ${data.program ? `<p><strong>Program Interest:</strong> ${data.program}</p>` : ''}
            <p><strong>Message:</strong> ${data.message}</p>
          </div>
          <p>Best regards,<br>WES Luxembourg Team</p>
        </div>
      `
    }),
    admin: (data) => ({
      subject: `New Contact Form Submission - ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
            ${data.program ? `<p><strong>Program:</strong> ${data.program}</p>` : ''}
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    })
  },

  volunteer: {
    user: (data) => ({
      subject: 'Thank you for your Volunteer Application - WES Luxembourg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Thank You for Volunteering!</h2>
          <p>Dear ${data.firstName} ${data.lastName},</p>
          <p>Thank you for your interest in volunteering with WES Luxembourg. We have received your application and our team will review it shortly.</p>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Application Summary:</h3>
            <p><strong>Role:</strong> ${data.volunteerRole}</p>
            <p><strong>Expertise:</strong> ${data.expertise}</p>
            <p><strong>Availability:</strong> ${data.availability}</p>
          </div>
          <p>We appreciate your commitment to making a difference!</p>
          <p>Best regards,<br>WES Luxembourg Team</p>
        </div>
      `
    }),
    admin: (data) => ({
      subject: `New Volunteer Application - ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">New Volunteer Application</h2>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Country:</strong> ${data.country}</p>
            <p><strong>Role:</strong> ${data.volunteerRole}</p>
            <p><strong>Profession:</strong> ${data.profession}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            <p><strong>Experience:</strong> ${data.experience}</p>
            <p><strong>Expertise:</strong> ${data.expertise}</p>
            <p><strong>Availability:</strong> ${data.availability}</p>
            ${data.linkedin ? `<p><strong>LinkedIn:</strong> ${data.linkedin}</p>` : ''}
            <p><strong>Motivation:</strong> ${data.motivation}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    })
  },

  ambassador: {
    user: (data) => ({
      subject: 'Thank you for your Ambassador Application - WES Luxembourg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Thank You for Your Interest!</h2>
          <p>Dear ${data.fullName},</p>
          <p>Thank you for applying to become a WES Luxembourg Ambassador. We have received your application and will review it carefully.</p>
          <div style="background: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Application Summary:</h3>
            <p><strong>Role Interest:</strong> ${data.roleInterest}</p>
            <p><strong>Background:</strong> ${data.background}</p>
          </div>
          <p>We're excited about your interest in representing WES Luxembourg!</p>
          <p>Best regards,<br>WES Luxembourg Team</p>
        </div>
      `
    }),
    admin: (data) => ({
      subject: `New Ambassador Application - ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">New Ambassador Application</h2>
          <div style="background: #faf5ff; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Role Interest:</strong> ${data.roleInterest}</p>
            <p><strong>Background:</strong> ${data.background}</p>
            <p><strong>Ideas:</strong> ${data.ideas}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    })
  },

  donation: {
    user: (data) => ({
      subject: 'Thank you for your generous donation - WES Luxembourg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">Thank You for Your Support!</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for your generous donation to WES Luxembourg. Your support helps us continue our mission of empowering students and professionals.</p>
          <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Donation Details:</h3>
            <p><strong>Amount:</strong> €${data.amount}</p>
            <p><strong>Type:</strong> ${data.donationType}</p>
            ${data.anonymous ? '<p><em>Your donation will be processed anonymously.</em></p>' : ''}
          </div>
          <p>Your contribution makes a real difference!</p>
          <p>Best regards,<br>WES Luxembourg Team</p>
        </div>
      `
    }),
    admin: (data) => ({
      subject: `New Donation Received - €${data.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Donation Received</h2>
          <div style="background: #fff7ed; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Amount:</strong> €${data.amount}</p>
            <p><strong>Type:</strong> ${data.donationType}</p>
            <p><strong>Anonymous:</strong> ${data.anonymous ? 'Yes' : 'No'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    })
  },

  partner: {
    user: (data) => ({
      subject: 'Thank you for your Partnership Interest - WES Luxembourg',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Thank You for Your Interest!</h2>
          <p>Dear ${data.fullName},</p>
          <p>Thank you for your interest in partnering with WES Luxembourg. We have received your application and our partnerships team will be in touch soon.</p>
          <div style="background: #eef2ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Partnership Details:</h3>
            <p><strong>Organization:</strong> ${data.organization}</p>
            <p><strong>Type:</strong> ${data.organizationType}</p>
            <p><strong>Category:</strong> ${data.partnerCategory}</p>
          </div>
          <p>We look forward to exploring collaboration opportunities!</p>
          <p>Best regards,<br>WES Luxembourg Team</p>
        </div>
      `
    }),
    admin: (data) => ({
      subject: `New Partnership Application - ${data.organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Partnership Application</h2>
          <div style="background: #eef2ff; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Organization:</strong> ${data.organization}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Organization Type:</strong> ${data.organizationType}</p>
            <p><strong>Category:</strong> ${data.partnerCategory}</p>
            ${data.interests && data.interests.length > 0 ? `
              <p><strong>Interests:</strong></p>
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${data.interests.map(interest => `<li>${interest}</li>`).join('')}
              </ul>
            ` : '<p><strong>Interests:</strong> Not specified</p>'}
            ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    })
  },

  mentee: {
    user: (data) => ({
      subject: 'Welcome to WES Luxembourg Mentorship Program!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Welcome to Our Mentorship Program!</h2>
          <p>Dear ${data.fullName},</p>
          <p>Thank you for applying to join our mentorship program. We're excited about your interest!</p>
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="margin-top: 0; color: #1e40af;">Your Application Details:</h3>
            <p><strong>Category:</strong> ${data.educationLevel === '6th-10th' ? '6th or 10th Grade' : data.educationLevel === '11th-12th' ? '11th or 12th Grade' : data.educationLevel === 'university' ? 'University Student' : data.educationLevel === 'young-professional' ? 'Young Professional' : 'Mentor'}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
          </div>
          <p>Our team will review your application and match you with a suitable mentor. We'll contact you within 5-7 business days.</p>
          <p>Best regards,<br>WES Luxembourg Mentorship Team</p>
        </div>
      `
    }),
    admin: (data) => {
      const getCategoryLabel = (level) => {
        const labels = {
          '6th-10th': '6th or 10th Grade',
          '11th-12th': '11th or 12th Grade',
          'university': 'University Student',
          'young-professional': 'Young Professional',
          'mentor': 'Mentor'
        };
        return labels[level] || level;
      };

      let categorySpecificHtml = '';
      
      // Foundation Level (6th-10th)
      if (data.educationLevel === '6th-10th') {
        categorySpecificHtml = `
          <h3 style="color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 8px; margin-top: 20px;">Foundation Level Details</h3>
          ${data.careerAspirations ? `<p><strong>Career Aspirations:</strong> ${data.careerAspirations}</p>` : ''}
          ${data.academicInterests ? `<p><strong>Academic Interests:</strong> ${data.academicInterests}</p>` : ''}
          ${data.streamCertainty ? `<p><strong>Stream Certainty:</strong> ${data.streamCertainty}</p>` : ''}
          ${data.currentGuidance ? `<p><strong>Current Guidance:</strong> ${data.currentGuidance}</p>` : ''}
          ${data.roleModel ? `<p><strong>Role Model:</strong> ${data.roleModel}</p>` : ''}
        `;
      }
      
      // Bridge Level (11th-12th)
      if (data.educationLevel === '11th-12th') {
        categorySpecificHtml = `
          <h3 style="color: #1f2937; border-bottom: 2px solid #9333ea; padding-bottom: 8px; margin-top: 20px;">Bridge Level Details</h3>
          ${data.professionalVision ? `<p><strong>Professional Vision:</strong> ${data.professionalVision}</p>` : ''}
          ${data.currentDomain ? `<p><strong>Current Domain:</strong> ${data.currentDomain}</p>` : ''}
          ${data.careerClarity ? `<p><strong>Career Clarity:</strong> ${data.careerClarity}</p>` : ''}
          ${data.supportGap ? `<p><strong>Support Gap:</strong> ${data.supportGap}</p>` : ''}
        `;
      }
      
      // Launch Level (University)
      if (data.educationLevel === 'university') {
        categorySpecificHtml = `
          <h3 style="color: #1f2937; border-bottom: 2px solid #6366f1; padding-bottom: 8px; margin-top: 20px;">Launch Level Details</h3>
          ${data.fieldOfStudy ? `<p><strong>Field of Study:</strong> ${data.fieldOfStudy}</p>` : ''}
          ${data.immediateCareerGoal ? `<p><strong>Career Goal:</strong> ${data.immediateCareerGoal}</p>` : ''}
          ${data.careerDirection ? `<p><strong>Career Direction:</strong> ${data.careerDirection}</p>` : ''}
          ${data.skillConfidence ? `<p><strong>Skill Confidence:</strong> ${data.skillConfidence}</p>` : ''}
          ${data.biggestChallenge ? `<p><strong>Biggest Challenge:</strong> ${data.biggestChallenge}</p>` : ''}
        `;
      }
      
      // Young Professional
      if (data.educationLevel === 'young-professional') {
        categorySpecificHtml = `
          <h3 style="color: #1f2937; border-bottom: 2px solid #14b8a6; padding-bottom: 8px; margin-top: 20px;">Young Professional Details</h3>
          ${data.careerStart ? `<p><strong>Career Start:</strong> ${data.careerStart}</p>` : ''}
          ${data.currentExperience ? `<p><strong>Current Experience:</strong> ${data.currentExperience}</p>` : ''}
          ${data.careerSatisfaction ? `<p><strong>Career Satisfaction:</strong> ${data.careerSatisfaction}</p>` : ''}
          ${data.careerDevelopment ? `<p><strong>Career Development:</strong> ${data.careerDevelopment}</p>` : ''}
        `;
      }
      
      // Mentor
      if (data.educationLevel === 'mentor') {
        categorySpecificHtml = `
          <h3 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; margin-top: 20px;">Mentor Details</h3>
          ${data.initialMotivation ? `<p><strong>Motivation:</strong> ${data.initialMotivation}</p>` : ''}
          ${data.skillsToShare ? `<p><strong>Skills to Share:</strong> ${data.skillsToShare}</p>` : ''}
          ${data.challenges ? `<p><strong>Challenges:</strong> ${data.challenges}</p>` : ''}
          ${data.perceivedValue ? `<p><strong>Perceived Value:</strong> ${data.perceivedValue}</p>` : ''}
        `;
      }

      return {
        subject: `New Mentee Application - ${data.fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">New Mentee Application Received</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">Personal Information</h3>
              <p><strong>Name:</strong> ${data.fullName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Category:</strong> ${getCategoryLabel(data.educationLevel)}</p>
              
              ${categorySpecificHtml}
              
              ${data.problemValidation || data.mentorshipNecessity || data.openFeedback ? `
                <h3 style="color: #1f2937; border-bottom: 2px solid #ef4444; padding-bottom: 8px; margin-top: 20px;">Final Validation</h3>
                ${data.problemValidation ? `<p><strong>Problem Validation:</strong> ${data.problemValidation}</p>` : ''}
                ${data.mentorshipNecessity ? `<p><strong>Mentorship Necessity:</strong> ${data.mentorshipNecessity}</p>` : ''}
                ${data.openFeedback ? `<p><strong>Feedback:</strong> ${data.openFeedback}</p>` : ''}
              ` : ''}
              
              <p style="margin-top: 20px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `
      };
    }
  }
};

// Send email function
export async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"WES Luxembourg" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

// Send form submission emails (both user and admin)
export async function sendFormEmails(formType, data) {
  const template = emailTemplates[formType];
  if (!template) {
    throw new Error(`Unknown form type: ${formType}`);
  }

  const userEmail = template.user(data);
  const adminEmail = template.admin(data);

  // Send to user
  const userResult = await sendEmail(data.email, userEmail.subject, userEmail.html);
  
  // Send to admin
  const adminResult = await sendEmail(
    process.env.ADMIN_EMAIL,
    adminEmail.subject,
    adminEmail.html
  );

  return {
    userEmail: userResult,
    adminEmail: adminResult
  };
}

// Send news notification email to admin
export async function sendNewsNotificationEmail(data) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New News Posted: ${data.newsTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">📰 New News & Event Posted</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                Admin Details
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Admin Name:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937;">${data.adminName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Admin Email:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937;">${data.adminEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Admin Role:</strong></td>
                  <td style="padding: 8px 0;">
                    <span style="background: ${data.adminRole === 'super_admin' ? '#9333ea' : '#3b82f6'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                      ${data.adminRole === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Posted At:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
              <h3 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                News Details
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Date:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937;">${data.newsMonth} ${data.newsDay}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Category:</strong></td>
                  <td style="padding: 8px 0;">
                    <span style="background: #f3f4f6; color: #374151; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                      ${data.newsCategory}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Status:</strong></td>
                  <td style="padding: 8px 0;">
                    <span style="background: ${data.newsStatus === 'published' ? '#10b981' : '#f59e0b'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                      ${data.newsStatus === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 20px;">
                <h4 style="color: #1f2937; margin-bottom: 10px;">Title:</h4>
                <p style="color: #374151; font-size: 16px; font-weight: 600; margin: 0; padding: 12px; background: #f9fafb; border-left: 4px solid #667eea; border-radius: 4px;">
                  ${data.newsTitle}
                </p>
              </div>

              <div style="margin-top: 20px;">
                <h4 style="color: #1f2937; margin-bottom: 10px;">Description:</h4>
                <p style="color: #4b5563; line-height: 1.6; margin: 0; padding: 12px; background: #f9fafb; border-radius: 4px;">
                  ${data.newsDescription}
                </p>
              </div>

              <div style="margin-top: 20px;">
                <h4 style="color: #1f2937; margin-bottom: 10px;">Details:</h4>
                <p style="color: #4b5563; line-height: 1.6; margin: 0; padding: 12px; background: #f9fafb; border-radius: 4px;">
                  ${data.newsDetails}
                </p>
              </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>📌 Note:</strong> This news ${data.newsStatus === 'published' ? 'is now live on the website' : 'is saved as draft and not visible to public yet'}.
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                WES Luxembourg for Education ASBL<br>
                <a href="https://weslux.lu" style="color: #667eea; text-decoration: none;">www.weslux.lu</a>
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('News notification email sent successfully');
  } catch (error) {
    console.error('Error sending news notification email:', error);
    throw error;
  }
}
