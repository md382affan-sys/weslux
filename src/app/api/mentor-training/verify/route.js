import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';
import { sendEmail } from '@/lib/email';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing verification token or email' },
        { status: 400 }
      );
    }

    // Find application with matching token and email
    const mentorTraining = await MentorTraining.findOne({
      email,
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }, // Token not expired
    });

    if (!mentorTraining) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Mark as verified
    mentorTraining.emailVerified = true;
    mentorTraining.status = 'verified';
    mentorTraining.verificationToken = undefined;
    mentorTraining.verificationTokenExpiry = undefined;

    await mentorTraining.save();

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Email Verified - WES Mentorship Training Course',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">✓ Email Verified</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 30px;">
            <h3 style="color: #1f2937; margin-bottom: 15px;">Welcome to WES Mentorship Training!</h3>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Your email has been successfully verified. Your application is now under review by our team.
            </p>
            
            <div style="background: white; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
              <p style="color: #1f2937; margin: 0;"><strong>What happens next:</strong></p>
              <ul style="color: #4b5563; margin: 10px 0 0 0; padding-left: 20px;">
                <li>Our team will review your application (24-48 hours)</li>
                <li>You'll receive an approval email with course access details</li>
                <li>Start your mentorship training immediately</li>
                <li>Get certified upon completion</li>
              </ul>
            </div>
            
            <p style="color: #6b7280; font-size: 13px;">
              If you have any questions, feel free to reach out to us at <strong>info@weslux.lu</strong>
            </p>
          </div>
          
          <div style="background: #1f2937; color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">WES Luxembourg for Education</p>
            <p style="margin: 5px 0 0 0;">info@weslux.lu | www.weslux.lu</p>
          </div>
        </div>
      `,
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'Mentor Training Application - Email Verified',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>✓ Email Verified for Mentor Training Application</h3>
          <p><strong>Name:</strong> ${mentorTraining.fullName}</p>
          <p><strong>Email:</strong> ${mentorTraining.email}</p>
          <p><strong>Status:</strong> Verified - Awaiting Approval</p>
          <p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://weslux.lu'}/admin/mentor-training" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Review Application</a></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! Your application is now under review.',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Email verification failed', error: error.message },
      { status: 500 }
    );
  }
}
