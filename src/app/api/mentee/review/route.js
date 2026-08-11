import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Mentee from '@/models/Mentee';

// PATCH - Save the Application Review feedback for a mentee application (mentors)
export async function PATCH(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, websiteRating, navigationEase, interfaceRating, likedMost, suggestedChanges, additionalFeedback } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing application id.' },
        { status: 400 }
      );
    }

    const mentee = await Mentee.findByIdAndUpdate(
      id,
      {
        websiteRating,
        navigationEase,
        interfaceRating,
        likedMost,
        suggestedChanges,
        additionalFeedback,
      },
      { new: true }
    );

    if (!mentee) {
      return NextResponse.json(
        { success: false, message: 'Application not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      data: mentee
    });
  } catch (error) {
    console.error('Submit review error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit review',
      error: error.message
    }, { status: 500 });
  }
}