// Script to seed existing news events into database
// Run this once: npm run seed:news

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

// News Schema
const newsSchema = new mongoose.Schema({
  month: { type: String, required: true },
  day: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Funding', 'Partnerships', 'Legal', 'Platform', 'Outreach', 'Recognition', 'Program'],
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  color: { 
    type: String, 
    enum: ['blue', 'green', 'purple', 'orange', 'indigo', 'teal', 'cyan', 'violet', 'pink', 'amber', 'emerald', 'red', 'yellow'],
    default: 'blue'
  },
  icon: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'published'],
    default: 'published'
  }
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model('News', newsSchema);

// Existing events from the page
const events = [
  {
    month: 'JAN',
    day: '2025',
    category: 'Program',
    title: 'Strategic Scope Defined - Mentorship Program Officially Targeted',
    description: 'WES Luxembourg reaffirmed its mission with target groups finalized: Children & school students, University students, and Early-career young professionals.',
    details: 'Aligned with UN SDGs 1, 4, 5, 8, and 10. Three distinct mentorship tracks established to serve different age groups and career stages.',
    color: 'blue',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    status: 'published'
  },
  {
    month: 'FEB',
    day: '2025',
    category: 'Legal',
    title: 'ASBL Registered with RCS - WES Luxembourg Officially Incorporated',
    description: 'Legal entity formation completed with Registre de Commerce et des Sociétés (RCS), Reference: L250052546.',
    details: 'Name: WES Luxembourg for Education ASBL. Two mentorship types defined: Special Mentorship (3 months, ~5 sessions) and Anchor Mentorship (10 months, ~20 sessions).',
    color: 'indigo',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    status: 'published'
  },
  {
    month: 'MAR',
    day: '2025',
    category: 'Program',
    title: 'Luxembourg Context Analysis Completed',
    description: 'Comprehensive analysis documented rationale for mentorship in Luxembourg\'s unique educational landscape.',
    details: 'Key findings: Luxembourg\'s highly international and multilingual environment has strong academic systems but limited real-world career exposure. WES positioned as support system for families, schools, and institutions.',
    color: 'purple',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    status: 'published'
  },
  {
    month: 'APR',
    day: '2025',
    category: 'Program',
    title: 'End-to-End Mentorship Journey Fully Mapped',
    description: 'Complete process designed covering the entire 10-month mentorship journey with milestones and feedback loops.',
    details: 'Journey includes: Profile creation → Application → Mentor review → Coordinator approval → Match confirmation → Initial meeting → Goal setting → Regular check-ins → Progress monitoring → Program evaluation.',
    color: 'green',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    status: 'published'
  },
  {
    month: 'MAY',
    day: '2025',
    category: 'Platform',
    title: 'Digital Platform Development Initiated',
    description: 'Advanced planning for web-based mentorship platform "Mentor Connect" covering registration, matching, and progress tracking.',
    details: 'Platform features: User registration, Profile creation, Mentor-mentee matching, Communication tools, Progress tracking dashboard. Collaboration initiated with technology partner.',
    color: 'cyan',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    status: 'published'
  },
  {
    month: 'JUN',
    day: '2025',
    category: 'Outreach',
    title: 'Major Corporate Outreach - Benevity Profile Approved',
    description: 'Outreach to Deloitte, EY, KPMG, PWC, Microsoft, Nvidia, Amazon. Benevity profile approved for corporate giving programs.',
    details: 'Benevity approval enables: Microsoft GIVE, Nvidia Foundation, Amazon Luxembourg mentorship support. Also reached out to Fondation Sommer and Generali Luxembourg. Initial institutional and mentor engagement groundwork laid.',
    color: 'blue',
    icon: 'M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    status: 'published'
  },
  {
    month: 'JUL',
    day: '2025',
    category: 'Partnerships',
    title: 'In-Person Meetings with KPMG Luxembourg and Sommer Foundation',
    description: 'Strategic partnership discussions held with KPMG Luxembourg and Fondation Sommer for program collaboration.',
    details: 'Face-to-face meetings established strong relationships with key partners. Discussed mentorship opportunities, corporate volunteer programs, and funding possibilities.',
    color: 'orange',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    status: 'published'
  },
  {
    month: 'AUG',
    day: '2025',
    category: 'Platform',
    title: 'Tech Partner Appointed - Mentor Connect App Architecture Finalized',
    description: 'Technical architect of the Mentorship App finalized. Tech partner appointed to build the Mentor Connect platform.',
    details: 'Resource mapping completed: Human resources (mentors, coordinators), Technical resources (platform, tools), Financial resources (platform development, outreach, monitoring). Outreach to EIB Institute initiated.',
    color: 'teal',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    status: 'published'
  },
  {
    month: 'SEP',
    day: '2025',
    category: 'Program',
    title: 'Pilot Survey Conducted with Luxembourg Students',
    description: 'Pilot strategy defined: 1 school, 1 university, 2-3 corporate partners. Concept note input collected from students and youth.',
    details: 'Potential mentors identified and verified. Capacity building explored with IN:CUBATOR, Social Business Incubator, SNJ Projetgo, and L\'Œuvre Nationale. Student feedback incorporated into program design.',
    color: 'violet',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    status: 'published'
  },
  {
    month: 'OCT',
    day: '2025',
    category: 'Outreach',
    title: 'Participated in Foire vum Jugendsecteur 2025',
    description: 'WES Luxembourg showcased programs at Luxembourg\'s premier youth sector fair, connecting with youth organizations and stakeholders.',
    details: 'Engaged with youth sector organizations, government representatives, and potential partners. Increased visibility within Luxembourg\'s youth ecosystem.',
    color: 'pink',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    status: 'published'
  },
  {
    month: 'NOV',
    day: '2025',
    category: 'Outreach',
    title: 'Reached Out to 13 Luxembourg High Schools',
    description: 'Comprehensive outreach campaign to 13 high schools across Luxembourg. Strategic meeting held with L\'Œuvre Nationale.',
    details: 'Schools contacted for pilot program participation. Presented mentorship program benefits to school administrators. Built foundation for institutional partnerships.',
    color: 'amber',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    status: 'published'
  },
  {
    month: 'NOV',
    day: '2025',
    category: 'Recognition',
    title: 'Selected for IN:CUBATOR Youth Entrepreneurship Incubator',
    description: 'WES Luxembourg selected and accepted into IN:CUBATOR program by Service National de la Jeunesse (SNJ).',
    details: 'Membership contract signed. Provides access to: Organizational capacity building, Professional mentorship for founders, Youth networking ecosystem in Luxembourg, Resources and support for scaling impact.',
    color: 'emerald',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    status: 'published'
  },
  {
    month: 'DEC',
    day: '2025',
    category: 'Funding',
    title: '22,000 EUR Funding Secured from L\'Œuvre Nationale',
    description: 'Major funding milestone achieved! L\'Œuvre Nationale de Secours Grande-Duchesse Charlotte awarded 22,000 EUR to support our programs.',
    details: 'This funding will support: Platform development costs, Outreach and marketing initiatives, Program coordination and management, Pilot program execution in 2026.',
    color: 'green',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    status: 'published'
  },
  {
    month: 'DEC',
    day: '2025',
    category: 'Partnerships',
    title: 'Partnership Secured with EY Luxembourg - Pilot Launch Roadmap Finalized',
    description: 'Strategic partnership with EY Luxembourg confirmed. Pilot program launch roadmap for 2026 finalized with clear milestones.',
    details: 'EY Luxembourg will provide: Corporate mentors from various departments, Support for program coordination, Potential funding and resources, Platform for student-professional connections.',
    color: 'blue',
    icon: 'M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    status: 'published'
  }
];

async function seedNews() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing news
    await News.deleteMany({});
    console.log('Cleared existing news');

    // Insert all events
    const result = await News.insertMany(events);
    console.log(`Successfully inserted ${result.length} news events`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding news:', error);
    process.exit(1);
  }
}

seedNews();
