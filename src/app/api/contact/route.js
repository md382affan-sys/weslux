import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { sendFormEmails } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const contact = await Contact.create(data);

    // Send emails to user and admin
    await sendFormEmails('contact', data);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to submit contact form', 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      contacts
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Server error', 
      error: error.message 
    }, { status: 500 });
  }
}
