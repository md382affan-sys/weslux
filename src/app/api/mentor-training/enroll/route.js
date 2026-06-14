import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();

    const {
      fullName,
      email,
      age,
      country,
      profession,
      experience,
      expertise,
      whyMentor,
      linkedin,
    } = await request.json();

    // Validation
    if (!fullName || !email || !age || !country || !profession || !experience || !expertise || !whyMentor) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingApplication = await MentorTraining.findOne({ email });
    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: 'Email already registered for mentor training' },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Create mentor training application
    const mentorTraining = new MentorTraining({
      fullName,
      email,
      age,
      country,
      profession,
      experience,
      expertise,
      whyMentor,
      linkedin,
      otp,
      otpExpiry,
    });

    await mentorTraining.save();

    console.log('OTP Generated:', otp);
    console.log('Sending OTP to:', email);
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM
    });

    // Send OTP email
    const emailResult = await sendEmail(email, 'Your OTP for WES Mentorship Training Course - Verify Email', `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">WES Mentorship Training</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">Welcome, ${fullName}!</h3>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Thank you for enrolling in the WES Mentorship Training Course. We're excited to have you on board!
            </p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              To verify your email address, please use the following OTP code:
            </p>
            
            <div style="background: #fff; border: 2px dashed #f59e0b; padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 8px;">
              <p style="margin: 0; color: #1f2937; font-size: 32px; font-weight: bold; letter-spacing: 4px;">
                ${otp}
              </p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              This code will expire in 10 minutes. Do not share this code with anyone.
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <h4 style="color: #1f2937; margin-bottom: 10px;">What's Next?</h4>
              <ol style="color: #4b5563; line-height: 1.8;">
                <li>Enter the OTP code on the verification page</li>
                <li>Our team will review your application</li>
                <li>You'll receive confirmation within 24-48 hours</li>
                <li>Access your training materials and start learning</li>
              </ol>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                <strong>Note:</strong> This code will expire in 10 minutes. If it expires, you can request a new one.
              </p>
            </div>
          </div>
          
          <div style="background: #1f2937; color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">WES Luxembourg for Education</p>
            <p style="margin: 5px 0 0 0;">info@weslux.lu | www.weslux.lu</p>
          </div>
        </div>
      `);

    // Also send notification to admin
    await sendEmail(process.env.ADMIN_EMAIL, 'New Mentor Training Application - Email Verification Pending', `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Mentor Training Application</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Profession:</strong> ${profession}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Expertise:</strong> ${expertise}</p>
          <p><strong>Why Mentor:</strong> ${whyMentor}</p>
          ${linkedin ? `<p><strong>LinkedIn:</strong> ${linkedin}</p>` : ''}
          <p style="color: #f59e0b;"><strong>Status:</strong> Waiting for email verification</p>
        </div>
      `);

    return NextResponse.json({
      success: true,
      message: 'Application submitted! OTP sent to your email. Please verify your email to proceed.',
      email: email,
    });
  } catch (error) {
    console.error('Mentor training enrollment error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application', error: error.message },
      { status: 500 }
    );
  }
}
