# WES Lux Website Content Audit

**Audit date:** 11 November 2026  
**Scope:** Public App Router pages, shared public-facing components, relevant API/seed sources, and readable public PDFs/Markdown documents in `public/`.

This is an implementation roadmap, not a rewrite of the site. Recommendations are grounded in the content found in the source. Where the source cannot establish whether a claim, policy, requirement, opening, or service is current, the action is **VERIFY** rather than an invented replacement.

## Recommendation labels

- **KEEP** — useful information; retain it, subject to any stated fact check.
- **SHORTEN** — retain the information but remove repetition or unnecessary wording.
- **REWRITE** — correct unclear, inaccurate, or unprofessional wording.
- **REMOVE** — remove inactive or unsupported content unless it can be verified.
- **VERIFY** — confirm with an authoritative owner/source before changing or publishing.

For each finding, the fields below identify the page, route, source file, existing content, issue, action, suggested content/action, and reason.

## Public route coverage

All route files below were included in the review. The “Findings” column points to the detailed recommendations below; “No specific copy change flagged” means the source review found no concrete text change to recommend, not that the page or its claims have been independently validated.

### Main, about, program, impact, news, partner, and contact routes

| Page | URL | Source file | Findings |
|---|---|---|---|
| Home | `/` | `src/app/page.js` | Shared home sections below |
| About | `/about` | `src/app/about/page.js` | Spelling; repeated mission/vision |
| Compliance reports | `/about/Compliance-reports` | `src/app/about/Compliance-reports/page.js` | Report links and legal identifiers |
| Our donors | `/about/our-donors` | `src/app/about/our-donors/page.js` | Donor claims and grant details |
| Our story | `/about/our-story` | `src/app/about/our-story/page.js` | No specific copy change flagged; retain founder story |
| Our team | `/about/our-team` | `src/app/about/our-team/page.js` | Verify name, role, photo, biographies |
| Vision and mission | `/about/vision-mission` | `src/app/about/vision-mission/page.js` | Keep full statements here |
| Who we are | `/about/who-we-are` | `src/app/about/who-we-are/page.js` | No specific copy change flagged |
| Contact | `/contact` | `src/app/contact/page.js` | Typo, unclear hours, inactive social links, address check |
| Impact | `/impact` | `src/app/impact/page.js` | Metrics, CTA destination |
| Industrial visit | `/programs/industrial-visit` | `src/app/programs/industrial-visit/page.js` | CTA label/destination |
| Tech Connect | `/programs/tech-connect` | `src/app/programs/tech-connect/page.js` | No specific copy change flagged |
| Mentorship | `/programs/mentorship` | `src/app/programs/mentorship/page.js` | Verify duration/session descriptions |
| Mentorship programs | `/programs/mentorship/programs` | `src/app/programs/mentorship/programs/page.js` | Verify duration/session descriptions |
| Mentee journey | `/programs/mentorship/mentee-journey` | `src/app/programs/mentorship/mentee-journey/page.js` | Duplicate intro; verify platform features |
| Mentor journey | `/programs/mentorship/mentor-journey` | `src/app/programs/mentorship/mentor-journey/page.js` | Rewrite awkward benefit language |
| Institution journey | `/programs/mentorship/institution-journey` | `src/app/programs/mentorship/institution-journey/page.js` | Rewrite unclear wording; verify platform features |
| News | `/news` | `src/app/news/page.js` | Verify dynamic and fallback news |
| Companies | `/partners/companies` | `src/app/partners/companies/page.js` | Repeated onboarding text; verify response time |
| Civil-society organizations | `/partners/cso` | `src/app/partners/cso/page.js` | Repeated onboarding text; verify response time |
| Government | `/partners/government` | `src/app/partners/government/page.js` | Repeated onboarding text; verify response time |
| Schools | `/partners/schools` | `src/app/partners/schools/page.js` | Repeated onboarding text; verify response time and track record |
| Support and donations | `/support` | `src/app/support/page.js` | Verify impact/allocation figures and testimonials |

### Applications, mentor training, and policy routes

| Page | URL | Source file | Findings |
|---|---|---|---|
| Become an ambassador | `/join-us/become-ambassador` | `src/app/join-us/become-ambassador/page.js` | Verify eligibility and time commitments |
| Find an internship | `/join-us/find-internship` | `src/app/join-us/find-internship/page.js` | Verify openings; clarify document requirement |
| Find a job | `/join-us/find-job` | `src/app/join-us/find-job/page.js` | Verify openings; inactive application controls |
| Mentee/mentor form | `/join-us/mentee-form` | `src/app/join-us/mentee-form/page.js` | Clarify application vs. feedback; reward claim |
| Volunteer | `/join-us/volunteer` | `src/app/join-us/volunteer/page.js` | Verify response time; clarify availability and consent |
| Mentor-training completion | `/mentor-training/completion` | `src/app/mentor-training/completion/page.js` | Verify completion, certificate ID/date, inactive links |
| Mentor-training course | `/mentor-training/course` | `src/app/mentor-training/course/page.js` | Verify quiz threshold and certificate claims |
| Mentor-training enrollment | `/mentor-training/enroll` | `src/app/mentor-training/enroll/page.js` | Clarify eligibility, certification wording, review sequence, policy links |
| Get certificate | `/mentor-training/get-certificate` | `src/app/mentor-training/get-certificate/page.js` | Verify authentication and certificate claims |
| Mentor-training overview | `/mentor-training/training` | `src/app/mentor-training/training/page.js` | Verify duration, project, quiz rules; correct typo |
| View certificate | `/mentor-training/view-certificate` | `src/app/mentor-training/view-certificate/page.js` | Verify validation claims and exposed certificate details |
| Privacy policy | `/privacy-policy` | `src/app/privacy-policy/page.js` | Legal/privacy review required; see policy findings |

## Detailed findings

### Shared homepage components and content

#### Impact metrics repeated across pages

