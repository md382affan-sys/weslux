import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MentorTraining from '@/models/MentorTraining';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const mentor = await MentorTraining.findOne({ email: email.toLowerCase() });

    if (!mentor) {
      return NextResponse.json(
        { success: false, error: 'Mentor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      fullName: mentor.fullName,
      email: mentor.email,
      age: mentor.age,
      country: mentor.country,
      profession: mentor.profession,
      experience: mentor.experience,
      expertise: mentor.expertise,
      whyMentor: mentor.whyMentor,
      linkedin: mentor.linkedin,
      status: mentor.status
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
