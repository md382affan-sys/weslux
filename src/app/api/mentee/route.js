import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentee from '@/models/Mentee';
import { sendFormEmails } from '@/lib/email';

// GET - Fetch all mentee applications (admin only)
export async function GET(request) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const mentees = await Mentee.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      mentees
    });
  } catch (error) {
    console.error('Fetch mentees error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch mentee applications', 
      error: error.message 
    }, { status: 500 });
  }
}

// POST - Submit mentee application (public)
export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const mentee = await Mentee.create(data);

    // Send confirmation emails
    try {
      await sendFormEmails('mentee', data);
    } catch (emailError) {
      console.error('Failed to send emails:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Mentee application submitted successfully',
      data: mentee
    }, { status: 201 });
  } catch (error) {
    console.error('Submit mentee application error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to submit application', 
      error: error.message 
    }, { status: 500 });
  }
}