- **Page name:** Home, Impact, and related SDG/program sections
- **Page URL:** `/`, `/impact`
- **Component/file path:** `src/components/home/Impact.js`; `src/components/home/About.js`; `src/components/home/SDG.js`; `src/components/home/SuccessStories.js`; `src/app/impact/page.js`
- **Existing content:** Examples include “5,000+ Students Reached,” “3,200+ mentorship matches,” “85% student satisfaction,” “1,200+ internship placements,” “60% female participation,” “100+ Partner Schools,” and country totals of both “25+” and “50+.”
- **Identified problem:** The source contains many precise impact claims without a date, definition, or source. Country totals conflict. Figures repeated in hero/about/impact sections may diverge further if maintained separately.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm each figure with an approved source, define what is counted and the reporting period, reconcile conflicting totals, and display a concise “as of [confirmed date]” note. Do not publish replacement numbers until confirmed.
- **Reason:** Visitors need current, comparable evidence; conflicting or undated figures reduce trust.

#### Named testimonials and employment outcomes

- **Page name:** Home
- **Page URL:** `/`
- **Component/file path:** `src/components/home/SuccessStories.js`
- **Existing content:** Named testimonials attribute outcomes to people associated with Amazon, Microsoft, Google, and Apple; one quote says, “Within 6 months, I landed my dream job at Amazon.”
- **Identified problem:** Names, quotations, career outcomes, and externally hosted stock-photo imagery are not substantiated by the source.
- **Recommended action:** **VERIFY** or **REMOVE**
- **Suggested improved content:** Retain only testimonials with verified identity, approved wording, confirmed outcomes, and image permission. Otherwise remove the attributed quote and image rather than inventing an anonymous replacement.
- **Reason:** Credible stories need accurate attribution and appropriate consent.

#### Partner showcase

- **Page name:** Home
- **Page URL:** `/`
- **Component/file path:** `src/components/home/PartnersShowcase.js`
- **Existing content:** “Trusted Partners” includes generic names such as “Tech Corp,” “Innovation Labs,” and “Sustainable Future,” paired with stock imagery.
- **Identified problem:** The source does not establish that these are real WES Lux partners or approved logos.
- **Recommended action:** **VERIFY** or **REMOVE**
- **Suggested improved content:** Show only verified partner names and authorized logos. If none are approved for display, remove the showcase until they are.
- **Reason:** A partner list is an organizational claim, not decorative filler.

#### Static homepage news cards

- **Page name:** Home
- **Page URL:** `/`
- **Component/file path:** `src/components/home/NewsEvents.js`
- **Existing content:** Fixed March 2026 announcements, including “Over 200 students”; “Read More” and “View All News & Events” controls have no destination.
- **Identified problem:** At the audit date these announcements are past, the numbers need substantiation, and the controls do not lead to content. These cards are hardcoded, separate from the dynamic `/news` page.
- **Recommended action:** **VERIFY** and **REWRITE**
- **Suggested improved content:** Replace the cards with verified current items and working links. If there is no current item, use a short link to the news page rather than stale announcements; do not retain “Over 200 students” without a source.
- **Reason:** Current, navigable news helps visitors understand recent activity and prevents dead ends.

#### Homepage identity and repeated messaging

- **Page name:** Home and About
- **Page URL:** `/`, `/about`, `/about/who-we-are`, `/impact`, program pages
- **Component/file path:** `src/components/home/Hero.js`; `src/components/home/About.js`; `src/components/home/ProgramDetails.js`; `src/app/about/page.js`; `src/app/about/who-we-are/page.js`
- **Existing content:** Variations on “bridge the gap between education and industry,” mentorship, and real-world exposure recur across sections and pages.
- **Identified problem:** The repeated high-level promise can displace concrete information about what each program offers.
- **Recommended action:** **SHORTEN**
- **Suggested improved content:** Keep one clear core statement in the homepage hero. On About, explain the organization; on each program page, explain its actual audience, activities, and next step rather than repeating the same general promise.
- **Reason:** Consistent messaging is useful, but each page should add distinct visitor value.

#### Homepage sections without a specific change

- **Page name:** Home
- **Page URL:** `/`
- **Component/file path:** `src/components/home/Partners.js`; `src/components/home/ProgramDetails.js`; `src/components/home/CTA.js`; `src/components/home/Hero.js`
- **Existing content:** Public program, partnership, and call-to-action sections.
- **Identified problem:** No separate wording issue was identified in the scoped review; claims in shared impact/testimonial sections are handled above.
- **Recommended action:** **KEEP**
- **Suggested improved content:** No replacement proposed. Preserve useful program and navigation information, and keep each CTA linked to its intended destination.
- **Reason:** Avoid rewriting copy without a source-based problem.

#### SDG section

- **Page name:** Home
- **Page URL:** `/`
- **Component/file path:** `src/components/home/SDG.js`
- **Existing content:** “Industry & Innovation” is used as a title; the SDG 8 description has missing connective wording. The section also contains the unverified participation/placement figures listed above.
- **Identified problem:** The title is incomplete, one description reads awkwardly, and the numerical claims need substantiation.
- **Recommended action:** **REWRITE** and **VERIFY**
- **Suggested improved content:** Use the full, intended SDG title after checking the relevant SDG wording; proofread the SDG 8 sentence while preserving its actual meaning. Publish statistics only after verification.
- **Reason:** Correct labels and readable descriptions make the section useful and credible.

#### Footer and shared navigation

- **Page name:** All pages using shared site navigation/footer
- **Page URL:** Sitewide
- **Component/file path:** `src/components/home/Header.js`; `src/components/home/Footer.js`
- **Existing content:** Footer shows “© 2025”; the Twitter icon links to `#`. Footer also displays registration and contact details.
- **Identified problem:** The copyright year is stale; the icon is a dead link; official registration/contact details should match current records. No specific header-label problem was identified.
- **Recommended action:** **REWRITE** / **VERIFY**; **KEEP** the useful navigation and contact repetition
- **Suggested improved content:** Use the current year dynamically or update it during annual maintenance. Link social icons to verified profiles or remove icons without destinations. Confirm the footer’s legal/contact details against official records. Retain the footer contact information even where it repeats the Contact page.
- **Reason:** A working footer supports navigation and contact access; inaccurate or inactive details undermine it.

