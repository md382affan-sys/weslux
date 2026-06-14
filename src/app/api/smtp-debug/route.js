import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request) {
  try {
    console.log('=== SMTP Debug Start ===');
    
    // Log environment variables (without password)
    console.log('Environment Config:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_FROM: process.env.SMTP_FROM,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      PASSWORD_SET: !!process.env.SMTP_PASSWORD,
      PASSWORD_LENGTH: process.env.SMTP_PASSWORD?.length || 0,
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log('Transporter created');

    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection verified successfully');

    return NextResponse.json({
      success: true,
      message: 'SMTP configuration is valid',
      config: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM,
        passwordSet: !!process.env.SMTP_PASSWORD,
        passwordLength: process.env.SMTP_PASSWORD?.length || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('=== SMTP Debug Error ===', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        config: {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          user: process.env.SMTP_USER,
          passwordSet: !!process.env.SMTP_PASSWORD,
          passwordLength: process.env.SMTP_PASSWORD?.length || 0,
        },
      },
      { status: 500 }
    );
  }
}
