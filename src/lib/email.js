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
            <p><strong>Program Interest:</strong> ${data.program}</p>
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
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Program:</strong> ${data.program}</p>
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
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Experience:</strong> ${data.experience}</p>
            <p><strong>Expertise:</strong> ${data.expertise}</p>
            <p><strong>Availability:</strong> ${data.availability}</p>
            <p><strong>LinkedIn:</strong> ${data.linkedin}</p>
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
            <p><strong>Interests:</strong> ${data.interests}</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    })
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
