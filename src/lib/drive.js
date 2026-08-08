import { google } from 'googleapis';

export const maxUploadSize = 100 * 1024 * 1024; // 100MB (client + server enforce this)
export const UPLOAD_CHUNK_SIZE = 2 * 1024 * 1024; // 2MB - small enough to clear Vercel's 4.5MB limit

export const ALLOWED_MIMES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
];

// Build the Drive auth object from env credentials.
// Order of preference:
//   1. OAuth2 refresh token (GDRIVE_CLIENT_ID/SECRET/REFRESH_TOKEN) - works
//      when a real Google account owns the Drive folder.
//   2. Service account key from env var JSON (GOOGLE_SERVICE_ACCOUNT_KEY).
//   3. Service account key file (GOOGLE_SERVICE_ACCOUNT_KEY_PATH) - local dev.
// Never expose credentials to the client.
function getAuth() {
  const scopes = ['https://www.googleapis.com/auth/drive.file'];

  if (
    process.env.GDRIVE_CLIENT_ID &&
    process.env.GDRIVE_CLIENT_SECRET &&
    process.env.GDRIVE_REFRESH_TOKEN
  ) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GDRIVE_CLIENT_ID,
      process.env.GDRIVE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GDRIVE_REFRESH_TOKEN });
    return oauth2Client;
  }

  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    return new google.auth.GoogleAuth({ credentials, scopes });
  }

  return new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
    scopes,
  });
}

export function isDriveConfigured() {
  const hasAuth = Boolean(
    (process.env.GDRIVE_CLIENT_ID &&
      process.env.GDRIVE_CLIENT_SECRET &&
      process.env.GDRIVE_REFRESH_TOKEN) ||
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY ||
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH
  );
  return Boolean(process.env.GOOGLE_DRIVE_FOLDER_ID && hasAuth);
}

export function getDriveClient() {
  return google.drive({ version: 'v3', auth: getAuth() });
}

export async function getAccessToken() {
  const auth = getAuth();
  // OAuth2 client exposes getAccessToken() directly.
  if (auth instanceof google.auth.OAuth2) {
    const { token } = await auth.getAccessToken();
    return token;
  }
  // GoogleAuth wraps a client that exposes getAccessToken().
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  return token;
}

// In-memory store of active resumable upload sessions, keyed by uploadId.
// Vercel keeps warm instances alive, which is enough for the upload flow below.
// Sessions never expose the Google session URI or token to the browser.
const sessions = new Map();

export function setSession(uploadId, data) {
  sessions.set(uploadId, data);
}

export function getSession(uploadId) {
  return sessions.get(uploadId);
}

export function clearSession(uploadId) {
  sessions.delete(uploadId);
}

// Find-or-create a per-user sub-folder inside the main Drive folder, so every
// mentee's video lands in their own space (matches the project concept).
export async function resolveSubFolder(parentFolderId, subFolderName) {
  if (!subFolderName || !parentFolderId) return parentFolderId;

  const drive = getDriveClient();
  const name = String(subFolderName).slice(0, 80);
  const escaped = name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  try {
    const list = await drive.files.list({
      q:
        `name = '${escaped}' and '${parentFolderId}' in parents and ` +
        `mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      pageSize: 1,
      fields: 'files(id)',
    });

    if (list.data.files && list.data.files.length > 0) {
      return list.data.files[0].id;
    }

    const created = await drive.files.create({
      requestBody: {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      },
      fields: 'id',
    });

    return created.data.id;
  } catch (error) {
    // As a safe fallback, upload to the main folder instead of failing.
    console.error('Subfolder creation failed, using main folder:', error.message);
    return parentFolderId;
  }
}

// Start a Google Drive resumable upload and return the session URI + token.
// The token stays on the server - nothing sensitive reaches the browser.
export async function startResumableSession(fileName, mimeType, size, parentFolderId) {
  const token = await getAccessToken();

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Type': mimeType,
        'X-Upload-Content-Length': String(size),
      },
      body: JSON.stringify({ name: fileName, mimeType, parents: [parentFolderId] }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Drive session start failed (${res.status}): ${text}`);
  }

  const uri = res.headers.get('location');
  if (!uri) {
    throw new Error('Drive did not return an upload session URI.');
  }

  return { uri, token };
}

// Forward a single chunk to the Drive resumable session.
// Returns { done: boolean, fileId?, fileLink? }.
export async function uploadChunk({ session, buffer, start, total }) {
  const end = start + buffer.length - 1;

  let token = session.token;
  let res = await putChunk(session.uri, token, buffer, start, end, total);

  // Retry once with a fresh token if the current one expired.
  if (res.status === 401) {
    token = await getAccessToken();
    session.token = token;
    res = await putChunk(session.uri, token, buffer, start, end, total);
  }

  if (res.status === 200 || res.status === 201) {
    const data = await res.json();
    return { done: true, fileId: data.id };
  }

  if (res.status === 308) {
    return { done: false };
  }

  const text = await res.text();
  throw new Error(`Drive chunk upload failed (${res.status}): ${text}`);
}

function putChunk(uri, token, buffer, start, end, total) {
  return fetch(uri, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(buffer.length),
      'Content-Range': `bytes ${start}-${end}/${total}`,
    },
    body: buffer,
  });
}

// Make a file readable by anyone who has the link (used for the mentee intro
// video so admins/mentees can view it without sign-in).
export async function makeFilePublic(fileId) {
  try {
    const drive = getDriveClient();
    await drive.permissions.create({
      fileId,
      requestBody: { role: 'reader', type: 'anyone' },
    });
  } catch (error) {
    console.error('Permission update failed (non-fatal):', error.message);
  }
}

export function uniqueFileName(originalName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dot = originalName.lastIndexOf('.');
  const base = dot > -1 ? originalName.slice(0, dot) : originalName;
  const ext = dot > -1 ? originalName.slice(dot + 1) : 'mp4';
  return `${base}_${timestamp}.${ext}`;
}