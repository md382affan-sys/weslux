import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const superAdmin = await Admin.findById(decoded.id);
    if (!superAdmin || superAdmin.role !== 'super_admin') {
      return NextResponse.json({ 
        message: 'Only super admin can update admins' 
      }, { status: 403 });
    }

    const { id } = await params;
    const { name, email, password } = await request.json();

    // Prevent updating super admin
    const adminToUpdate = await Admin.findById(id);
    if (!adminToUpdate) {
      return NextResponse.json({ 
        message: 'Admin not found' 
      }, { status: 404 });
    }

    if (adminToUpdate.role === 'super_admin') {
      return NextResponse.json({ 
        message: 'Cannot update super admin through this route' 
      }, { status: 403 });
    }

    const updateData = { name, email };
    
    // Only update password if provided
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'Admin updated successfully',
      admin: updatedAdmin
    });
  } catch (error) {
    console.error('Update admin error:', error);
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