### About and organization pages

#### About landing page

- **Page name:** About
- **Page URL:** `/about`
- **Component/file path:** `src/app/about/page.js`
- **Existing content:** “a porpuse driven orgnaisation”
- **Identified problem:** Spelling errors reduce professionalism; the same full mission and vision statements also appear on the dedicated Vision and Mission page.
- **Recommended action:** **REWRITE** and **SHORTEN**
- **Suggested improved content:** Correct the phrase to “a purpose-driven organisation.” Keep a brief overview here and link to `/about/vision-mission` for the full statements.
- **Reason:** Fixes visible errors and gives the dedicated page a clear purpose without deleting important mission information.

#### Compliance reports

- **Page name:** Compliance reports
- **Page URL:** `/about/Compliance-reports`
- **Component/file path:** `src/app/about/Compliance-reports/page.js`
- **Existing content:** Buttons labeled Annual Report and Financial Report point to `#` while describing downloadable reports; both are labeled 2025. The page shows RCS number `F14791`.
- **Identified problem:** The report controls do not download reports; report availability/currentness is not established. The RCS extract is dated 14/02/2025 and warns that later changes may not be reflected. A news entry uses `L250052546` as an RCS “Reference,” which may be a different identifier type.
- **Recommended action:** **VERIFY** and **REWRITE**
- **Suggested improved content:** Link to the actual approved reports and label their reporting years accurately; otherwise remove the download buttons until files are available. Confirm each identifier and label it exactly as shown in the current official extract.
- **Reason:** Compliance details should be precise and linked to genuine documents.

#### Donors and grant material

- **Page name:** Our donors
- **Page URL:** `/about/our-donors`
- **Component/file path:** `src/app/about/our-donors/page.js`
- **Existing content:** Named donor organizations include “InnovateTech Solutions,” “Future Leaders Inc.,” “EduConnect International,” and “Sustainable Growth Partners”; the page also claims hundreds of individual donors. It describes a €22,000 grant covering 2025–2027.
- **Identified problem:** Donor names/count and grant amount/period are not established by the page source alone.
- **Recommended action:** **VERIFY**; **REMOVE** unsupported names/counts until confirmed
- **Suggested improved content:** Keep donor acknowledgments only with verified names and permission. Confirm the grant amount, period, and description against the linked agreement before publishing; do not replace them with guessed details.
- **Reason:** Donor recognition and grant information are important but must be accurate and authorized.

#### Our story

- **Page name:** Our story
- **Page URL:** `/about/our-story`
- **Component/file path:** `src/app/about/our-story/page.js`
- **Existing content:** Founder’s first-person organization story.
- **Identified problem:** No specific copy change was identified in the reviewed source.
- **Recommended action:** **KEEP**
- **Suggested improved content:** No replacement proposed.
- **Reason:** The first-person story adds context that is distinct from program descriptions; retain it unless the organization confirms it is outdated.

#### Our team

- **Page name:** Our team
- **Page URL:** `/about/our-team`
- **Component/file path:** `src/app/about/our-team/page.js`
- **Existing content:** “Yash Pandey” is presented as a mentee but uses `/team/robert-kim.jpg`; a listed name is “Arif Mohmmad.”
- **Identified problem:** The image/identity pairing may be wrong, and the spelling and biographies/titles require confirmation.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm each person’s displayed name, role, biography, and approved portrait; correct the image/name pairing and spelling only after confirmation.
- **Reason:** Team profiles are identity claims and should not be guessed from filenames.

#### Vision and mission

- **Page name:** Vision and mission
- **Page URL:** `/about/vision-mission`
- **Component/file path:** `src/app/about/vision-mission/page.js`
- **Existing content:** Full vision and mission statements, also repeated on `/about`.
- **Identified problem:** Full duplication makes the dedicated page less distinct.
- **Recommended action:** **KEEP**
- **Suggested improved content:** Keep the full approved statements here; shorten the About page to a summary and link to this page.
- **Reason:** Visitors may expect to find formal statements in a dedicated location; repeating them fully elsewhere is unnecessary.

#### Who we are

- **Page name:** Who we are
- **Page URL:** `/about/who-we-are`
- **Component/file path:** `src/app/about/who-we-are/page.js`
- **Existing content:** Organization identity and description.
- **Identified problem:** No specific standalone wording issue was identified; general identity repetition is covered above.
- **Recommended action:** **KEEP**
- **Suggested improved content:** No replacement proposed; retain distinct organizational facts and avoid repeating the full homepage pitch.
- **Reason:** This page can serve visitors looking for a concise organization overview.

### Programs and impact

#### Industrial visits

- **Page name:** Industrial Visit
- **Page URL:** `/programs/industrial-visit`
- **Component/file path:** `src/app/programs/industrial-visit/page.js`
- **Existing content:** CTA says “View Schedule” but links to News; another label says “contact Us.”
- **Identified problem:** The CTA label and destination do not match, and capitalization is inconsistent.
- **Recommended action:** **REWRITE**
- **Suggested improved content:** If the destination remains `/news`, label it “View news and updates.” If a schedule exists, link to it. Change “contact Us” to “Contact us.”
- **Reason:** Visitors should know where each action will take them.

#### Tech Connect

- **Page name:** Tech Connect
- **Page URL:** `/programs/tech-connect`
- **Component/file path:** `src/app/programs/tech-connect/page.js`
- **Existing content:** Program information.
- **Identified problem:** No specific text issue was flagged in the source review.
- **Recommended action:** **KEEP**
- **Suggested improved content:** No replacement proposed.
- **Reason:** Keep the distinct program information; verify operational details through normal program-owner review.

#### Mentorship program and program options

