'use client';

import { useState, useRef } from 'react';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB - keeps every request under Vercel's 4.5MB limit
const ALLOWED_TYPES = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

export default function VideoUpload({ onVideoUpload, videoUrl, subFolderName }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Please upload an MP4, MOV, AVI or WebM video.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(`File exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.`);
      return false;
    }
    if (file.size <= 0) {
      setError('The selected file is empty.');
      return false;
    }
    setError('');
    return true;
  };

  const uploadFile = async (file) => {
    if (!validateFile(file)) return;

    setFileName(file.name);
    setUploading(true);
    setProgress(0);
    setError('');

    let driveFileId = null;
    let driveLink = null;
    let uploadId = null;
    let sentBytes = 0;

    try {
      // Step 1 - start the resumable session on Google Drive.
      const initRes = await fetch('/api/upload-video/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          size: file.size,
          subFolderName: subFolderName || '',
        }),
      });

      const init = await initRes.json();
      if (!initRes.ok || !init.ok || !init.uploadId) {
        throw new Error(init.message || 'Could not start video upload.');
      }

      uploadId = init.uploadId;

      // Step 2 - send the file piece by piece to /api/upload-video/chunk.
      let start = 0;
      while (start < file.size) {
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const blob = file.slice(start, end);

        const chunkRes = await fetch('/api/upload-video/chunk', {
          method: 'POST',
          headers: {
            'x-upload-id': uploadId,
            'x-chunk-start': String(start),
            'x-total-size': String(file.size),
            'x-is-last-chunk': String(end >= file.size),
          },
          body: blob,
        });

        const chunk = await chunkRes.json();
        if (!chunkRes.ok || !chunk.ok) {
          if (chunk.code === 'SESSION_EXPIRED') {
            throw new Error('Upload session expired. Please try again.');
          }
          throw new Error(chunk.message || 'Upload failed.');
        }

        sentBytes += end - start;
        start = end;
        setProgress(Math.min(100, Math.round((sentBytes / file.size) * 100)));

        if (chunk.done) {
          driveFileId = chunk.fileId;
          driveLink = chunk.fileLink;
          break;
        }
      }

      if (!driveFileId) {
        throw new Error('Upload did not complete. Please try again.');
      }

      setProgress(100);
      onVideoUpload({
        driveFileId,
        driveLink,
        fileName: file.name,
      });
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const resetUpload = () => {
    onVideoUpload(null);
    setFileName('');
    setProgress(0);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label className="block text-xl md:text-2xl font-bold text-gray-900 mb-2">
          📹 Video Introduction (Optional)
        </label>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Upload a short video (Max 100MB) introducing yourself and explaining why you want to join
          our mentorship program. This helps us get to know you better!
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-3 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-pink-500 bg-pink-50 scale-105'
            : 'border-gray-300 bg-gray-50 hover:border-pink-300 hover:bg-pink-50'
        } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />

        {!uploading && !videoUrl && (
          <>
            <div className="text-5xl mb-4">🎥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Drag & Drop your video here
            </h3>
            <p className="text-gray-600 mb-4">or click to select from your device</p>
            <p className="text-sm text-gray-500">
              Supported formats: MP4, MOV, AVI, WebM • Max size: 100MB
            </p>
          </>
        )}

        {uploading && (
          <div className="space-y-6">
            <div className="text-4xl animate-spin">⏳</div>
            <div>
              <p className="text-lg font-bold text-gray-900 mb-2">Uploading to Google Drive...</p>
              <p className="text-sm text-gray-600 mb-4 break-all">{fileName}</p>

              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-300 flex items-center justify-center"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 10 && (
                    <span className="text-white text-xs font-bold">{progress}%</span>
                  )}
                </div>
              </div>

              <p className="text-base font-semibold text-gray-800">{progress}% Complete</p>
            </div>
          </div>
        )}

        {videoUrl && !uploading && (
          <div className="space-y-4">
            <div className="text-4xl">✅</div>
            <div>
              <p className="text-lg font-bold text-green-600 mb-2">Video Uploaded Successfully!</p>
              <p className="text-sm text-gray-600 mb-4 break-all">{fileName}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetUpload();
                }}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all text-sm font-semibold"
              >
                Upload Different Video
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-left">
            <p className="text-sm font-semibold text-red-700">⚠️ {error}</p>
            {!videoUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setError('');
                  fileInputRef.current?.click();
                }}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-semibold"
              >
                Try Again
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>Tip:</strong> A 1-2 minute video works best. Talk naturally about your
          background, goals, and why mentorship is important to you.
        </p>
      </div>
    </div>
  );
}