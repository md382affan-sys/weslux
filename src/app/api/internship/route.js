import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Internship from '@/models/Internship';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const internship = await Internship.create({
      fullName: data.fullName,
      email: data.email,
      university: data.university,
      major: data.major,
      internshipType: data.internshipType,
      skills: data.skills,
      motivation: data.motivation,
      documents: data.documents || []
    });

    return NextResponse.json({
      success: true,
      message: 'Internship application submitted successfully',
      data: internship
    }, { status: 201 });
  } catch (error) {
    console.error('Internship application error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit internship application',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const internships = await Internship.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      internships
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}