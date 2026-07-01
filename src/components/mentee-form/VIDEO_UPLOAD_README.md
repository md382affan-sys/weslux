# Mentee Video Upload Feature

## Overview

The video upload feature allows mentee applicants to upload a short video introduction during the form submission process (Step 4 - Final Validation). Videos are automatically uploaded to Google Drive and linked in the application database.

## Features

✅ **Drag & Drop Support** - Users can drag videos directly onto the upload area
✅ **File Validation** - Checks file type and size before upload
✅ **Progress Tracking** - Real-time percentage display during upload
✅ **Progress Bar** - Visual progress indicator with animated fill
✅ **Error Handling** - Helpful error messages for different failure scenarios
✅ **Google Drive Integration** - Videos stored securely in Google Drive
✅ **Public Sharing** - Uploaded videos are automatically made publicly shareable
✅ **Optional Upload** - Video upload is optional (not required to submit form)
✅ **Multi-Format Support** - MP4, MOV, AVI, and WebM formats supported

## File Specifications

| Property | Value |
|----------|-------|
| Max File Size | 100 MB |
| Allowed Formats | MP4, MOV, AVI, WebM |
| Recommended Duration | 1-2 minutes |
| Recommended Resolution | 720p or higher |

## Component Files

### VideoUpload.js
Main component for video upload UI and functionality.

**Props:**
- `onVideoUpload` (function): Called when video is successfully uploaded with data object
- `videoUrl` (string): URL of the uploaded video (for display purposes)

**Usage:**
```jsx
<VideoUpload 
  onVideoUpload={handleVideoUpload}
  videoUrl={formData.videoIntroduction?.driveLink}
/>
```

### FinalValidation.js (Updated)
Integrated VideoUpload component into the Final Validation step.

### API Endpoint: /api/upload-video

**Method:** POST
**Content-Type:** multipart/form-data

**Request:**
- File upload via FormData with key "file"

**Response on Success:**
```json
{
  "success": true,
  "message": "Video uploaded successfully",
  "fileId": "google_drive_file_id",
  "fileLink": "https://drive.google.com/file/d/FILE_ID/view",
  "fileName": "original_name_timestamp.mp4"
}
```

**Response on Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "detailed error (development only)"
}
```

## Data Flow

1. **User selects video** → Drag/drop or click to browse
2. **File validation** → Check format and size
3. **Upload starts** → Progress tracking begins
4. **API call** → POST to `/api/upload-video`
5. **Google Drive upload** → File stored in configured folder
6. **Permission set** → Video made publicly shareable
7. **Success callback** → `onVideoUpload` called with file data
8. **Form data update** → `videoIntroduction` object stored in formData

## Database Schema

The `Mentee` model includes:

```javascript
videoIntroduction: {
  driveFileId: String,      // Google Drive file ID
  driveLink: String,         // Public shareable URL
  fileName: String,          // Original filename with timestamp
  uploadedAt: Date           // Upload timestamp
}
```

## Environment Variables Required

```env
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./google-service-account-key.json
```

For detailed setup instructions, see [GOOGLE_DRIVE_SETUP.md](../../../GOOGLE_DRIVE_SETUP.md)

## Error Scenarios Handled

| Error | Message |
|-------|---------|
| Invalid file format | "Invalid file format. Please upload MP4, MOV, AVI, or WebM video files." |
| File too large | "File size exceeds 100MB limit. Your file is X MB." |
| No file provided | "No file provided" |
| Network error | "Network error during upload" |
| Invalid credentials | "Google Drive credentials are invalid. Please contact support." |
| Permission denied | "Permission denied. The server cannot access Google Drive." |
| Timeout | "Upload timed out. Please try again with a smaller file." |

## Accessibility Features

- 🎯 ARIA labels on interactive elements
- ⌨️ Full keyboard navigation support
- 📱 Responsive design (mobile, tablet, desktop)
- 👁️ High contrast error messages
- ♿ Screen reader friendly

## Performance Considerations

- **Progressive upload** - File uploaded in chunks via XMLHttpRequest
- **Real-time progress** - Updates every chunk received
- **No page reload** - Async upload doesn't block form
- **Error recovery** - Can retry upload without form reset
- **Memory efficient** - Files streamed to Google Drive

## Styling

The component uses:
- **Tailwind CSS** for styling
- **Gradient backgrounds** matching the form theme
- **Smooth transitions** for interactive elements
- **Responsive grid layout** for different screen sizes

### Theme Colors
- Primary: Pink/Purple gradient
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Background: Gradient (blue → purple → pink)

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Testing

To test the video upload feature:

1. Navigate to mentee form
2. Complete Steps 1-3 (Category Selection, Profile, Category Questions)
3. On Step 4 (Final Validation), find the "Video Introduction" section
4. Select a test video file (or drag & drop)
5. Watch the progress percentage update
6. After successful upload, verify:
   - Success message appears
   - Video appears in Google Drive folder
   - File is publicly shareable
   - Video data is included in form submission

## Troubleshooting

### Progress bar doesn't show percentage
- Check browser console for errors
- Verify XMLHttpRequest is supported (all modern browsers)
- Try a smaller test file first

### Upload fails with 500 error
- Verify Google Drive credentials in environment variables
- Check service account has Editor access to folder
- Ensure API is enabled in Google Cloud Console

### Video doesn't appear in Google Drive
- Confirm `GOOGLE_DRIVE_FOLDER_ID` is correct
- Check if folder is shared with service account email
- Verify quota is not exceeded

### Upload progress stuck
- Check network connection
- Try uploading again
- Contact support if issue persists

## Future Enhancements

Potential improvements:
- [ ] Video preview/thumbnail before upload
- [ ] Multiple video uploads
- [ ] Video duration validation
- [ ] Automatic video compression
- [ ] Resume interrupted uploads
- [ ] Support for more video formats
- [ ] Video quality presets

## Support & Documentation

- Full setup guide: [GOOGLE_DRIVE_SETUP.md](../../../GOOGLE_DRIVE_SETUP.md)
- Environment variables: [.env.example](../../../.env.example)
- Mentee model schema: [src/models/Mentee.js](../../../src/models/Mentee.js)
