import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function DELETE(request, { params }) {
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
        message: 'Only super admin can delete admins' 
      }, { status: 403 });
    }

    const { id } = await params;

    // Prevent deleting super admin
    const adminToDelete = await Admin.findById(id);
    if (!adminToDelete) {
      return NextResponse.json({ 
        message: 'Admin not found' 
      }, { status: 404 });
    }

    if (adminToDelete.role === 'super_admin') {
      return NextResponse.json({ 
        message: 'Cannot delete super admin' 
      }, { status: 403 });
    }

    await Admin.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
