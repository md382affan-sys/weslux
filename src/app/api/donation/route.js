import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { sendFormEmails } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const donation = await Donation.create(data);

    // Send emails to user and admin
    await sendFormEmails('donation', data);

    return NextResponse.json({
      success: true,
      message: 'Donation submitted successfully',
      data: donation
    });
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to process donation', 
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

    const donations = await Donation.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      donations
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
