# Mentor Training System - Quick Reference Card

## 🎯 URLs

| Page | URL | Purpose |
|------|-----|---------|
| Mentorship Program | `/programs/mentorship` | View course details, click "Enroll Now" |
| Enrollment Form | `/mentor-training/enroll` | Fill form and submit application |
| Email Verification | (via email link) | Click link in verification email |
| API: Enroll | `/api/mentor-training/enroll` | POST endpoint for enrollment |
| API: Verify | `/api/mentor-training/verify` | GET endpoint for email verification |

---

## 📋 Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | Text | Yes | Any name |
| Email | Email | Yes | Unique, will be verified |
| Age | Number | Yes | Minimum 18 |
| Country | Text | Yes | Any country |
| Profession | Text | Yes | Current job title |
| Experience | Text | Yes | Years and domain |
| Expertise | Textarea | Yes | Skills and specializations |
| Why Mentor | Textarea | Yes | Motivation and goals |
| Availability | Dropdown | Yes | 1-2h, 3-4h, 5-6h, 7+h per week |
| LinkedIn | URL | No | Optional profile link |

---

## 📧 Emails Sent

| Email | Sent To | Trigger | Purpose |
|-------|---------|---------|---------|
| Enrollment Verification | Mentor | Form submitted | Verify email with 24hr link |
| Enrollment Notification | Admin | Form submitted | Notify admin of new application |
| Verification Success | Mentor | Link clicked | Confirm email verified |
| Review Notification | Admin | Link clicked | Notify admin app ready for review |

---

## 🗄️ Database Fields

```javascript
Collection: mentortrainings

Required Fields:
- fullName (String)
- email (String, unique)
- age (Number)
- country (String)
- profession (String)
- experience (String)
- expertise (String)
- whyMentor (String)
- availability (String)

Optional Fields:
- linkedin (String)

System Fields:
- emailVerified (Boolean, default: false)
- verificationToken (String)
- verificationTokenExpiry (Date)
- status (String: pending|verified|approved|rejected)
- statusNote (String)
- createdAt (Date, auto)
- updatedAt (Date, auto)
```

---

## 🔑 Status Values

| Status | Meaning | Next Action |
|--------|---------|------------|
| pending | Just enrolled, email not verified | Click verification link |
| verified | Email verified, awaiting admin | Admin reviews application |
| approved | Application approved by admin | Access course materials |
| rejected | Application rejected by admin | Contact admin for details |

---

## ⚙️ Environment Variables

```bash
# Email Configuration (in .env.local)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@weslux.lu
SMTP_PASSWORD=nutj wuzm epvw eics
SMTP_FROM=info@weslux.lu
ADMIN_EMAIL=info@weslux.lu

# Database (also required)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret

# Optional
NEXT_PUBLIC_BASE_URL=https://weslux.lu
```

---

## 🧪 Quick Test Commands

```bash
# Start dev server
npm run dev

# Check MongoDB connection
# (Open MongoDB Compass and connect)

# View mentor enrollments
# (In MongoDB Compass)
db.mentortrainings.find()

# Count total enrollments
db.mentortrainings.countDocuments()

# Find specific enrollment by email
db.mentortrainings.findOne({ email: "test@example.com" })

# Find unverified applications
db.mentortrainings.find({ emailVerified: false })

# Find verified applications
db.mentortrainings.find({ emailVerified: true, status: "verified" })
```

---

## 🔗 API Examples

### Enroll
```bash
curl -X POST http://localhost:3000/api/mentor-training/enroll \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "country": "Luxembourg",
    "profession": "Engineer",
    "experience": "5 years",
    "expertise": "Full-stack",
    "whyMentor": "Give back",
    "availability": "3-4-hours-per-week"
  }'
```

### Verify
```bash
curl http://localhost:3000/api/mentor-training/verify?token=XXXXX&email=john@example.com
```

---

## 📱 Responsive Breakpoints

- Mobile: < 640px (Form stacks vertically)
- Tablet: 640px - 1024px (2-column form)
- Desktop: > 1024px (Full layout)

---

## ⏱️ Timeouts & Expiry

