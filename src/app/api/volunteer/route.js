import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Volunteer from '@/models/Volunteer';
import { sendFormEmails } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const volunteer = await Volunteer.create(data);

    // Send emails to user and admin
    await sendFormEmails('volunteer', data);

    return NextResponse.json({
      success: true,
      message: 'Volunteer application submitted successfully',
      data: volunteer
    });
  } catch (error) {
    console.error('Volunteer application error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to submit volunteer application', 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      volunteers
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
