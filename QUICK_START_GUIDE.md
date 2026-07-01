# Video Upload Feature - Quick Start Guide

## ⚡ 5-Minute Setup

### 1️⃣ Google Cloud Project (2 minutes)
```
1. Go to https://console.cloud.google.com/
2. Create new project "WESLUX Mentee Videos"
3. Go to APIs & Services → Library
4. Search & enable "Google Drive API"
```

### 2️⃣ Service Account (2 minutes)
```
1. APIs & Services → Credentials
2. Create Credentials → Service Account
3. Name: weslux-mentee-videos
4. Grant Editor role
5. Go to Keys tab → Add Key → JSON
6. Download the JSON file
```

### 3️⃣ Google Drive Folder (30 seconds)
```
1. Go to https://drive.google.com/
2. Create folder: "Mentee Videos"
3. Right-click → Share
4. Share with service account email (from JSON file)
5. Copy folder ID from URL
```

### 4️⃣ Environment Variables (30 seconds)
Create `.env.local` in project root:
```env
GOOGLE_DRIVE_FOLDER_ID=paste_folder_id_here
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./google-service-account-key.json
```

### 5️⃣ Add Credentials File (1 minute)
```
1. Move JSON file to project root
2. Rename to: google-service-account-key.json
3. Add to .gitignore
4. ✅ Done!
```

## 🧪 Test It

```bash
# Start dev server
npm run dev

# Open in browser
http://localhost:3000/join-us/mentee-form

# Complete form through Step 4
# Upload a test video
# Watch progress percentage update
# ✅ Check Google Drive for video
```

## 📊 What You Get

✅ **Real-time progress percentage** during upload
✅ **Visual progress bar** with smooth animation
✅ **Drag & drop support** for easy uploads
✅ **Automatic Google Drive storage** 
✅ **Public shareable links** generated automatically
✅ **Error handling** with helpful messages
✅ **Mobile responsive** design
✅ **Secure** with service account authentication

## 📁 Files Modified/Created

```
NEW FILES:
├── src/components/mentee-form/VideoUpload.js
├── src/app/api/upload-video/route.js
├── GOOGLE_DRIVE_SETUP.md
├── IMPLEMENTATION_SUMMARY.md
├── .env.example
└── QUICK_START_GUIDE.md (this file)

UPDATED FILES:
├── src/components/mentee-form/FinalValidation.js
├── src/app/join-us/mentee-form/page.js
└── src/models/Mentee.js
```

## 🎯 Feature Highlights

| Feature | Details |
|---------|---------|
| **Progress Display** | 0-100% percentage shown in real-time |
| **Upload Method** | Drag & drop or click to browse |
| **Video Storage** | Google Drive (encrypted, secure) |
| **File Limits** | Max 100MB, MP4/MOV/AVI/WebM |
| **Accessibility** | Full keyboard support, screen reader ready |
| **Mobile Ready** | Responsive on all devices |
| **Error Handling** | Clear messages for all scenarios |
| **Data Security** | Credentials in environment variables |

## ⚙️ Configuration Checklist

- [ ] Google Cloud project created
- [ ] Google Drive API enabled
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Google Drive folder created
- [ ] Folder shared with service account
- [ ] Folder ID copied
- [ ] `.env.local` created
- [ ] JSON file placed in project root
- [ ] `.gitignore` updated
- [ ] Server restarted

## 🔍 Verify Setup

To verify everything is working:

1. **Check environment variables:**
   ```bash
   echo $GOOGLE_DRIVE_FOLDER_ID
   ```

2. **Check JSON file exists:**
   ```bash
   ls -la google-service-account-key.json
   ```

3. **Test upload:**
   - Go to form
   - Upload a small test video
   - Check Google Drive folder
   - Verify video appears

## 🐛 Quick Troubleshoot

| Problem | Solution |
|---------|----------|
| "Configuration missing" | Check `.env.local` variables |
| Upload fails | Verify service account has Drive access |
| Video not in Drive | Check folder ID and sharing settings |
| Progress not showing | Clear browser cache, restart server |
| Permission denied | Ensure service account has Editor role |

## 📚 Full Documentation

For more details, see:
- **Setup Guide**: `GOOGLE_DRIVE_SETUP.md`
- **Complete Summary**: `IMPLEMENTATION_SUMMARY.md`
- **Component Docs**: `src/components/mentee-form/VIDEO_UPLOAD_README.md`

## 🚀 Ready to Go!

After completing the quick start above, your video upload feature is ready:

✅ Users can upload videos from mentee form
✅ Progress percentage displays during upload
✅ Videos stored in Google Drive
✅ All data saved to database

**That's it!** 🎉

## 💡 Pro Tips

1. **Test with small files first** (1-5MB) before trying larger videos
2. **Check storage quota** regularly in Google Drive
3. **Organize videos** - folder will auto-organize by date
4. **Share links** - videos are publicly shareable by default
5. **Monitor uploads** - review uploaded videos regularly

## 📞 Need Help?

1. Check the detailed setup guide: `GOOGLE_DRIVE_SETUP.md`
2. Review component documentation: `VIDEO_UPLOAD_README.md`
3. Check browser console for error messages
4. Verify all environment variables are set

---

**You're all set!** 🎬 Start uploading videos today!
