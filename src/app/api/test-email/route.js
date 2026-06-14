import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Test SMTP connection
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM,
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

    // Send test email
    const info = await transporter.sendMail({
      from: `"WES Luxembourg" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Test Email - WES Mentor Training',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 20px; text-align: center; border-radius: 8px;">
            <h2 style="margin: 0;">Test Email from WES Luxembourg</h2>
          </div>
          <div style="background: #f9fafb; padding: 30px;">
            <h3 style="color: #1f2937;">Email Configuration Test</h3>
            <p style="color: #4b5563; line-height: 1.6;">
              If you received this email, SMTP is working correctly!
            </p>
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #1e40af; margin: 0; font-size: 14px;">
                <strong>✓ SMTP Configuration:</strong> Active and working
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId,
      to: email,
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send test email',
        error: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
