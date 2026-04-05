import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Volunteer from '@/models/Volunteer';

export async function PATCH(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const { id } = await params;
    const { status, statusNote } = await request.json();

    const updateData = { status };
    if (status === 'other' && statusNote) {
      updateData.statusNote = statusNote;
    } else if (status !== 'other') {
      updateData.statusNote = '';
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: 'after' }
    );

    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: 'Volunteer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: volunteer
    });
  } catch (error) {
    console.error('Update status error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to update status', 
      error: error.message 
    }, { status: 500 });
  }
}
