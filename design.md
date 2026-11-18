# WESLUX Application Design

## 1. Purpose and Scope

WESLUX is a web application for WES Luxembourg for Education. It presents the organization's programs and information, collects applications and inquiries, supports mentor training, and provides an administration area for reviewing submissions and managing news.

This document describes the existing application in the `weslux` folder. It is an architectural guide, not a specification of behavior that is absent from the source code.

## 2. System at a Glance

```text
Visitors / Applicants / Administrators
                  |
                  v
       Next.js App Router application
       |                         |
       | Page requests           | API requests
       v                         v
 Public and admin pages      Route handlers
       |                    /       |       \
       |                    v       v        v
       |                MongoDB   Email   Google Drive
       |               (Mongoose) (SMTP)   (uploads)
       v
 Static files and media in public/
```

### Main responsibilities

| Area | Responsibility |
|---|---|
| Public pages | Explain the organization, programs, impact, partnerships, and ways to participate. |
| Applicant forms | Collect mentee, mentor-training, volunteer, ambassador, internship, partner, donation, and contact information. |
| API routes | Accept form submissions, retrieve and update records, manage news, handle uploads, and support admin operations. |
| MongoDB models | Define the persisted records used by the API. |
| Admin pages | Provide dashboards and record-management screens for administrators. |
| Integrations | Use SMTP email, Google Drive uploads, and spreadsheet/PDF generation where applicable. |

## 3. Technology and Runtime