- **Page name:** Mentorship and Mentorship Programs
- **Page URL:** `/programs/mentorship`, `/programs/mentorship/programs`
- **Component/file path:** `src/app/programs/mentorship/page.js`; `src/app/programs/mentorship/programs/page.js`
- **Existing content:** Special Mentorship is described as “3–4 structured sessions” on one page, “3-11 months” and “10-20 sessions” elsewhere. The 2025 news/seed copy instead describes Special as three months/about five sessions and Anchor as ten months/about twenty.
- **Identified problem:** Duration and session counts conflict across program pages and news; the actual current offer cannot be determined from the source.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm current duration, session count, and distinctions between Special and Anchor. Publish one consistent description on program pages; label dated historical announcements as historical.
- **Reason:** Applicants need accurate expectations before choosing a program.

#### Mentee journey

- **Page name:** Mentee Journey
- **Page URL:** `/programs/mentorship/mentee-journey`
- **Component/file path:** `src/app/programs/mentorship/mentee-journey/page.js`
- **Existing content:** Journey introduction is repeated; the page promises a “personalized dashboard” and platform capabilities.
- **Identified problem:** Repeated introduction adds no new information. Dashboard and platform promises are not established as current functionality by this page source.
- **Recommended action:** **SHORTEN** and **VERIFY**
- **Suggested improved content:** Keep one introduction. Confirm each platform feature is currently available before describing it as part of the live journey; otherwise describe only verified steps.
- **Reason:** Removes redundant copy and avoids promising unavailable tools.

#### Mentor journey

- **Page name:** Mentor Journey
- **Page URL:** `/programs/mentorship/mentor-journey`
- **Component/file path:** `src/app/programs/mentorship/mentor-journey/page.js`
- **Existing content:** Benefits include “Escape the daily routine” and “Network expanding and Personal branding.”
- **Identified problem:** Wording is awkward and promotional rather than specific to the mentoring experience.
- **Recommended action:** **REWRITE**
- **Suggested improved content:** Use concise, concrete benefits, for example: “Build mentoring experience” and “Connect with other professionals.” Keep only benefits the program actually provides.
- **Reason:** Plain language is clearer and more credible.

#### Institution journey

- **Page name:** Institution Journey
- **Page URL:** `/programs/mentorship/institution-journey`
- **Component/file path:** `src/app/programs/mentorship/institution-journey/page.js`
- **Existing content:** “Higher employers satisfaction through social impact”; other sections promise a “personalized dashboard” and “SSO integration.”
- **Identified problem:** The benefit statement is unclear, and platform promises may not be implemented.
- **Recommended action:** **REWRITE** and **VERIFY**
- **Suggested improved content:** Rewrite the sentence only after confirming the intended outcome, for example, “Support student career development through mentorship.” Verify dashboard/SSO availability or remove those features from the described journey.
- **Reason:** Clear wording helps institutional visitors understand the offer without promising unconfirmed software.

#### Impact page

- **Page name:** Impact
- **Page URL:** `/impact`
- **Component/file path:** `src/app/impact/page.js`
- **Existing content:** Metrics include “3,200+ mentorship matches” and “85% student satisfaction”; a “Become a Partner” CTA links to `/volunteer`.
- **Identified problem:** Metrics need a dated source and definition. The CTA label and destination disagree. Additional named testimonials inside a commented-out section are not currently rendered.
- **Recommended action:** **VERIFY** metrics; **REWRITE** CTA; **KEEP** commented-out stories unpublished unless verified and intentionally restored
- **Suggested improved content:** Link “Become a Partner” to the relevant partner page. Publish only verified impact figures with a reporting date. Do not restore commented-out testimonials without checking attribution and consent.
- **Reason:** Correct routing and substantiated outcomes help visitors act on the information.

### News and partnerships

#### News and updates

- **Page name:** News
- **Page URL:** `/news`
- **Component/file path:** `src/app/news/page.js`; `src/app/api/news/route.js`; `scripts/seed-news.js`
- **Existing content:** The page fetches published news records from `/api/news`, but falls back to a hardcoded 2025 timeline when no items are returned. The seed script contains the same timeline.
- **Identified problem:** The fallback can make old entries appear current; live MongoDB content cannot be confirmed from source. News entries also contain legal, grant, and organization claims that need evidence.
- **Recommended action:** **VERIFY** and **REWRITE**
- **Suggested improved content:** Keep dated entries as a clearly labeled archive, or show a neutral empty state when no current news is available. Verify each claim and date against an approved source before seeding or publishing.
- **Reason:** Visitors should be able to distinguish current updates from historical announcements.

#### Partner pages

- **Page name:** Companies, CSO, Government, and Schools
- **Page URL:** `/partners/companies`, `/partners/cso`, `/partners/government`, `/partners/schools`
- **Component/file path:** `src/app/partners/companies/page.js`; `src/app/partners/cso/page.js`; `src/app/partners/government/page.js`; `src/app/partners/schools/page.js`
- **Existing content:** The pages repeat application/onboarding framing and promise contact “within 3-5 business days.” The Schools page also claims a “proven track record.”
- **Identified problem:** The same process language is repeated across category-specific pages; response time and track-record claims may no longer be accurate.
- **Recommended action:** **SHORTEN** and **VERIFY**
- **Suggested improved content:** Keep the unique benefits and requirements for each partner type. State the shared application process once in a concise form, and keep the response-time promise only if the team can meet it. Substantiate “proven track record” or remove it.
- **Reason:** Category-specific pages should explain the relevant partnership, while repeated boilerplate obscures those differences.

### Contact, support, and donations

#### Contact page

- **Page name:** Contact
- **Page URL:** `/contact`
- **Component/file path:** `src/app/contact/page.js`
- **Existing content:** “Registerd Address”; “Weekend more Focused, any time!”; social icons link to `#`. The page presents registered and IN:CUBATOR office addresses.
- **Identified problem:** There is a spelling error; the weekend wording is unclear and conflicts with weekday hours; icons do not open social profiles. Address labels/details need confirmation.
- **Recommended action:** **REWRITE** and **VERIFY**
- **Suggested improved content:** Change “Registerd Address” to “Registered address.” If weekend access is not confirmed, use “Contact us to ask about weekend availability.” Link icons to verified profiles or remove them. Confirm both addresses and distinguish registered from office/correspondence addresses.
- **Reason:** Accurate contact details and working links are essential; unclear hours can cause missed visits.

