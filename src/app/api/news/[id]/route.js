import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// GET - Fetch single news
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const news = await News.findById(id);

    if (!news) {
      return NextResponse.json(
        { success: false, message: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: news
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

// PUT - Update news (admin only)
export async function PUT(request, { params }) {
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
    const { id } = params;
    const data = await request.json();

    const news = await News.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!news) {
      return NextResponse.json(
        { success: false, message: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'News updated successfully',
      data: news
    });
  } catch (error) {
    console.error('Update news error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to update news', 
      error: error.message 
    }, { status: 500 });
  }
}

// DELETE - Delete news (admin only)
export async function DELETE(request, { params }) {
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
    const { id } = params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json(
        { success: false, message: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    console.error('Delete news error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to delete news', 
      error: error.message 
    }, { status: 500 });
  }
}