- **Framework:** Next.js App Router, React, and JavaScript.
- **Styling:** Tailwind CSS 4 with shared rules in `src/app/globals.css`.
- **Persistence:** MongoDB through Mongoose.
- **Admin credentials and tokens:** `bcryptjs` and `jsonwebtoken`.
- **Email:** Nodemailer.
- **File storage:** Google Drive API through `googleapis`.
- **Exports and certificate PDFs:** `xlsx` and `html2pdf.js` are imported by application code. `jspdf` is listed as a dependency but has no direct import in `src/`.
- **Local commands:** `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, and `npm run seed:news`.
- **Container deployment:** Docker multi-stage build; Docker Compose runs the app on port 3000 and loads environment settings from `.env`.

The root layout (`src/app/layout.js`) loads the shared stylesheet, site metadata, icon, and web fonts. `src/app/page.js` composes the home page from reusable components exported through `src/components/index.js`.

`next-auth` is listed in `package.json`, but no `next-auth` usage was found in the application source. The implemented admin login uses JWTs.

## 4. Source Layout

```text
weslux/
├── public/                 Static images, videos, documents, and user-flow material
├── scripts/
│   └── seed-news.js        News data seeding script
├── src/
│   ├── app/                App Router pages and API route handlers
│   ├── components/         Shared site, form, upload, and admin UI
│   ├── lib/                Database, email, Drive, export, and PDF helpers
│   └── models/             Mongoose schemas and models
├── Dockerfile
├── docker-compose.yml
├── next.config.mjs
└── package.json
```

## 5. Page and Navigation Design

### 5.1 Public pages

| URL path | Page purpose |
|---|---|
| `/` | Home page, assembled from the header, hero, overview, program, impact, stories, partner, SDG, news, call-to-action, and footer sections. |
| `/about` | About landing page. |
| `/about/Compliance-reports` | Compliance reports. |
| `/about/our-donors` | Donor information. |
| `/about/our-story` | Organization story. |
| `/about/our-team` | Team information. |
| `/about/vision-mission` | Vision and mission. |
| `/about/who-we-are` | Organization overview. |
| `/contact` | Contact information and inquiry entry point. |
| `/impact` | Impact information. |
| `/join-us/become-ambassador` | Ambassador application entry point. |
| `/join-us/find-internship` | Internship application entry point. |
| `/join-us/find-job` | Job information. |
| `/join-us/mentee-form` | Multi-step mentee/mentor form. |
| `/join-us/volunteer` | Volunteer application entry point. |
| `/mentor-training/completion` | Training completion page. |
| `/mentor-training/course` | Training course content. |
| `/mentor-training/enroll` | Mentor-training enrollment. |
| `/mentor-training/get-certificate` | Certificate access flow. |
| `/mentor-training/training` | Training experience. |
| `/mentor-training/view-certificate` | Certificate viewing. |
| `/news` | Published news and updates. |
| `/partners/companies` | Company partnership information. |
| `/partners/cso` | Civil-society partnership information. |
| `/partners/government` | Government partnership information. |
| `/partners/schools` | School partnership information. |
| `/privacy-policy` | Privacy policy. |
| `/programs/industrial-visit` | Industrial-visit program information. |
| `/programs/mentorship` | Mentorship program information. |
| `/programs/mentorship/institution-journey` | Institution journey through the mentorship program. |
| `/programs/mentorship/mentee-journey` | Mentee journey through the mentorship program. |
| `/programs/mentorship/mentor-journey` | Mentor journey through the mentorship program. |
| `/programs/mentorship/programs` | Mentorship program options. |
| `/programs/tech-connect` | Tech Connect program information. |
| `/support` | Support information. |

### 5.2 Admin pages

Admin pages are under `/admin`. `AdminLayout` provides the responsive sidebar, navigation, current-page heading, website link, and logout action on the dashboard and management pages; the login page is separate.

| URL path | Admin function |
|---|---|
| `/admin/login` | Administrator sign-in. |
| `/admin/dashboard` | Dashboard. |
| `/admin/contacts` | Contact submissions. |
| `/admin/volunteers` | Volunteer applications. |
| `/admin/ambassadors` | Ambassador applications. |
| `/admin/mentees` | Mentee applications. |
| `/admin/mentor-training` | Mentor-training applications and certificate operations. |
| `/admin/donations` | Donation submissions. |
| `/admin/partners` | Partner applications. |
| `/admin/internships` | Internship applications. |
| `/admin/news` | News content management. |
| `/admin/admins` | Administrator account management; the navigation shows this item to the `super_admin` role. |
| `/admin/settings` | Admin settings page. |

## 6. Reusable UI Components

### Home page

`src/components/home/` contains the home-page sections: `Header`, `Hero`, `About`, `ProgramDetails`, `Impact`, `SuccessStories`, `Partners`, `SDG`, `NewsEvents`, `PartnersShowcase`, `CTA`, and `Footer`.

### Mentee form

`src/components/mentee-form/` divides the application into smaller screens:

1. `CategorySelection` selects an applicant group.
2. `ApplicantProfile` collects basic details.
3. One category-specific section is displayed: `FoundationLevel`, `BridgeLevel`, `LaunchLevel`, `YoungProfessional`, or `MentorQuestions`.
4. `FinalValidation` collects common closing responses.
5. `ApplicationReview` collects feedback.
6. `VideoUpload` uploads the required video introduction.

The page maintains the form state and passes it to the relevant section component. `VideoUpload` is rendered inside `FinalValidation`; `DocumentUpload` is used by the internship application page. `SuccessModal` is used by several public submission pages. `admin/AdminLayout` wraps the admin screens, and `admin/ExportButton` is used on the mentee and volunteer screens.

## 7. API Design

API endpoints are implemented as Next.js route handlers under `src/app/api`. Most submission endpoints accept `POST`; list endpoints commonly use `GET`; status changes use `PATCH`.

### 7.1 Form and application endpoints

| Endpoint | Methods | Purpose |
|---|---|---|
| `/api/contact` | `POST`, `GET` | Create contact inquiries and retrieve records. |
| `/api/mentee` | `POST`, `GET` | Submit mentee applications and retrieve applications. |
| `/api/mentee/review` | `PATCH` | Update application-review information. |
| `/api/volunteer` | `POST`, `GET` | Submit and retrieve volunteer applications. |
| `/api/ambassador` | `POST`, `GET` | Submit and retrieve ambassador applications. |
| `/api/internship` | `POST`, `GET` | Submit and retrieve internship applications. |
| `/api/partner` | `POST`, `GET` | Submit and retrieve partner applications. |
| `/api/donation` | `POST`, `GET` | Submit and retrieve donation records. |
| `/api/{contact,mentee,volunteer,ambassador,internship,partner,donation}/update-status/[id]` | `PATCH` | Update a record's admin-managed status. |

### 7.2 Mentor-training endpoints

| Endpoint | Methods | Purpose |
|---|---|---|
| `/api/mentor-training/enroll` | `POST` | Create a training application and send a verification OTP. |
| `/api/mentor-training/verify-otp` | `POST`, `PUT` | Verify an OTP or request a replacement OTP. |
| `/api/mentor-training/verify` | `GET` | Separate email/token verification handler present in the source; it is not the OTP flow used by the enrollment page. |
| `/api/mentor-training/list` | `GET` | Retrieve training applications. |
| `/api/mentor-training/get-mentor-by-email` | `GET` | Look up a training applicant by email. |
| `/api/mentor-training/update-status/[id]` | `PATCH` | Update an applicant's status. |
| `/api/mentor-training/send-certificate` | `POST` | Send a certificate notification email. |
| `/api/mentor-training/resend-certificate` | `POST` | Resend a certificate. |
| `/api/mentor-training/update-certificate-status` | `POST` | Update certificate-related status. |

### 7.3 News endpoints

| Endpoint | Methods | Purpose |
|---|---|---|
| `/api/news` | `GET`, `POST` | List published news publicly and create news through the admin flow. |
| `/api/news/[id]` | `GET`, `PUT`, `DELETE` | Read, update, and delete an individual news record. |

### 7.4 Upload and utility endpoints

| Endpoint | Methods | Purpose |
|---|---|---|
| `/api/upload-video/init` | `POST` | Validate video metadata and create a Drive resumable-upload session. |
| `/api/upload-video/chunk` | `POST` | Forward one video chunk to Google Drive. |
| `/api/upload-video` | `POST` | Single-request video upload handler; the current `VideoUpload` component uses the init/chunk endpoints instead. |
| `/api/upload-document/init` | `POST` | Initialize a document upload. |
| `/api/upload-document/chunk` | `POST` | Accept a document upload chunk. |
| `/api/upload-document` | `POST` | Single-request document upload handler; `DocumentUpload` uses the init/chunk endpoints instead. |
| `/api/admin/login` | `POST` | Authenticate an admin and return a signed token. |
| `/api/admin/create` | `POST` | Create an admin account. |
| `/api/admin/list` | `GET` | List admin accounts. |
| `/api/admin/update/[id]` | `PUT` | Update an admin account. |
| `/api/admin/delete/[id]` | `DELETE` | Delete an admin account. |
| `/api/admin/init-super-admin` | `GET`, `POST` | Initialize the super-admin workflow. |
| `/api/test-db` | `GET` | Database connectivity utility. |
| `/api/test-email` | `POST` | Email utility. |
| `/api/smtp-debug` | `GET` | SMTP diagnostic utility. |

Authorization checks are implemented within some API routes; no App Router middleware file is present in the route inventory. The admin login route compares the submitted password with the stored value using bcrypt and signs a JWT. Some admin-facing operations expect a bearer token; consult each handler for its exact behavior.

## 8. Data Model

Models are defined in `src/models/` and persisted in MongoDB using Mongoose. Most application records have creation/update timestamps and a workflow status, with status notes where applicable.

| Model | Main information stored |
|---|---|
| `Admin` | Email, password hash, display name, role, and creating admin reference. Roles include `admin` and `super_admin`. |
| `Mentee` | Applicant profile, selected education level, category-specific responses, common feedback, optional review responses, video Drive metadata, and application status. |
| `MentorTraining` | Mentor details, email-verification state and OTP metadata, application status, quiz scores, and certificate information. |
| `Volunteer` | Contact details, role interest, professional background, expertise, availability, and motivation. |
| `Ambassador` | Name, email, role interest, background, and ideas. |
| `Internship` | Applicant, university and internship details, skills, motivation, and uploaded document metadata. |
| `Partner` | Contact and organization details, organization type, partner category, interests, and message. |
| `Donation` | Donor details, amount, donation frequency, anonymity choice, and status. |
| `Contact` | Contact information, subject, program, message, and status. |
| `News` | Display date, category, title, description, details, visual metadata, and publication status. |

### Mentee category groups

The `Mentee` schema accommodates several applicant categories:

- `6th-10th`: foundation-level questions.
- `11th-12th`: bridge-level questions.
- `university`: launch-level and job-readiness questions.
- `young-professional`: career-start and career-development questions.
- `mentor`: mentor motivation and support questions.

Category-specific answers are stored in the same mentee record; the selected `educationLevel` indicates which group applies. The form also stores common validation/feedback fields and video file metadata.

## 9. Important Application Flows

### 9.1 Mentee application

```text
Applicant selects category
        -> enters profile
        -> answers category-specific questions
        -> completes FinalValidation, including the required video upload
        -> completes the ApplicationReview step
        -> submits form data to POST /api/mentee
        -> API stores a Mentee record in MongoDB
        -> API attempts to send form emails
        -> admin reviews records through the admin pages/API
