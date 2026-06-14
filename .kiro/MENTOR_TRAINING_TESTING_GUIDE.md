# Mentor Training System - Quick Testing Guide

## ⚡ Quick Start - 5 Minutes

### Step 1: Check Configuration
```bash
# Verify environment variables
echo "SMTP_HOST: $SMTP_HOST"
echo "SMTP_USER: $SMTP_USER"
echo "SMTP_FROM: $SMTP_FROM"
echo "ADMIN_EMAIL: $ADMIN_EMAIL"
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Test Enrollment Flow
1. Open browser → `http://localhost:3000/programs/mentorship`
2. Click "Enroll Now & Get Certified" button
3. Fill form with test data
4. Click "Submit Application"
5. Should see success modal

---

## 📧 Testing Email Delivery

### Option A: Gmail Test Account (Recommended)
If you have access to the actual Gmail account (info@weslux.lu):
1. Check inbox for test emails
2. Look for 2 emails per enrollment:
   - Mentor verification email
   - Admin notification email

### Option B: Test Email Service
Use free services like:
- MailHog (local SMTP server)
- Mailtrap (cloud testing)
- Ethereal Email (Nodemailer test)

### Option C: Console Testing (Development)
Temporarily modify `src/lib/email.js` to log emails instead of sending:
```javascript
export async function sendEmail(to, subject, html) {
  // For testing only!
  console.log('TEST EMAIL TO:', to);
  console.log('SUBJECT:', subject);
  console.log('HTML:', html.substring(0, 200) + '...');
  return { success: true };
}
```

---

## ✅ Test Cases

### Test 1: Successful Enrollment
**Goal:** Verify form submission works
**Steps:**
1. Navigate to `/mentor-training/enroll`
2. Fill all fields with valid data
3. Submit
**Expected:** Success modal appears

### Test 2: Duplicate Email Prevention
**Goal:** Ensure no duplicate enrollments
**Steps:**
1. Complete Test 1 enrollment
2. Try enrolling again with same email
**Expected:** Error: "Email already registered"

### Test 3: Form Validation
**Goal:** Verify required fields
**Steps:**
1. Leave each field empty one at a time
2. Try to submit
**Expected:** Browser validation error for each empty field

### Test 4: Email Verification
**Goal:** Test email verification flow
**Steps:**
1. Complete enrollment (Test 1)
2. Copy verification link from email
3. Open link in new tab
4. Verify link works
**Expected:** Success message on verify page

### Test 5: Expired Token
**Goal:** Test token expiry handling
**Steps:**
1. Get verification link from email
2. Wait 24+ hours (or modify DB directly)
3. Click link
**Expected:** Error message about expired token

### Test 6: Invalid Token
**Goal:** Test security of verification
**Steps:**
1. Copy verification link
2. Modify token in URL (change a few characters)
3. Click modified link
**Expected:** Error message about invalid token

### Test 7: Mobile Responsive
**Goal:** Test form on mobile
**Steps:**
1. Open `/mentor-training/enroll` on mobile
2. Try filling form
3. Submit
**Expected:** Form adapts to mobile screen, all inputs accessible

### Test 8: Data Persistence
**Goal:** Verify data saves to database
**Steps:**
1. Enroll with test data
2. Check MongoDB for new record
3. Verify all fields match submission
**Expected:** Record exists in MentorTraining collection

---

## 🔧 Database Testing

### Check Enrolled Mentors
```bash
# Using MongoDB compass or mongosh
use weslux
db.mentortrainings.find()
```

### View Specific Enrollment
```javascript
db.mentortrainings.findOne({ email: "test@example.com" })
```

### Check Email Verification Status
```javascript
db.mentortrainings.find({ emailVerified: false })
// Shows all unverified applications
```

### Manual Verification (Admin Testing)
```javascript
db.mentortrainings.updateOne(
  { email: "test@example.com" },
  { 
    $set: { 
      emailVerified: true,
      status: "verified"
    }
  }
)
```

---

## 📊 Verification Checklist

### Enrollment Form
- [ ] All required fields accept input
- [ ] Optional fields (LinkedIn) don't cause errors when empty
- [ ] Age field only accepts numbers
- [ ] Email field validates email format
- [ ] Availability dropdown has all 4 options
- [ ] Form shows loading state on submit
- [ ] Error messages display correctly

### API Endpoints
- [ ] `/api/mentor-training/enroll` accepts POST requests
- [ ] `/api/mentor-training/verify` accepts GET requests
- [ ] Invalid requests return proper error messages
- [ ] Database updates correctly

