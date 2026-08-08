import { NextResponse } from 'next/server';
import crypto from 'crypto';

import {
  maxUploadSize,
  ALLOWED_MIMES,
  isDriveConfigured,
  setSession,
  startResumableSession,
  resolveSubFolder,
  uniqueFileName,
  UPLOAD_CHUNK_SIZE,
} from '@/lib/drive';

export const maxDuration = 300; // 5 minutes

// Starts a Google Drive resumable upload. Only file metadata is sent here -
// never the file itself - so this stays well under Vercel's payload limit.
export async function POST(request) {
  try {
    if (!isDriveConfigured()) {
      return NextResponse.json(
        { ok: false, message: 'Video storage is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const rawName = body.fileName;
    const size = Number(body.size);
    const mimeType = body.fileType;
    const subFolderName = body.subFolderName;

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

    if (!ALLOWED_MIMES.includes(mimeType)) {
      return NextResponse.json(
        { ok: false, message: 'Unsupported file type. Please upload an MP4, MOV, AVI or WebM video.' },
        { status: 400 }
      );
    }

    const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const parentFolderId = await resolveSubFolder(mainFolderId, subFolderName);
    const fileName = uniqueFileName(rawName);

    const { uri, token } = await startResumableSession(fileName, mimeType, size, parentFolderId);

    const uploadId = crypto.randomBytes(16).toString('hex');
    setSession(uploadId, { uri, token, size, fileName });

    return NextResponse.json({
      ok: true,
      uploadId,
      fileName,
      chunkSize: UPLOAD_CHUNK_SIZE,
    });
  } catch (error) {
    console.error('Video init error:', error);
    return NextResponse.json(
      { ok: false, message: 'Could not start the video upload.' },
      { status: 500 }
    );
  }
}