```

The form state is held in the client-side mentee page. The video component returns Drive file metadata to the form, which includes it in the application submission. `FinalValidation` renders `VideoUpload` before the common feedback fields; `ApplicationReview` is the final form step.

### 9.2 Mentor-training enrollment and certificate

```text
Applicant enrolls
        -> POST /api/mentor-training/enroll creates application and emails an OTP
        -> applicant verifies with POST /api/mentor-training/verify-otp
        -> enrollment page stores the email in sessionStorage
        -> course page presents training videos, module quizzes, and a final quiz
        -> course page posts certificate status/quiz result to the API
        -> completion and view-certificate pages fetch applicant data by email
        -> certificate pages render/download PDFs; get-certificate requests a resend by email
        -> email endpoints send certificate links/details
```

The `MentorTraining` model stores OTP expiry and attempt metadata, email verification, status, quiz scores, and certificate fields. The course page updates certificate status after the final quiz. The completion and view-certificate pages build PDFs with `html2pdf.js`; `src/lib/generateCertificatePDF.js` is present but has no caller in the application source.

The separate `GET /api/mentor-training/verify` handler expects `verificationToken` and `verificationTokenExpiry` fields, which are not defined in the current `MentorTraining` schema. The enrollment page uses the OTP endpoints instead.

### 9.3 Other submissions

Contact, volunteer, ambassador, internship, partner, and donation flows submit data to their corresponding API endpoints. Their records are stored in their respective models and are available through admin workflows. Internship applications include metadata for uploaded supporting documents.

### 9.4 News management

The public news endpoint returns published entries. Admin operations create or modify news records; the news creation handler also attempts to send a notification email.

### 9.5 Video uploads

```text
Browser validates file type/size
        -> POST /api/upload-video/init (metadata only)
        -> server starts a Drive resumable session
        -> browser sends file chunks to /api/upload-video/chunk
        -> server forwards chunks to Google Drive
        -> completed file ID/link are returned to the form