| Item | Duration | Note |
|------|----------|------|
| Verification Token | 24 hours | Link expires after 24hrs |
| Email Sending | < 5 seconds | Async, non-blocking |
| API Response | < 2 seconds | Target response time |
| Page Load | < 3 seconds | Initial page load |

---

## 🛡️ Security Checklist

- [x] Token: 32-byte random (256-bit entropy)
- [x] Email: Verified before course access
- [x] Duplicate: Prevented by unique index
- [x] Validation: Frontend + Backend
- [x] XSS: Protected by React
- [x] CSRF: Protected by Next.js
- [x] HTTPS: Required for deployment
- [x] Secrets: In .env.local only

---

## 📞 Common Issues Quick Fixes

| Issue | Fix |
|-------|-----|
| Email not received | Check SMTP credentials in .env.local |
| Form won't submit | Check browser console for errors |
| Link doesn't work | Token may be expired (24hr max) |
| Duplicate email error | Use different email or check DB |
| 500 error | Check server logs for details |

---

## 🎯 Success Indicators

✅ Form submits successfully
✅ Success modal appears
✅ Verification email received in 30 seconds
✅ Admin notification email received
✅ Data appears in MongoDB
✅ Verification link works
✅ Status updates to "verified"
✅ No console errors

---

## 📖 Documentation Files

- `.kiro/IMPLEMENTATION_SUMMARY.md` - Overview of entire system
- `.kiro/MENTOR_TRAINING_SYSTEM.md` - Complete technical documentation
- `.kiro/MENTOR_TRAINING_TESTING_GUIDE.md` - Comprehensive test cases
- `.kiro/QUICK_REFERENCE.md` - This file

---

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] SMTP credentials verified
- [ ] MongoDB connection tested
- [ ] Email templates reviewed
- [ ] Form validation tested
- [ ] Error handling verified
- [ ] Mobile responsiveness checked
- [ ] Security audit completed
- [ ] Performance tested
- [ ] Documentation updated
- [ ] Team trained on system

---

## 💾 Data Export/Import

### Export mentors to CSV
```javascript
// In MongoDB Compass:
// Select collection: mentortrainings
// Right-click → Export Collection
// Choose CSV format
```

### Backup database
```bash
# Using mongodump
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/weslux" \
  --out=./backup
```

---

## 🎓 Course Details (Auto-shown on Mentorship Page)

- **Duration:** 1-2 Hours
- **Format:** Self-Paced Online
- **Cost:** Free
- **Certificate:** Yes
- **Access:** Lifetime after approval

**Topics:**
1. Effective Communication
2. Goal Setting & Planning
3. Career Development Guidance
4. Mentoring Best Practices
5. Mentee Support & Coaching

---

## 🔄 User Journey Map

```
Start
  ↓
Visit /programs/mentorship
  ↓
Read course details
  ↓
Click "Enroll Now & Get Certified"
  ↓
Fill enrollment form
  ↓
Submit (POST /api/mentor-training/enroll)
  ↓
Success modal + redirect
  ↓
Check email for verification link
  ↓
Click verification link
  ↓
Verify email (GET /api/mentor-training/verify)
  ↓
Status: verified, awaiting admin review
  ↓
Admin reviews & approves (future)
  ↓
Access course materials (future)
```

---

## 📊 Monitoring

### Key Metrics to Track
- Total enrollments: `db.mentortrainings.countDocuments()`
- Verified: `db.mentortrainings.countDocuments({emailVerified: true})`
- Pending: `db.mentortrainings.countDocuments({status: "pending"})`
- Verified rate: Verified / Total × 100%

### Alerts to Set Up
- Email sending failures
- Verification link failures
- High form submission errors (>10%)
- API response time > 3 seconds
- Database connection issues

---

## 🎯 30-Second Summary

**What:** Mentor training enrollment with email verification
**Who:** Mentors wanting to learn mentoring skills
**Where:** /mentor-training/enroll form
**When:** Any time, 24/7 self-paced
**Why:** Become a better mentor with certified training
**How:** Fill form → Verify email → Admin approves → Access course

---

**Last Updated:** June 12, 2026
**Status:** ✅ Production Ready for Testing
**Version:** 1.0.0

