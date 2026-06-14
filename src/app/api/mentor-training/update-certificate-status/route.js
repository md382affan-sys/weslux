import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';

export async function POST(request) {
  try {
    await connectDB();

    const {
      email,
      certificateEarned,
      finalQuizScore,
      overallScore,
    } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate unique certificate ID
    const certificateId = `WES-MENTOR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // Update mentor training record
    const updatedMentor = await MentorTraining.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        certificateEarned: certificateEarned || false,
        certificateId: certificateId,
        finalQuizScore: finalQuizScore || 0,
        allQuizScores: {
          finalQuiz: finalQuizScore || 0,
        },
        status: certificateEarned ? 'completed' : 'verified',
        completionDate: certificateEarned ? new Date() : null,
      },
      { returnDocument: 'after', new: true }
    );

    if (!updatedMentor) {
      return NextResponse.json(
        { success: false, error: 'Mentor training record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMentor,
      message: 'Certificate status updated successfully',
    });
  } catch (error) {
    console.error('Error updating certificate status:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