```

The shared Drive helper defines a 100 MB maximum video size and 2 MB chunks for chunked uploads. Upload sessions are held in server process memory, and Drive credentials/session details are used server-side. The client-side upload components use the chunked endpoints; separate single-request endpoints also exist.

## 10. Shared Libraries and Utilities

| File | Responsibility |
|---|---|
| `src/lib/mongodb.js` | Connects to MongoDB and reuses a cached Mongoose connection. |
| `src/lib/email.js` | Email delivery and reusable form/news email helpers. |
| `src/lib/drive.js` | Google Drive auth, resumable uploads, upload sessions, folder resolution, and media metadata helpers. |
| `src/lib/exportToExcel.js` | Defines Excel exporters for mentees, volunteers, ambassadors, contacts, partners, and donations. The admin export button is wired to mentee and volunteer exports. |
| `src/lib/generateCertificatePDF.js` | Defines a browser PDF generator, but no application source file imports or calls it. The certificate pages generate their PDFs inline. |

## 11. Static Assets and Supporting Documents

`public/` serves static resources, including the site image, compliance PDFs, memoranda, training course videos, donor materials, mentorship tutorials, SDG graphics, team materials, and user-flow documents. These assets are served directly by the web app and are separate from MongoDB records.

## 12. Configuration Boundaries

Configuration is supplied through environment variables rather than hard-coded into this design document. The application code refers to settings for:

- MongoDB connection (`MONGODB_URI`).
- Admin JWT signing (`JWT_SECRET`).
- SMTP mail delivery and admin notification recipient (`SMTP_*`, `ADMIN_EMAIL`).
- Public base URL (`NEXT_PUBLIC_BASE_URL`).
- Google Drive OAuth/service-account credentials and destination folder (`GDRIVE_*`, `GOOGLE_SERVICE_ACCOUNT_KEY*`, `GOOGLE_DRIVE_FOLDER_ID`).

Use the project’s local/deployment environment configuration for actual values. Do not put secret values in documentation or source control.

## 13. Source-Verified Boundaries and Caveats

- The donation form/API stores donation details; no payment processor integration was found in the application source.
- The code contains both OTP verification and a separate token-based mentor verification route. Only the OTP endpoints are called by the enrollment page; the token route refers to fields absent from the current model.
- The certificate resend route checks completion status before sending an email. The certificate data lookup endpoint, however, looks up a record by email and returns profile/status fields; the view page fetches by email and does not send its query-string token to that endpoint. The source therefore does not establish token-based verification for the view page.
- The single-request upload endpoints are `POST` and are not called by the current upload components. Those components use their respective init/chunk endpoints.
- A source file or endpoint being present does not establish that an external service is configured, that an email is delivered, or that a user-visible flow succeeds in deployment.

## 14. Styling and Responsive Behavior

The global stylesheet imports Tailwind and defines the design tokens, base typography, responsive helper classes, transitions, form utilities, and animation classes. Inter and Roboto Mono are loaded by the root layout. Admin navigation adapts to viewport size, and shared utility classes support responsive layouts across public pages and forms.

## 15. Operational Entry Points

| Command or file | Role |
|---|---|
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create the production build. |
| `npm run start` | Run the production server. |
| `npm run lint` | Run ESLint. |
| `npm run seed:news` | Run the news seeding script. |
| `Dockerfile` | Install dependencies, build the standalone app, and run it as a non-root user. |
| `docker-compose.yml` | Build/run the app container and provide environment configuration. |

