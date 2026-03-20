import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Ambassador from '@/models/Ambassador';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const ambassador = await Ambassador.create(data);

    return NextResponse.json({
      success: true,
      message: 'Ambassador application submitted successfully',
      data: ambassador
    });
  } catch (error) {
    console.error('Ambassador application error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to submit ambassador application', 
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

    const ambassadors = await Ambassador.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      ambassadors
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
