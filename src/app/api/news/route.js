import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import Admin from '@/models/Admin';
import { sendNewsNotificationEmail } from '@/lib/email';

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

    // Decode token to get admin info
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    await connectDB();
    
    // Get admin details
    const admin = await Admin.findById(decoded.id).select('name email role');
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin not found' },
        { status: 404 }
      );
    }

    const data = await request.json();
    const news = await News.create(data);

    // Send email notification to info@weslux.lu
    try {
      await sendNewsNotificationEmail({
        adminName: admin.name,
        adminEmail: admin.email,
        adminRole: admin.role,
        newsTitle: news.title,
        newsCategory: news.category,
        newsDescription: news.description,
        newsDetails: news.details,
        newsMonth: news.month,
        newsDay: news.day,
        newsStatus: news.status
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

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
