import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET(request) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const currentAdmin = await Admin.findById(decoded.id);
    if (!currentAdmin || currentAdmin.role !== 'super_admin') {
      return NextResponse.json({ 
        message: 'Only super admin can view all admins' 
      }, { status: 403 });
    }

    // Fetch admins without populate first to avoid errors
    const admins = await Admin.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      admins
    });
  } catch (error) {
    console.error('Admin list error:', error);
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