#### Support and donations

- **Page name:** Support
- **Page URL:** `/support`
- **Component/file path:** `src/app/support/page.js`; donation submission uses `/api/donation` and `src/models/Donation.js`
- **Existing content:** “85% / 10% / 5%” fund allocation, estimated impacts for €50/€150/€500, and named donor testimonials.
- **Identified problem:** Allocation and impact estimates need financial/source substantiation; donor testimonials need accurate attribution and consent. The implemented donation flow records donation details but no payment processor integration was found in the application source.
- **Recommended action:** **VERIFY**; **REMOVE** testimonials lacking attribution permission
- **Suggested improved content:** Explain the verified donation method and whether the form records an intention or completes a transaction. Keep estimates only with a documented basis and clear qualification. Retain testimonials only with confirmed attribution and consent.
- **Reason:** Donation decisions require clarity about how to give and how funds are described; do not imply online payment if the code only records a donation submission.

### Join-us and application pages

#### Find a job

- **Page name:** Find a Job
- **Page URL:** `/join-us/find-job`
- **Component/file path:** `src/app/join-us/find-job/page.js`
- **Existing content:** Hardcoded job cards show employer names, salaries, and relative posting dates; “Apply Now” buttons have no destinations. The resume form has no submit handler, and its file input is not required or connected to submission.
- **Identified problem:** The openings and details may be outdated or unverified, and the displayed application controls do not complete an application.
- **Recommended action:** **VERIFY** and **REMOVE** inactive listings/controls until functional
- **Suggested improved content:** Confirm each employer, role, salary, date, and application route. Keep only active, verified positions with a working application destination. If none are available, do not imply openings exist.
- **Reason:** Job seekers should not spend time on stale listings or nonfunctional application forms.

#### Find an internship

- **Page name:** Find an Internship
- **Page URL:** `/join-us/find-internship`
- **Component/file path:** `src/app/join-us/find-internship/page.js`
- **Existing content:** Hardcoded internship listings include “Apply Now” buttons without per-listing destinations. The form label says “Upload Documents (Resume, Transcript) *,” while validation requires “at least one document (Resume or Transcript).”
- **Identified problem:** Listing availability/terms need verification; the document label suggests both files are required while validation accepts either.
- **Recommended action:** **VERIFY** listings; **REWRITE** document instructions
- **Suggested improved content:** “Upload at least one: résumé or transcript (PDF, DOC, or DOCX; 10 MB total).” Keep each internship listing only when its dates, requirements, and application path are current and working.
- **Reason:** Applicants need consistent instructions and a functioning route for each opportunity.

#### Volunteer

- **Page name:** Volunteer
- **Page URL:** `/join-us/volunteer`
- **Component/file path:** `src/app/join-us/volunteer/page.js`
- **Existing content:** The page promises a reply “within 5-7 business days.” Role descriptions use different time units, while availability options are monthly hours, flexible, or one-time. A required checkbox agrees to “terms and conditions” without a link; optional newsletter acknowledgment is not included in the submitted `formData`.
- **Identified problem:** Response time may be unreliable; effort expectations are hard to compare; consent/communications promises are not linked and choices are not submitted.
- **Recommended action:** **VERIFY** response time/terms; **REWRITE** availability; ensure consent choices are actually captured or remove the unsupported checkbox language
- **Suggested improved content:** Keep the response-time statement only if operationally reliable. Explain availability in units that match each role. Link actual terms/privacy information and make the form record any required consent and newsletter choice.
- **Reason:** Volunteers need clear expectations, and consent language should be reviewable and reflect what the form records.

#### Become an ambassador

- **Page name:** Become an Ambassador
- **Page URL:** `/join-us/become-ambassador`
- **Component/file path:** `src/app/join-us/become-ambassador/page.js`
- **Existing content:** Role descriptions specify “5+ years industry experience,” “Age 18-25,” “5–10 hours/month,” and “6–12 month” terms.
- **Identified problem:** The requirements and time commitment are not substantiated elsewhere in the inspected source; the application does not collect age.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm the actual eligibility and commitment for each role. State the same confirmed requirements on the page and form. Remove numerical criteria that are not current; do not infer eligibility.
- **Reason:** Applicants should not be excluded or promised a commitment based on unconfirmed criteria.

#### Mentee/mentor application form

- **Page name:** Mentee Form
- **Page URL:** `/join-us/mentee-form`
- **Component/file path:** `src/app/join-us/mentee-form/page.js`; `src/components/mentee-form/CategorySelection.js`; `src/components/mentee-form/ApplicantProfile.js`; `src/components/mentee-form/FinalValidation.js`; `src/components/mentee-form/ApplicationReview.js`; `src/components/mentee-form/VideoUpload.js`
- **Existing content:** The category screen calls itself “Mentorship Feedback Form”; the route functions as a multi-step application and always adds “Application Review” for both mentees and mentors. Category labels include “6th or 10th Grade” and “11th or 12th Grade.” The form requires a video, recommends it be “under one minute,” and its success message promises a reward voucher “if eligible.”
- **Identified problem:** The purpose is unclear (application vs. feedback); required review questions can feel unrelated to applying. Grade labels leave grades 7–9 unclear. Video duration is not enforced as a stated maximum, and how the video is used/accessed is not explained beside the upload. Reward eligibility/timing is undefined.
- **Recommended action:** **VERIFY** eligibility, data use, and reward; **REWRITE** labels and clarify form purpose
- **Suggested improved content:** Decide whether this is an application or a feedback survey and title it accordingly. If grades 6–10 and 11–12 are intended, use “Grades 6–10” and “Grades 11–12”; otherwise list confirmed grades. Keep the 100 MB/file-type instructions, identify the one-minute limit as a recommendation unless enforced, and add verified information about video use/access before upload. Remove the voucher promise unless terms are confirmed.
- **Reason:** Clear purpose, eligibility, and data-use expectations are especially important for a required video and youth-facing form.

