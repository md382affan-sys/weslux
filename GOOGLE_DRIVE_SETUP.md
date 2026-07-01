# Google Drive Integration Setup Guide

This guide will help you set up Google Drive integration for video uploads in the mentee form.

## Prerequisites
- Google Cloud Project with Google Drive API enabled
- Service Account created with Google Drive API access
- A Google Drive folder where videos will be stored

## Step-by-Step Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name (e.g., "WESLUX Mentee Videos")
4. Click "Create"

### 2. Enable Google Drive API
1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### 3. Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in:
   - Service account name: `weslux-mentee-videos`
   - Service account ID: (auto-filled)
   - Description: "For uploading mentee videos to Google Drive"
4. Click "Create and Continue"
5. Grant Editor role (for Drive access)
6. Click "Continue" and then "Done"

### 4. Create and Download Service Account Key
1. In "Credentials" page, find your service account
2. Click on it to open details
3. Go to "Keys" tab
4. Click "Add Key" → "Create new key"
5. Choose "JSON" format
6. Click "Create" - this downloads the key file
7. **Keep this file safe!** - It contains your credentials

### 5. Create Google Drive Folder
1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder named "Mentee Videos"
3. Right-click the folder → "Share"
4. Share it with your service account email (looks like: `weslux-mentee-videos@PROJECT_ID.iam.gserviceaccount.com`)
5. Grant "Editor" permissions
6. Copy the Folder ID from the URL:
   - URL format: `https://drive.google.com/drive/folders/FOLDER_ID`
   - Copy the `FOLDER_ID` part

### 6. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./google-service-account-key.json
```

**Alternative: If using Environment Variables Instead of File**

If you prefer to store the entire JSON key as an environment variable:

1. In `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` or create a new variable:
```env
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

2. Update `src/app/api/upload-video/route.js` to parse it if needed.

### 7. Store Service Account Key File
1. Move the downloaded JSON file to your project root
2. Rename it to: `google-service-account-key.json`
3. **Important:** Add to `.gitignore`:
   ```
   google-service-account-key.json
   ```

### 8. Install Required Packages

The project needs the Google API client. Install if not already present:

```bash
npm install googleapis
```

## Testing the Setup

1. Try uploading a test video through the mentee form
2. Check your Google Drive folder - the video should appear there
3. The video should be publicly shareable (link-only access)

## Troubleshooting

### "Google Drive configuration is missing"
- Check if `.env.local` has `GOOGLE_DRIVE_FOLDER_ID`
- Verify `google-service-account-key.json` exists in project root
- Ensure `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` points to correct location

### "Invalid Credentials"
- Check if service account key is valid
- Ensure service account has access to the Drive folder
- Verify folder is shared with the service account email

### "Permission denied"
- Service account might not have Editor role
- Check folder sharing settings with service account email
- Verify API is enabled in Google Cloud Console

### File upload times out
- This might happen with very large files (>100MB)
- Current limit is 100MB, which should handle most use cases
- Increase timeout in Next.js config if needed

## Folder Structure

Your Google Drive "Mentee Videos" folder will contain files named like:
```
john_doe_video_2024-01-15T10-30-45-123Z.mp4
jane_smith_introduction_2024-01-15T10-31-20-456Z.mp4
```

Each file is:
- ✅ Automatically timestamped (prevents duplicates)
- ✅ Publicly viewable (shareable link)
- ✅ Stored in your organized Drive folder

## Security Notes

1. **Never commit credentials**: Service account key is in `.gitignore`
2. **Limit permissions**: Service account only has Drive access
3. **Folder isolation**: Use separate folder for this project
4. **Delete old videos**: Regularly clean up old uploads from Drive
5. **Monitor quota**: Google Drive has storage limits

## Support

If you encounter issues:
1. Check Google Cloud Console logs
2. Verify all environment variables are set
3. Ensure service account email is in Drive folder sharing
4. Test with small video files first (5-10MB)
