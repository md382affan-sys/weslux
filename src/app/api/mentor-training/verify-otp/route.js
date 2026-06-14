import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();

    const { email, otp } = await request.json();

    // Validation
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Find the mentor training application
    const mentorTraining = await MentorTraining.findOne({ email: email.toLowerCase() });

    if (!mentorTraining) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (mentorTraining.emailVerified) {
      return NextResponse.json(
        { success: false, message: 'Email already verified' },
        { status: 400 }
      );
    }

    // Check OTP expiry
    if (!mentorTraining.otpExpiry || new Date() > mentorTraining.otpExpiry) {
      return NextResponse.json(
        { success: false, message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check OTP attempts (max 5 attempts)
    if (mentorTraining.otpAttempts >= 5) {
      return NextResponse.json(
        { success: false, message: 'Too many failed attempts. Please request a new OTP.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (mentorTraining.otp !== otp) {
      // Increment failed attempt count
      await MentorTraining.updateOne(
        { _id: mentorTraining._id },
        { $inc: { otpAttempts: 1 } },
        { new: true }
      );

      const remainingAttempts = 5 - (mentorTraining.otpAttempts + 1);
      return NextResponse.json(
        { 
          success: false, 
          message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
          attemptsRemaining: remainingAttempts
        },
        { status: 400 }
      );
    }

    // OTP is correct - mark as verified
    mentorTraining.emailVerified = true;
    mentorTraining.status = 'verified';
    mentorTraining.otp = undefined;
    mentorTraining.otpExpiry = undefined;
    mentorTraining.otpAttempts = 0;

    await mentorTraining.save();

    // Send confirmation email
    await sendEmail(email, 'Email Verified - WES Mentorship Training Course', `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">WES Mentorship Training</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="display: inline-block; background: #10b981; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px;">
                ✓
              </div>
            </div>
            
            <h3 style="color: #1f2937; margin-bottom: 15px; text-align: center;">Email Verified Successfully!</h3>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px; text-align: center;">
              Your email has been verified. Thank you, ${mentorTraining.fullName}!
            </p>
            
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
              <p style="color: #1e40af; margin: 0; font-size: 14px;">
                <strong>What happens next?</strong> Our team will review your application and contact you within 24-48 hours. Keep an eye on your inbox!
              </p>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <h4 style="color: #1f2937; margin-bottom: 10px;">Your Training Includes:</h4>
              <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>4-8 weeks of comprehensive mentorship training</li>
                <li>Self-paced learning modules</li>
                <li>Certificate of completion</li>
                <li>Ongoing support and resources</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #1f2937; color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">WES Luxembourg for Education</p>
            <p style="margin: 5px 0 0 0;">info@weslux.lu | www.weslux.lu</p>
          </div>
        </div>
      `);

    // Send admin notification
    await sendEmail(process.env.ADMIN_EMAIL, 'Mentor Training Application - Email Verified', `
        <div style="font-family: Arial, sans-serif;">
          <h3>Mentor Training Application - Email Verified</h3>
          <p><strong>Name:</strong> ${mentorTraining.fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✓ Verified</span></p>
          <p style="margin-top: 20px; color: #6b7280;">The applicant's email has been verified. Please review their application and approve/reject as needed.</p>
        </div>
      `);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! Our team will review your application shortly.',
      mentorTraining: {
        fullName: mentorTraining.fullName,
        email: mentorTraining.email,
        emailVerified: mentorTraining.emailVerified,
        status: mentorTraining.status,
      },
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify OTP', error: error.message },
      { status: 500 }
    );
  }
}

// Resend OTP endpoint
export async function PUT(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const mentorTraining = await MentorTraining.findOne({ email: email.toLowerCase() });

    if (!mentorTraining) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    if (mentorTraining.emailVerified) {
      return NextResponse.json(
        { success: false, message: 'Email already verified' },
        { status: 400 }
      );
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update with new OTP and reset attempts
    mentorTraining.otp = newOtp;
    mentorTraining.otpExpiry = newOtpExpiry;
    mentorTraining.otpAttempts = 0;

    await mentorTraining.save();

    // Send new OTP email
    await sendEmail(email, 'Your New OTP - WES Mentorship Training Course', `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">WES Mentorship Training</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">New OTP Code</h3>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Here is your new verification code:
            </p>
            
            <div style="background: #fff; border: 2px dashed #f59e0b; padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 8px;">
              <p style="margin: 0; color: #1f2937; font-size: 32px; font-weight: bold; letter-spacing: 4px;">
                ${newOtp}
              </p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              This code will expire in 10 minutes. Do not share this code with anyone.
            </p>
          </div>
          
          <div style="background: #1f2937; color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">WES Luxembourg for Education</p>
            <p style="margin: 5px 0 0 0;">info@weslux.lu | www.weslux.lu</p>
          </div>
        </div>
      `);

    return NextResponse.json({
      success: true,
      message: 'New OTP sent to your email',
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to resend OTP', error: error.message },
      { status: 500 }
    );
  }
}