- **Page name:** Mentee Form
- **Page URL:** `/join-us/mentee-form`
- **Component/file path:** `src/components/mentee-form/ApplicantProfile.js`
- **Existing content:** “WhatsApp / Contact Number”
- **Identified problem:** It is unclear whether WhatsApp specifically is required or any phone number is acceptable.
- **Recommended action:** **REWRITE** after confirming contact needs
- **Suggested improved content:** If any phone number is acceptable, use “Phone number (include country code).” If WhatsApp is required, state that explicitly and why.
- **Reason:** Applicants should know which contact information is necessary.

#### Mentor-training enrollment

- **Page name:** Mentor Training Enrollment
- **Page URL:** `/mentor-training/enroll`
- **Component/file path:** `src/app/mentor-training/enroll/page.js`
- **Existing content:** “Begin your journey as a certified mentor”; form requires age with `min="18"`; after OTP it says “Application submitted successfully” and redirects to training, while the page also says review takes 24–48 hours. The terms/privacy notice is plain text, not linked.
- **Identified problem:** Enrollment is not the same as certification; the stated review timing/order is ambiguous relative to immediate training access; minimum age should be confirmed; policy links are not actionable.
- **Recommended action:** **REWRITE** and **VERIFY**
- **Suggested improved content:** Use “Enroll in mentor training” rather than implying certification before course completion. Confirm the 18+ requirement and state it consistently. Explain whether review occurs before or after course access and distinguish OTP email verification from application acceptance. Link the actual Terms and Privacy Policy.
- **Reason:** Clear sequencing prevents applicants from mistaking enrollment or email verification for acceptance or certification.

#### Mentor-training overview and course

- **Page name:** Mentor Training and Course
- **Page URL:** `/mentor-training/training`, `/mentor-training/course`
- **Component/file path:** `src/app/mentor-training/training/page.js`; `src/app/mentor-training/course/page.js`
- **Existing content:** Training describes an eight-week timeline and “4-8 weeks” of self-paced learning. Module 1 says 80% is required; module quiz feedback uses a 70% threshold; the final quiz requires 80%; another message says 70% is enough for the certificate. The FAQ promises a “real-world mentoring scenario project,” while the course flow contains videos, module quizzes, and a final 10-question quiz. The training page spells “Rapport” as “Repport.”
- **Identified problem:** Duration and assessment rules conflict, and the advertised project is not evident in the course flow inspected.
- **Recommended action:** **VERIFY** and **REWRITE**
- **Suggested improved content:** Confirm whether the week-by-week duration is required or illustrative. State one accurate rule for module quizzes and a separate, explicit certificate threshold. Confirm that the scenario project exists in the course; otherwise remove that FAQ item. Correct “Repport” to “Rapport.”
- **Reason:** Applicants need accurate expectations about time, assessment, and what the course includes.

#### Mentor-training completion

- **Page name:** Mentor Training Completion
- **Page URL:** `/mentor-training/completion`
- **Component/file path:** `src/app/mentor-training/completion/page.js`
- **Existing content:** “You’ve successfully completed” and “You are now a Certified Mentor”; the displayed certificate ID is generated on page load, while sending the email generates a new ID. The displayed certificate date uses the current date. “Download Guide,” “Join Community,” “View Schedule,” and “Access Tracker” links use `#`.
- **Identified problem:** Completion/certification is presented as fact even when the page can show generic mentor data; displayed and emailed IDs may differ; current date is not necessarily completion date; several resource links are inactive.
- **Recommended action:** **VERIFY** and **REWRITE**; **REMOVE** inactive links until destinations exist
- **Suggested improved content:** Display completion/certification wording, ID, and completion date only from confirmed persisted values. Label the date accurately. Link each resource to an actual destination or remove the control.
- **Reason:** Certificate details must be consistent and completion claims must reflect the recorded training state.

#### Get and view certificates

- **Page name:** Get Certificate
- **Page URL:** `/mentor-training/get-certificate`
- **Component/file path:** `src/app/mentor-training/get-certificate/page.js`
- **Existing content:** Claims a “verifiable certificate number,” “authentication seal,” and anytime online access.
- **Identified problem:** These statements imply a verification capability not established by the page content alone.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Keep the email retrieval instructions, but retain claims about verification/validity only after confirming the associated verification process. Do not call an ID “verifiable” unless a visitor can verify it.
- **Reason:** A clear retrieval flow is useful; authenticity claims must be supported by an actual mechanism.

- **Page name:** View Certificate
- **Page URL:** `/mentor-training/view-certificate`
- **Component/file path:** `src/app/mentor-training/view-certificate/page.js`
- **Existing content:** “This certificate has been verified and is valid”; page can create a random fallback certificate ID. It displays email, country, profession, LinkedIn, background/motivation, expertise, and experience.
- **Identified problem:** The content claims verification without a visible verification check in the page; a generated fallback ID is not a reliable persisted identifier. A shareable certificate displays personal details whose inclusion should be intentional.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm certificate status/ID before displaying validity language. Confirm which personal fields should be shown on a public/shareable certificate and explain their use before collection or retrieval.
- **Reason:** Visitors need accurate certificate status and clarity about the personal information displayed.

### Legal, compliance, and public documents

#### Privacy policy

- **Page name:** Privacy Policy
- **Page URL:** `/privacy-policy`
- **Component/file path:** `src/app/privacy-policy/page.js`
- **Existing content:** The policy says services are “not directed to individuals under the age of 16” and that it does not knowingly collect their information. A public MOU describes a youth program for ages 14–29, and the mentee flow includes school students.
- **Identified problem:** The intended minimum age, safeguards, and consent process may conflict across public materials.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** No replacement legal wording proposed. Have the responsible privacy/legal reviewer confirm minimum ages, safeguards, and consent requirements across the policy, MOU, forms, and program materials.
- **Reason:** Age-related privacy statements must be consistent and legally reviewed; do not casually rewrite them.

