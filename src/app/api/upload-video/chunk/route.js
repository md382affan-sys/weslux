import { NextResponse } from 'next/server';

import {
  getSession,
  setSession,
  clearSession,
  uploadChunk,
  makeFilePublic,
} from '@/lib/drive';

export const maxDuration = 300; // 5 minutes

// Receives one 2MB chunk (raw binary body) and forwards it to the Drive
// resumable session started in /api/upload-video/init.
export async function POST(request) {
  const uploadId = request.headers.get('x-upload-id');
  const startText = request.headers.get('x-chunk-start');
  const totalText = request.headers.get('x-total-size');
  const isLast = request.headers.get('x-is-last-chunk') === 'true';

  if (!uploadId || startText === null || !totalText) {
    return NextResponse.json(
      { ok: false, message: 'Missing upload headers.' },
      { status: 400 }
    );
  }

  const session = getSession(uploadId);
  if (!session) {
    return NextResponse.json(
      {
        ok: false,
        code: 'SESSION_EXPIRED',
        message: 'Upload session expired. Please try again.',
      },
      { status: 400 }
    );
  }

  const start = Number(startText);
  const total = Number(totalText);

  try {
    const buffer = Buffer.from(await request.arrayBuffer());

    const result = await uploadChunk({ session, buffer, start, total });

    if (result.done) {
      clearSession(uploadId);
      await makeFilePublic(result.fileId);
      const fileLink = `https://drive.google.com/file/d/${result.fileId}/view`;
      return NextResponse.json({
        ok: true,
        done: true,
        fileId: result.fileId,
        fileLink,
        fileName: session.fileName,
      });
    }

    // Still more chunks to send - update stored file name for final response.
    if (isLast) {
      setSession(uploadId, { ...session, _lastChunkAt: Date.now() });
    }

    return NextResponse.json({ ok: true, done: false });
  } catch (error) {
    console.error('Video chunk error:', error);
    return NextResponse.json(
      { ok: false, message: 'Upload chunk failed.' },
      { status: 500 }
    );
  }
}