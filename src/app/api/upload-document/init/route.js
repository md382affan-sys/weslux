import { NextResponse } from 'next/server';
import crypto from 'crypto';

import {
  maxUploadSize,
  DOC_ALLOWED_MIMES,
  isDriveConfigured,
  setSession,
  startResumableSession,
  uniqueFileName,
  UPLOAD_CHUNK_SIZE,
} from '@/lib/drive';

export const maxDuration = 300; // 5 minutes

// Starts a Google Drive resumable upload for a form document. Only file
// metadata is sent here - the file itself ships later in chunks.
export async function POST(request) {
  try {
    if (!isDriveConfigured()) {
      return NextResponse.json(
        { ok: false, message: 'Document storage is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const rawName = body.fileName;
    const size = Number(body.size);
    const mimeType = body.fileType;

    if (!rawName || !Number.isFinite(size) || size <= 0) {
      return NextResponse.json(
        { ok: false, message: 'Missing file information.' },
        { status: 400 }
      );
    }

    if (size > maxUploadSize) {
      return NextResponse.json(
        { ok: false, message: `File exceeds ${Math.round(maxUploadSize / 1024 / 1024)}MB limit.` },
        { status: 400 }
      );
    }

    if (!DOC_ALLOWED_MIMES.includes(mimeType)) {
      return NextResponse.json(
        { ok: false, message: 'Unsupported file type. Please upload a PDF, DOC or DOCX.' },
        { status: 400 }
      );
    }

    const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const fileName = uniqueFileName(rawName);

    const { uri, token } = await startResumableSession(fileName, mimeType, size, mainFolderId);

    const uploadId = crypto.randomBytes(16).toString('hex');
    setSession(uploadId, { uri, token, size, fileName });

    return NextResponse.json({
      ok: true,
      uploadId,
      fileName,
      chunkSize: UPLOAD_CHUNK_SIZE,
    });
  } catch (error) {
    console.error('Document init error:', error);
    return NextResponse.json(
      { ok: false, message: 'Could not start the document upload.' },
      { status: 500 }
    );
  }
}