- **Page name:** Privacy Policy
- **Page URL:** `/privacy-policy`
- **Component/file path:** `src/app/privacy-policy/page.js`
- **Existing content:** GDPR bases are listed generically (“Consent,” “Contract,” “Legal Obligation,” “Legitimate Interests”). The policy also describes possible transfers outside the EEA and says safeguards will be used; cookie text describes browser controls.
- **Identified problem:** The policy does not connect legal bases to processing purposes, provide retention periods or detailed recipient categories, describe specific cookies/purposes, or give a complaint route in the inspected text. The companies MOU says personal data is securely stored within the EU; this may refer to a different aspect than transfer, but needs reconciliation.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** No legal replacement text proposed. Ask the privacy reviewer to map purposes to legal bases and confirm retention, recipients, cookies, complaint route, storage location, access, and any transfers/safeguards.
- **Reason:** These are substantive disclosures and should be completed by the responsible reviewer rather than shortened speculatively.

- **Page name:** Privacy Policy
- **Page URL:** `/privacy-policy`
- **Component/file path:** `src/app/privacy-policy/page.js`
- **Existing content:** Names a “Data Protection Officer” and gives `info@weslux.lu`; provides a contact address separate from registered-address wording in the RCS extract and MoUs.
- **Identified problem:** The source does not establish that the named role is formally appointed or that the contact/address details remain current.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm the role, contact channel, and distinction between registered and correspondence addresses with the responsible organization/legal contact. Do not rename the role or alter addresses without confirmation.
- **Reason:** Privacy contacts and official addresses must be accurate.

#### Public compliance PDFs

- **Page name:** Compliance reports / public organization documents
- **Page URL:** `/Compliance/RCS Extrait_gratuit_D_25_169699-1.pdf` (served from `public/Compliance/RCS Extrait_gratuit_D_25_169699-1.pdf`)
- **Component/file path:** `public/Compliance/RCS Extrait_gratuit_D_25_169699-1.pdf`
- **Existing content:** Three-page RCS extract dated 14/02/2025; it notes later changes may not be reflected.
- **Identified problem:** It may not represent the current organization record.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** No replacement document proposed. Confirm currentness with the official register and replace or date-label the public extract accordingly.
- **Reason:** Visitors may treat a public registry extract as current.

- **Page name:** Compliance reports / public organization documents
- **Page URL:** `/Compliance/RCS_AOA DossierDepot_25_52546-1.pdf` (served from `public/Compliance/RCS_AOA DossierDepot_25_52546-1.pdf`)
- **Component/file path:** `public/Compliance/RCS_AOA DossierDepot_25_52546-1.pdf`
- **Existing content:** PDF could not be text-extracted because it is AES-encrypted and the local extractor lacked its required cryptography dependency.
- **Identified problem:** Content, sensitivity, and currentness could not be assessed.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Have an authorized reviewer inspect the document and confirm it is appropriate for public access; no content recommendation is possible until reviewed.
- **Reason:** An unreadable document cannot be responsibly summarized or endorsed.

#### Public donor PDF

- **Page name:** Public donor document
- **Page URL:** `/doner/2025AID201 WES Luxembourg for Education (accord partiel - CRE).pdf`
- **Component/file path:** `public/doner/2025AID201 WES Luxembourg for Education (accord partiel - CRE).pdf`
- **Existing content:** Both pages are marked “Classification: RESTRICTED” and include personal contact/recipient information and financial details.
- **Identified problem:** Restricted material is in a publicly served directory.
- **Recommended action:** **REMOVE**
- **Suggested improved content:** Remove the restricted PDF from public serving or replace it only with an authorized, appropriately redacted version after review.
- **Reason:** This is a publication/access issue, not an opportunity to summarize or rewrite restricted content.

#### Public MoU templates

- **Page name:** Public partnership documents
- **Page URL:** `/MOU/WES CSO Mou.pdf`; `/MOU/WES Lux_MoU_With Companies.pdf`
- **Component/file path:** `public/MOU/WES CSO Mou.pdf`; `public/MOU/WES Lux_MoU_With Companies.pdf`
- **Existing content:** CSO MoU has blank date, partner name/address, and signature fields; it says it is “not legally binding” and permits extension by mutual written consent. Companies MoU has blank partner/effective-date and signature fields, automatic renewal, 30-day termination notice, and Luxembourg court jurisdiction.
- **Identified problem:** Both appear to be uncompleted templates, and their terms differ materially. The source does not establish which approved version is intended for public download.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** No contract wording proposed. Confirm with the authorized owner which template, if any, should be public; clearly label an approved blank template as a template and do not imply it is an executed agreement.
- **Reason:** Contract language and legal status must not be changed or represented without approval.

#### Public user-flow Markdown

- **Page name:** Public user-flow guides
- **Page URL:** `/user%20flow/MENTEE_FLOW.md`; `/user%20flow/MENTOR_FLOW.md`
- **Component/file path:** `public/user flow/MENTEE_FLOW.md`; `public/user flow/MENTOR_FLOW.md`
- **Existing content:** Guides describe recording “with consent,” algorithm-based matching, certificates, analytics, platform tools, and a mandatory GDPR/privacy agreement.
- **Identified problem:** The guides assert capabilities and consent/agreement flows that were not verified in the reviewed application source.
- **Recommended action:** **VERIFY**
- **Suggested improved content:** Confirm each described feature and consent step against the implemented platform and current policy. Label these files as conceptual flow documents if they are not descriptions of the live service; otherwise update them to match implementation.
- **Reason:** Public-facing documentation should not promise platform features or privacy controls that visitors cannot use.

### Repeated content: keep useful repetition, remove unnecessary duplication

