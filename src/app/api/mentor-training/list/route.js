import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await connectDB();

    // Check admin authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get all mentor training applications
    const mentorTrainings = await MentorTraining.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      mentorTrainings: mentorTrainings,
      total: mentorTrainings.length,
    });
  } catch (error) {
    console.error('Error fetching mentor training applications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications', error: error.message },
      { status: 500 }
    );
  }
}
