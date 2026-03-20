import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// This route creates the super admin - run once only
export async function GET() {
  try {
    await connectDB();

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: 'super_admin' });
    if (existingSuperAdmin) {
      return NextResponse.json({ 
        message: 'Super admin already exists',
        email: 'info@weslux.lu'
      }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash('Password!@#$thn', 10);

    const superAdmin = await Admin.create({
      email: 'info@weslux.lu',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'super_admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Super admin created successfully',
      admin: { 
        id: superAdmin._id, 
        email: superAdmin.email, 
        name: superAdmin.name,
        role: superAdmin.role 
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