### Email Sending
- [ ] Verification email sent to user
- [ ] Admin notification sent to ADMIN_EMAIL
- [ ] Emails contain correct information
- [ ] Verification link is properly formatted
- [ ] Verification link works when clicked

### User Experience
- [ ] Success modal appears after submission
- [ ] Auto-redirect works after 3 seconds
- [ ] Page is mobile responsive
- [ ] Loading states show during submission
- [ ] Error messages are clear and helpful

### Security
- [ ] Duplicate emails prevented
- [ ] Invalid tokens rejected
- [ ] Expired tokens rejected
- [ ] SQL injection attempts fail
- [ ] XSS attempts filtered

---

## 🐛 Common Issues & Fixes

### Issue: "Failed to submit application"
**Cause:** API endpoint error
**Fix:**
1. Check server console for error logs
2. Verify MongoDB connection
3. Check `.env.local` credentials
4. Check network tab for API response

### Issue: Email not received
**Cause:** SMTP credentials wrong or firewall blocking
**Fix:**
1. Verify `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` in `.env.local`
2. Check Gmail 2FA and app password setup
3. Try with test email service (Mailtrap)
4. Check server logs for email errors

### Issue: Verification link not working
**Cause:** Token expired or malformed URL
**Fix:**
1. Use fresh token from recent email
2. Ensure email parameter is URL encoded
3. Check token hasn't been modified
4. Verify MongoDB has matching record

### Issue: Form won't submit
**Cause:** Client-side validation or API error
**Fix:**
1. Check browser console for JavaScript errors
2. Verify all required fields are filled
3. Check network tab for API response
4. Try in different browser

---

## 📱 Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile

### Form Responsiveness
- [ ] All input fields readable
- [ ] Buttons clickable (minimum 44x44px)
- [ ] Text readable (minimum 16px font)
- [ ] No horizontal scrolling
- [ ] Labels associated with inputs

---

## 🚀 Performance Testing

### Page Load Time
```javascript
// In browser console
performance.getEntriesByType('navigation')[0].loadEventEnd - 
performance.getEntriesByType('navigation')[0].loadEventStart
// Should be < 3 seconds
```

### Form Submission Time
- API response should be < 2 seconds
- Email sending should be async (not blocking)
- User sees immediate success feedback

### Database Performance
- Query for enrollment: < 100ms
- Insert new record: < 200ms
- Update status: < 150ms

---

## 📝 Test Data Templates

### Valid Test Data
```json
{
  "fullName": "Test Mentor",
  "email": "test+mentor@example.com",
  "age": 30,
  "country": "Luxembourg",
  "profession": "Senior Software Engineer",
  "experience": "7+ years in full-stack development",
  "expertise": "React, Node.js, MongoDB, Team Leadership",
  "whyMentor": "I want to guide emerging professionals and share my industry experience",
  "availability": "3-4-hours-per-week",
  "linkedin": "https://linkedin.com/in/testmentor"
}
```

### Boundary Test Data
```json
{
  "fullName": "A", // Minimum length
  "email": "a@b.co", // Minimum valid email
  "age": 18, // Minimum age
  "country": "A",
  "profession": "P",
  "experience": "E",
  "expertise": "Exp",
  "whyMentor": "Why",
  "availability": "1-2-hours-per-week",
  "linkedin": "" // Optional field empty
}
```

### Invalid Test Data
```json
{
  "fullName": "", // Empty
  "email": "not-an-email", // Invalid email
  "age": "not-a-number", // Invalid type
  "country": "", // Empty
  "profession": "", // Empty
  "experience": "", // Empty
  "expertise": "", // Empty
  "whyMentor": "", // Empty
  "availability": "", // No selection
  "linkedin": "not-a-url" // Invalid URL format
}
```

---

## 📊 Success Metrics

After completing all tests, verify:
- [ ] 100% of test cases pass
- [ ] No console errors
- [ ] All emails delivered successfully
- [ ] Database contains all submitted data
- [ ] Verification links work correctly
- [ ] Mobile experience is smooth
- [ ] Page load time < 3 seconds
- [ ] Form submission feels responsive

---

## 🎯 Next Steps After Testing

1. **If All Tests Pass:**
   - Deploy to staging environment
   - Conduct user acceptance testing (UAT)
   - Create admin panel for application review

2. **If Issues Found:**
   - Document issue details
   - Check logs for error messages
   - Fix code and re-test
   - Verify fix resolves issue

3. **Future Enhancements:**
   - [ ] Admin dashboard for managing applications
   - [ ] Email templates customization
   - [ ] Course content integration
   - [ ] Certificate generation
   - [ ] Progress tracking
   - [ ] Automated approvals

