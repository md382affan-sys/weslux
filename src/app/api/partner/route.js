import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Partner from '@/models/Partner';
import { sendFormEmails } from '@/lib/email';

// POST - Create new partner application
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { fullName, organization, email, phone, organizationType, partnerCategory, interests, message } = body;

    // Validation
    if (!fullName || !organization || !email || !phone || !organizationType || !partnerCategory) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Create new partner application
    const partner = await Partner.create({
      fullName,
      organization,
      email,
      phone,
      organizationType,
      partnerCategory,
      interests: interests || [],
      message: message || ''
    });

    // Send emails to user and admin
    await sendFormEmails('partner', body);

    return NextResponse.json(
      { success: true, message: 'Partner application submitted successfully', data: partner },
      { status: 201 }
    );
  } catch (error) {
    console.error('Partner application error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit partner application' },
      { status: 500 }
    );
  }
}

// GET - Fetch all partner applications (for admin)
export async function GET(request) {
  try {
    // Check for authorization token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const partners = await Partner.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: partners },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch partners error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch partner applications' },
      { status: 500 }
    );
  }
}