| Content | Recommendation | Rationale |
|---|---|---|
| Contact details in Footer and Contact page | **KEEP** | Contact access in the footer is useful; ensure the information is current and the registered/office address distinction is clear. |
| Required documents and application steps on program pages and forms | **KEEP** | Repetition at the point of action helps applicants. Keep the same confirmed requirements in both places. |
| Mission and vision on About and Vision/Mission | **SHORTEN** on About; **KEEP** full text on dedicated page | A concise summary on About plus full formal wording on the dedicated route is clearer. |
| General “education-industry gap” messaging across Home/About/Impact/program pages | **SHORTEN** outside the Home hero | Keep the core statement once prominently; use other pages for their distinct details. |
| Impact metrics across Home/Impact/SDG | **VERIFY**, then use one dated source of truth | Repeat only consistent, defined figures; avoid conflicting numbers. |
| Partner onboarding and response-time copy on four partner pages | **SHORTEN** shared framing; **VERIFY** timing | Keep category-specific benefits on each route and repeat the response expectation only if operationally reliable. |
| Volunteer/newsletter consent and privacy statements | **KEEP** only where actionable and recorded | Required notices should be visible at relevant submission points; the form must record choices it claims to collect. |

## Shared public-facing components reviewed

| Component/file | Audit outcome |
|---|---|
| `src/components/home/Header.js` | Reviewed as sitewide navigation; no specific wording change flagged. Keep navigation routes accurate. |
| `src/components/home/Footer.js` | Copyright year, inactive Twitter link, and official details need attention; see Footer finding. |
| `src/components/home/Hero.js` | Keep concise core identity statement; avoid repeating it verbatim in every section. |
| `src/components/home/About.js` | “100+ Partner Schools” needs evidence; see impact metrics finding. |
| `src/components/home/ProgramDetails.js` | Keep program-specific information; avoid duplicating generic hero copy. |
| `src/components/home/Impact.js` | Metrics require source/date/definition; see impact metrics finding. |
| `src/components/home/SuccessStories.js` | Named testimonials/outcomes and photos require verification/consent. |
| `src/components/home/Partners.js` | No separate text recommendation flagged; ensure partner claims are verified. |
| `src/components/home/PartnersShowcase.js` | Generic partner names/logos need verification or removal. |
| `src/components/home/SDG.js` | Correct title/grammar and verify statistics. |
| `src/components/home/NewsEvents.js` | March 2026 cards are stale at audit date and controls lack destinations. |
| `src/components/home/CTA.js` | No standalone wording issue flagged; keep each call to action specific and correctly linked. |
| `src/components/SuccessModal.js` | Auto-closes after three seconds. **SHORTEN/REWRITE:** consider keeping application confirmation visible until dismissed, or allowing more reading time, so users do not miss next-step instructions. |
| `src/components/DocumentUpload.js` | Keep file type/size and progress instructions; ensure page-level wording matches the actual 10 MB total limit and at-least-one document rule. |
| `src/components/mentee-form/CategorySelection.js` | “Mentorship Feedback Form” and grade labels are covered in the Mentee Form finding; clarify the flow’s purpose and confirmed grade ranges. |
| `src/components/mentee-form/ApplicantProfile.js` | “WhatsApp / Contact Number” is covered above; clarify whether WhatsApp is required. |
| `src/components/mentee-form/FoundationLevel.js` | Foundation-level question content reviewed; no separate copy change flagged. Keep questions aligned with confirmed grade eligibility. |
| `src/components/mentee-form/BridgeLevel.js` | Bridge-level question content reviewed; no separate copy change flagged. Keep questions aligned with confirmed grade eligibility. |
| `src/components/mentee-form/LaunchLevel.js` | University-level question content reviewed; no separate copy change flagged. |
| `src/components/mentee-form/YoungProfessional.js` | Young-professional question content reviewed; no separate copy change flagged. |
| `src/components/mentee-form/MentorQuestions.js` | Mentor question content reviewed; no separate copy change flagged. |
| `src/components/mentee-form/FinalValidation.js` | Required video and common validation questions are covered above; make the video data-use notice clear before upload. |
| `src/components/mentee-form/ApplicationReview.js` | Required feedback ratings are part of the application/feedback ambiguity described above. |
| `src/components/mentee-form/VideoUpload.js` | Keep supported file types, 100 MB size limit, and upload instructions; explain verified use/access and distinguish the “under one minute” tip from an enforced limit. |

## Content sources and audit limits

- The `/news` route uses published MongoDB records from `/api/news` and has a hardcoded 2025 fallback; `scripts/seed-news.js` seeds a similar timeline. Source code cannot confirm live database contents or whether a seeded announcement remains current.
- Homepage news cards are separately hardcoded in `src/components/home/NewsEvents.js`.
- The donation form posts details to `/api/donation`; the source does not show a payment processor.
- The donor PDF is marked restricted and should not remain publicly served without authorization/redaction review.
- `RCS_AOA DossierDepot_25_52546-1.pdf` could not be text-extracted. The PNG under `public/doner/` was not assessed.
- Public MP4 course/tutorial files and image assets were not transcribed or independently reviewed for spoken/textual claims, accessibility captions, or image permissions. Review those media directly before relying on them as public information.
- No legal text, statistics, partner/donor identities, eligibility rules, response commitments, or program terms should be changed based on assumption. Obtain confirmation from the responsible owner first.

## Suggested implementation order

1. **Resolve sensitive and legal publication questions:** restricted donor PDF, privacy policy, MoU templates, age/consent statements, official organization identifiers and addresses.
2. **Verify public claims:** impact figures, testimonials, donor/partner names, grant, openings, program durations, response times, and certificate requirements.
3. **Fix immediate usability problems:** dead `#` links, incorrect CTA routes/labels, stale homepage news, and application controls that do not submit.
4. **Clarify application instructions:** internship documents, volunteer availability/consent, ambassador criteria, mentee form purpose/grade groups/video data use, and mentor-training sequence.
5. **Proofread and reduce duplication:** spelling/grammar, repeated mission text and generic messaging, while retaining useful contact details and point-of-action application guidance.

