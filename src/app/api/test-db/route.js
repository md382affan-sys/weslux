import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    await connectDB();
    
    console.log('MongoDB connected successfully!');
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connected successfully!' 
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'MongoDB connection failed', 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
