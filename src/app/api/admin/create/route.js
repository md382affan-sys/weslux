import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// Only super admin can create new admins
export async function POST(request) {
  try {
    await connectDB();
    
    // Verify token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Check if user is super admin
    const superAdmin = await Admin.findById(decoded.id);
    if (!superAdmin || superAdmin.role !== 'super_admin') {
      return NextResponse.json({ 
        message: 'Only super admin can create new admins' 
      }, { status: 403 });
    }

    const { email, password, name } = await request.json();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
      createdBy: superAdmin._id,
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role }
    });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
