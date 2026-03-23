import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// GET - Fetch all news (public)
export async function GET(request) {
  try {
    await connectDB();
    
    const news = await News.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      news
    });
  } catch (error) {
    console.error('Fetch news error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch news', 
      error: error.message 
    }, { status: 500 });
  }
}

// POST - Create news (admin only)
export async function POST(request) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    const news = await News.create(data);

    return NextResponse.json({
      success: true,
      message: 'News created successfully',
      data: news
    }, { status: 201 });
  } catch (error) {
    console.error('Create news error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to create news', 
      error: error.message 
    }, { status: 500 });
  }
}
