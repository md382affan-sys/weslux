# Troubleshooting: Size Limit Error

## Error Message
```
File size exceeds 100MB limit. Your file is X MB.
```

## What This Means
The video file you're trying to upload is larger than 100MB. The system rejects it to prevent:
- Server overload
- Timeout issues
- Excessive bandwidth usage
- Storage quota problems

---

## 🔧 Quick Fixes

### Option 1: Use a Smaller Video File
**Easiest solution:**
1. Choose a different, smaller video
2. Or ask user to record a shorter clip
3. Typical good size: 5-50MB

### Option 2: Compress Your Video
**Using free online tools:**
1. Go to https://www.online-convert.com/
2. Upload your video
3. Select format (MP4)
4. Set quality to "Medium"
5. Download compressed file
6. Upload to form

**Using desktop software:**
- **Windows:** Windows Video Editor (built-in) or HandBrake (free)
- **Mac:** iMovie (built-in) or HandBrake (free)
- **Linux:** HandBrake or FFmpeg (command line)

### Option 3: Increase Size Limit (Advanced)
If you want to allow files larger than 100MB:

**File:** `src/app/api/upload-video/route.js`

**Find this line (around line 60):**
```javascript
const MAX_SIZE = 100 * 1024 * 1024; // 100MB
```

**Change to:**
```javascript
const MAX_SIZE = 200 * 1024 * 1024; // 200MB
```

**Also update in VideoUpload.js:**

**File:** `src/components/mentee-form/VideoUpload.js`

**Find this line (around line 24):**
```javascript
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
```

**Change to:**
```javascript
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB
```

**And update error message:**
```javascript
if (file.size > MAX_FILE_SIZE) {
  setError(`File size exceeds 200MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
```

---

## 📊 Video File Size Guide

### Typical Video Sizes
| Duration | Quality | Size |
|----------|---------|------|
| 1 minute | 480p | 5-10 MB |
| 1 minute | 720p | 15-30 MB |
| 2 minutes | 480p | 10-20 MB |
| 2 minutes | 720p | 30-60 MB |
| 3 minutes | 480p | 15-30 MB |
| 3 minutes | 720p | 45-90 MB |
| 5 minutes | 720p | 75-150 MB |

**Recommendation:** Record in 720p for ~2 minutes = 30-60MB

---

## 🎬 How to Reduce Video Size

### Method 1: Use Shorter Duration
- Keep video to 1-2 minutes instead of 5+ minutes
- Focus on key points only
- Cuts file size by 50-75%

### Method 2: Lower Resolution
- Record at 480p instead of 1080p/4K
- Still good quality for video introduction
- Reduces file size by 30-50%

### Method 3: Compress Video
#### Using HandBrake (Recommended)
1. Download: https://handbrake.fr/
2. Open HandBrake
3. Select your video file
4. Choose preset: "General → Fast 720p30"
5. Click "Start Encode"
6. File ready in ~5 minutes
7. Usually reduces size by 40-60%

#### Using Online Tool
1. Go to: https://www.clipchamp.com/
2. Upload video
3. Use "Export" with compression settings
4. Download compressed version

---

## ⚙️ Video Recording Tips

### To Keep File Size Small:

**✅ DO:**
- Record in 720p (or lower)
- Record in good lighting
- Speak clearly
- Keep video 1-2 minutes
- Use MP4 format

**❌ DON'T:**
- Record in 4K or 1080p (too large)
- Record in dark rooms (needs more data)
- Create long, rambling videos
- Use exotic formats

### Example: Recording with Phone
**iPhone:**
1. Settings → Camera → Resolution: "1080p at 30 fps"
2. Can reduce to 720p for smaller files
3. Record video
4. Videos typically 15-50MB for 2-3 minutes

**Android:**
1. Camera app → Settings → Video quality: "720p"
2. Record video
3. Videos typically 10-40MB for 2-3 minutes

---

## 🔍 Check Your File Size

### Windows
1. Find the video file
2. Right-click → Properties
3. Look for "Size"
4. Divide by 1,000,000 for MB

### Mac
1. Select the video file
2. Press Cmd+I
3. Look for "Size"
4. Divide by 1,000,000 for MB

### Linux
```bash
ls -lh filename.mp4
```
The number shown is the file size

---

## 📈 Increasing Size Limit Implications

If you increase the limit beyond 100MB:

**Pros:**
- Users can upload longer videos
- Higher quality videos accepted
- More flexibility

**Cons:**
- Slower uploads
- Longer timeouts
- Uses more Google Drive storage
- May hit Vercel function limits (if deployed)
- Google Drive quota concerns

**Recommendation:**
- **Development:** 100-150MB is fine
- **Production:** 50-100MB is safer
- Monitor storage quota regularly

---

## 🚨 For Developers

### Current Size Limits

**Frontend validation:**
```javascript
// src/components/mentee-form/VideoUpload.js
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
```

**Backend validation:**
```javascript
// src/app/api/upload-video/route.js
const MAX_SIZE = 100 * 1024 * 1024; // 100MB
```

**Request timeout:**
```javascript
export const maxDuration = 300; // 5 minutes
```

### To Change Limits
1. Update both frontend and backend
2. Test with actual file size
3. Monitor API performance
4. Check Google Drive quota
5. Test timeout is sufficient

---

## 📞 Getting Help

### If Still Getting Error:

1. **Check file size:**
   - Make sure you're uploading the compressed version
   - Clear downloads folder and try again

2. **Try a tiny test file:**
   - Record 15-second clip at lowest quality
   - Should be <5MB
   - This confirms system is working

3. **Check internet connection:**
   - Large uploads need stable connection
   - Slow internet = timeout errors

4. **Restart browser:**
   - Sometimes browser cache causes issues
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

5. **Restart dev server:**
   - `Ctrl+C` to stop
   - `npm run dev` to restart
   - Try upload again

---

## Summary

### To Fix "Size Limit" Error:

1. **Easiest:** Use smaller video file
2. **Best:** Compress video (HandBrake/Online)
3. **Advanced:** Increase size limit in code

Pick one method and you're done! 🎉

---

## Common Solutions Table

| Problem | Solution | Time |
|---------|----------|------|
| File too big | Compress with HandBrake | 5 mins |
| File too big | Record shorter clip | 2 mins |
| File too big | Lower recording quality | 1 min |
| Still getting error | Increase size limit in code | 3 mins |
| Upload times out | Reduce file size more | 5 mins |
| Internet slow | Try on faster connection | varies |

---

Good luck! 🚀
