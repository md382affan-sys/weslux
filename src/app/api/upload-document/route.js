import { Readable } from 'stream';
import { NextResponse } from 'next/server';

import {
  maxUploadSize,
  DOC_ALLOWED_MIMES,
  isDriveConfigured,
  getDriveClient,
  makeFilePublic,
  uniqueFileName,
} from '@/lib/drive';

export const maxDuration = 300; // 5 minutes

// Single-request upload for form documents (PDF/DOC) that fit within Vercel's
// ~4.5MB body limit. Larger files should use init + chunk instead.
export async function POST(request) {
  try {
    if (!isDriveConfigured()) {
      return NextResponse.json(
        { ok: false, message: 'Document storage is not configured.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { ok: false, message: 'No file received.' },
        { status: 400 }
      );
    }

    if (file.size > maxUploadSize) {
      return NextResponse.json(
        { ok: false, message: `File exceeds ${Math.round(maxUploadSize / 1024 / 1024)}MB limit.` },
        { status: 400 }
      );
    }

    if (!DOC_ALLOWED_MIMES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, message: 'Unsupported file type. Please upload a PDF, DOC or DOCX.' },
        { status: 400 }
      );
    }

    const drive = getDriveClient();
    const bytes = new Uint8Array(await file.arrayBuffer());

    const response = await drive.files.create(
      {
        requestBody: {
          name: uniqueFileName(file.name),
          parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
          mimeType: file.type,
        },
        media: {
          mimeType: file.type,
          body: Readable.from(bytes),
        },
      },
      { maxContentLength: Infinity, timeout: 300000 }
    );

    const fileId = response.data.id;
    await makeFilePublic(fileId);

    return NextResponse.json({
      ok: true,
      fileId,
      fileLink: `https://drive.google.com/file/d/${fileId}/view`,
    });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { ok: false, message: 'Document upload failed.' },
      { status: 500 }
    );
  }
}