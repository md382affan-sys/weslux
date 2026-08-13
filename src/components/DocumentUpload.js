'use client';

import { useState, useRef } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB total
const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB - keeps every request under Vercel's 4.5MB limit
const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function DocumentUpload({ documents, onDocumentsChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingName, setUploadingName] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file, currentTotalBytes) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Please upload a PDF, DOC or DOCX file.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(`File exceeds ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB per-file limit.`);
      return false;
    }
    if (file.size + currentTotalBytes > MAX_TOTAL_SIZE) {
      setError(`Total upload cannot exceed ${Math.round(MAX_TOTAL_SIZE / 1024 / 1024)}MB.`);
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
    const currentTotalBytes = (documents || []).reduce((sum, d) => sum + (d.sizeBytes || 0), 0)
      + (Array.from(fileInputRef.current?.files || []).filter(f => f !== file).reduce((sum, f) => sum + f.size, 0));

    if (!validateFile(file, currentTotalBytes)) return;

    setUploading(true);
    setUploadingName(file.name);
    setProgress(0);
    setError('');

    let driveFileId = null;
    let driveLink = null;
    let uploadId = null;
    let sentBytes = 0;

    try {
      const initRes = await fetch('/api/upload-document/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          size: file.size,
        }),
      });

      const init = await initRes.json();
      if (!initRes.ok || !init.ok || !init.uploadId) {
        throw new Error(init.message || 'Could not start upload.');
      }

      uploadId = init.uploadId;

      let start = 0;
      while (start < file.size) {
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const blob = file.slice(start, end);

        const chunkRes = await fetch('/api/upload-document/chunk', {
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
      onDocumentsChange([
        ...(documents || []),
        {
          driveFileId,
          driveLink,
          fileName: file.name,
          sizeBytes: file.size,
          uploadedAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadingName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    const pending = files.filter(f => !(documents || []).some(d => d.fileName === f.name));
    if (pending.length === 0) return;

    const sequentialUpload = async () => {
      for (const file of pending) {
        setUploadingName(file.name);
        await uploadFile(file);
        if (error) break;
      }
    };
    sequentialUpload();
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
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const removeDocument = (index) => {
    const next = [...(documents || [])];
    next.splice(index, 1);
    onDocumentsChange(next);
  };

  const totalSize = (documents || []).reduce((sum, d) => sum + (d.sizeBytes || 0), 0);

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 cursor-pointer ${
          isDragging
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-green-500'
        } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          disabled={uploading}
          multiple
          className="hidden"
        />

        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p className="text-gray-600 mb-2">Drag &amp; drop your documents here</p>
        <p className="text-gray-500 text-sm mb-4">or</p>
        <span className="inline-block px-6 py-2 bg-green-100 text-green-600 font-medium rounded-lg hover:bg-green-200 transition-colors duration-300">
          Browse Files
        </span>
        <p className="text-gray-500 text-sm mt-4">
          PDF, DOC, DOCX • Max {Math.round(MAX_TOTAL_SIZE / 1024 / 1024)}MB total
        </p>
      </div>

      {uploading && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-green-700 break-all">Uploading to Google Drive... {uploadingName}</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm font-semibold text-gray-700">{progress}%</p>
        </div>
      )}

      {documents && documents.length > 0 && (
        <ul className="space-y-2">
          {documents.map((doc, index) => (
            <li key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-green-600">✅</span>
                <a
                  href={doc.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-800 hover:underline truncate"
                >
                  {doc.fileName}
                </a>
                <span className="text-xs text-gray-500 shrink-0">
                  {Math.round((doc.sizeBytes || 0) / 1024)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeDocument(index);
                }}
                className="text-red-500 hover:text-red-700 text-sm font-semibold shrink-0 ml-3"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {documents && documents.length > 0 && (
        <p className="text-xs text-gray-500">
          {documents.length} file(s) uploaded • {Math.round(totalSize / 1024)} KB / {Math.round(MAX_TOTAL_SIZE / 1024 / 1024)}MB
        </p>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-700">⚠️ {error}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setError('');
              fileInputRef.current?.click();
            }}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-semibold"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}