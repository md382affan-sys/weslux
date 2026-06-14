import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();

    const {
      email,
      fullName,
      certificateId,
      completionDate,
    } = await request.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { success: false, error: 'Email and fullName are required' },
        { status: 400 }
      );
    }

    // Create certificate email template
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
            .button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
            .highlight { color: #667eea; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Certificate of Completion</h1>
              <p>WES Mentorship Training Program</p>
            </div>

            <div class="content">
              <h2>Congratulations, ${fullName}!</h2>

              <p>We are delighted to inform you that you have successfully completed the <span class="highlight">WES Mentorship Training Program</span>.</p>

              <div class="certificate-info">
                <h3>📜 Your Certificate Details</h3>
                <p><strong>Certificate ID:</strong> ${certificateId}</p>
                <p><strong>Completion Date:</strong> ${completionDate}</p>
                <p><strong>Program:</strong> WES Mentorship Training Program</p>
              </div>

              <p>This certificate represents your commitment to excellence in mentoring and your dedication to making a positive impact on the lives of mentees. You are now part of the WES Mentor Network!</p>

              <h3>📚 What's Next?</h3>
              <ul>
                <li>Access your mentor dashboard to view available mentees</li>
                <li>Complete your profile with a profile picture and bio</li>
                <li>Get matched with mentees based on your expertise</li>
                <li>Start making a positive difference!</li>
              </ul>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mentor-training/completion" class="button">View Your Certificate</a>
              </p>

              <div style="background-color: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ffc107;">
                <strong>💡 Tip:</strong> You can download your certificate as a PDF from your certificate page. Share it on LinkedIn to let your network know about your achievement!
              </div>

              <h3>🤝 Join Our Community</h3>
              <p>Connect with other mentors, share experiences, and continue your growth:</p>
              <ul>
                <li>Community Forum</li>
                <li>Monthly Webinars</li>
                <li>Mentor Peer Support Groups</li>
                <li>Advanced Training Opportunities</li>
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
      subject: `🎓 Certificate of Completion - WES Mentorship Training Program`,
      html: certificateEmailTemplate,
    });

    return NextResponse.json({
      success: true,
      message: 'Certificate sent successfully',
    });
  } catch (error) {
    console.error('Error sending certificate:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
