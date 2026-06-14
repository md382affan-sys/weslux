import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';
import MentorTraining from '@/models/MentorTraining';

export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the mentor training record
    const mentor = await MentorTraining.findOne({ email });

    if (!mentor) {
      return NextResponse.json(
        { success: false, error: 'No certificate found for this email' },
        { status: 404 }
      );
    }

    // Check if mentor has completed the training
    if (mentor.status !== 'completed' && mentor.certificateEarned !== true) {
      return NextResponse.json(
        { success: false, error: 'Certificate not yet earned. Please complete the training program first.' },
        { status: 400 }
      );
    }

    // Generate certificate ID if not exists
    const certificateId = mentor.certificateId || `WES-MENTOR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    
    // Update certificate ID in database if new
    if (!mentor.certificateId) {
      mentor.certificateId = certificateId;
      await mentor.save();
    }

    const completionDate = mentor.completionDate 
      ? new Date(mentor.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Generate unique certificate link token (valid for 30 days)
    const certificateToken = Buffer.from(`${email}-${certificateId}-${Date.now()}`).toString('base64');

    // Create certificate email template with viewing link
    const certificateEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: white; padding: 30px; border-left: 5px solid #667eea; }
            .certificate-info { background-color: #f0f7ff; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .certificate-info h3 { color: #667eea; margin-top: 0; }
            .button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; text-align: center; }
            .button-secondary { display: inline-block; background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; text-align: center; }
            .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
            .highlight { color: #667eea; font-weight: bold; }
            .success-badge { background-color: #d4edda; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #28a745; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Your WES Certificate</h1>
              <p>Mentorship Training Program</p>
            </div>

            <div class="content">
              <h2>Congratulations, ${mentor.fullName}!</h2>

              <div class="success-badge">
                <strong>✅ Certificate Ready:</strong> Your certificate is ready! You can view and download it anytime.
              </div>

              <p>We are delighted to inform you that you have successfully completed the <span class="highlight">WES Mentorship Training Program</span>.</p>

              <div class="certificate-info">
                <h3>📜 Certificate Details</h3>
                <p><strong>Name:</strong> ${mentor.fullName}</p>
                <p><strong>Certificate ID:</strong> ${certificateId}</p>
                <p><strong>Completion Date:</strong> ${completionDate}</p>
                <p><strong>Program:</strong> WES Mentorship Training Program</p>
                <p><strong>Country:</strong> ${mentor.country || 'N/A'}</p>
                <p><strong>Profession:</strong> ${mentor.profession || 'N/A'}</p>
              </div>

              <p>This certificate represents your commitment to excellence in mentoring and your dedication to making a positive impact on the lives of mentees. You are now part of the WES Mentor Network!</p>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mentor-training/view-certificate?email=${encodeURIComponent(email)}&token=${certificateToken}" class="button">📺 View Your Certificate Online</a>
              </div>

              <div style="background-color: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ffc107;">
                <strong>💡 Tip:</strong> You can download your certificate as a PDF from your certificate page. Share it on LinkedIn to let your network know about your achievement!
              </div>

              <h3>📚 What's Next?</h3>
              <ul>
                <li>✅ Access your mentor dashboard to view available mentees</li>
                <li>✅ Complete your profile with a profile picture and bio</li>
                <li>✅ Get matched with mentees based on your expertise</li>
                <li>✅ Start making a positive difference!</li>
              </ul>

              <h3>🤝 Join Our Mentor Community</h3>
              <p>Connect with other mentors and continue your growth:</p>
              <ul>
                <li>Community Forum - Share experiences and best practices</li>
                <li>Monthly Webinars - Advanced mentoring techniques</li>
                <li>Mentor Peer Support - Connect with fellow mentors</li>
                <li>Advanced Training - Unlock new skills and certifications</li>
              </ul>

              <p style="color: #999; margin-top: 30px; font-size: 14px;">
                Thank you for being part of the WES Mentorship Training Program. Your dedication to mentoring will create lasting impact!
              </p>
            </div>

            <div class="footer">
              <p>WES Mentorship Training Program | Certificate of Completion</p>
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>&copy; 2026 WES. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await sendEmail({
      to: email,
      subject: `🎓 Your WES Mentorship Certificate is Ready!`,
      html: certificateEmailTemplate,
    });

    return NextResponse.json({
      success: true,
      message: 'Certificate sent successfully to your email',
      certificateId: certificateId,
    });
  } catch (error) {
    console.error('Error resending certificate:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
