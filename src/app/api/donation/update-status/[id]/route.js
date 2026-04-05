import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';

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

    const donation = await Donation.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: 'after' }
    );

    if (!donation) {
      return NextResponse.json(
        { success: false, message: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: donation
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
