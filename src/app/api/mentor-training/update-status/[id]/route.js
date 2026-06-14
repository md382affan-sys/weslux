import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';
import jwt from 'jsonwebtoken';

export async function PATCH(request, { params }) {
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

    const { id } = await params;
    const { status, statusNote } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      );
    }

    const updatedMentorTraining = await MentorTraining.findByIdAndUpdate(
      id,
      { 
        status,
        statusNote: statusNote || ''
      },
      { returnDocument: 'after', new: true }
    );

    if (!updatedMentorTraining) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMentorTraining,
      message: 'Status updated successfully'
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update status', error: error.message },
      { status: 500 }
    );
  }
}
