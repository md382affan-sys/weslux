'use client';
import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components';

export default function NewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Funding', 'Partnerships', 'Legal', 'Platform', 'Outreach', 'Recognition', 'Program'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success) {
        setEvents(data.news);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  const hardcodedEvents = [
    {
      id: 1,
      month: 'JAN',
      day: '2025',
      category: 'Program',
      title: 'Strategic Scope Defined - Mentorship Program Officially Targeted',
      description: 'WES Luxembourg reaffirmed its mission with target groups finalized: Children & school students, University students, and Early-career young professionals.',
      details: 'Aligned with UN SDGs 1, 4, 5, 8, and 10. Three distinct mentorship tracks established to serve different age groups and career stages.',
      color: 'blue',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      id: 2,
      month: 'FEB',
      day: '2025',
      category: 'Legal',
      title: 'ASBL Registered with RCS - WES Luxembourg Officially Incorporated',
      description: 'Legal entity formation completed with Registre de Commerce et des Sociétés (RCS), Reference: L250052546.',
      details: 'Name: WES Luxembourg for Education ASBL. Two mentorship types defined: Special Mentorship (3 months, ~5 sessions) and Anchor Mentorship (10 months, ~20 sessions).',
      color: 'indigo',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      id: 3,
      month: 'MAR',
      day: '2025',
      category: 'Program',
      title: 'Luxembourg Context Analysis Completed',
      description: 'Comprehensive analysis documented rationale for mentorship in Luxembourg\'s unique educational landscape.',
      details: 'Key findings: Luxembourg\'s highly international and multilingual environment has strong academic systems but limited real-world career exposure. WES positioned as support system for families, schools, and institutions.',
      color: 'purple',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    },
    {
      id: 4,
      month: 'APR',
      day: '2025',
      category: 'Program',
      title: 'End-to-End Mentorship Journey Fully Mapped',
      description: 'Complete process designed covering the entire 10-month mentorship journey with milestones and feedback loops.',
      details: 'Journey includes: Profile creation → Application → Mentor review → Coordinator approval → Match confirmation → Initial meeting → Goal setting → Regular check-ins → Progress monitoring → Program evaluation.',
      color: 'green',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
    },
    {
      id: 5,
      month: 'MAY',
      day: '2025',
      category: 'Platform',
      title: 'Digital Platform Development Initiated',
      description: 'Advanced planning for web-based mentorship platform "Mentor Connect" covering registration, matching, and progress tracking.',
      details: 'Platform features: User registration, Profile creation, Mentor-mentee matching, Communication tools, Progress tracking dashboard. Collaboration initiated with technology partner.',
      color: 'cyan',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      id: 6,
      month: 'JUN',
      day: '2025',
      category: 'Outreach',
      title: 'Major Corporate Outreach - Benevity Profile Approved',
      description: 'Outreach to Deloitte, EY, KPMG, PWC, Microsoft, Nvidia, Amazon. Benevity profile approved for corporate giving programs.',
      details: 'Benevity approval enables: Microsoft GIVE, Nvidia Foundation, Amazon Luxembourg mentorship support. Also reached out to Fondation Sommer and Generali Luxembourg. Initial institutional and mentor engagement groundwork laid.',
      color: 'blue',
      icon: 'M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      id: 7,
      month: 'JUL',
      day: '2025',
      category: 'Partnerships',
      title: 'In-Person Meetings with KPMG Luxembourg and Sommer Foundation',
      description: 'Strategic partnership discussions held with KPMG Luxembourg and Fondation Sommer for program collaboration.',
      details: 'Face-to-face meetings established strong relationships with key partners. Discussed mentorship opportunities, corporate volunteer programs, and funding possibilities.',
      color: 'orange',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      id: 8,
      month: 'AUG',
      day: '2025',
      category: 'Platform',
      title: 'Tech Partner Appointed - Mentor Connect App Architecture Finalized',
      description: 'Technical architect of the Mentorship App finalized. Tech partner appointed to build the Mentor Connect platform.',
      details: 'Resource mapping completed: Human resources (mentors, coordinators), Technical resources (platform, tools), Financial resources (platform development, outreach, monitoring). Outreach to EIB Institute initiated.',
      color: 'teal',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    },
    {
      id: 9,
      month: 'SEP',
      day: '2025',
      category: 'Program',
      title: 'Pilot Survey Conducted with Luxembourg Students',
      description: 'Pilot strategy defined: 1 school, 1 university, 2-3 corporate partners. Concept note input collected from students and youth.',
      details: 'Potential mentors identified and verified. Capacity building explored with IN:CUBATOR, Social Business Incubator, SNJ Projetgo, and L\'Œuvre Nationale. Student feedback incorporated into program design.',
      color: 'violet',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
    },
    {
      id: 10,
      month: 'OCT',
      day: '2025',
      category: 'Outreach',
      title: 'Participated in Foire vum Jugendsecteur 2025',
      description: 'WES Luxembourg showcased programs at Luxembourg\'s premier youth sector fair, connecting with youth organizations and stakeholders.',
      details: 'Engaged with youth sector organizations, government representatives, and potential partners. Increased visibility within Luxembourg\'s youth ecosystem.',
      color: 'pink',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      id: 11,
      month: 'NOV',
      day: '2025',
      category: 'Outreach',
      title: 'Reached Out to 13 Luxembourg High Schools',
      description: 'Comprehensive outreach campaign to 13 high schools across Luxembourg. Strategic meeting held with L\'Œuvre Nationale.',
      details: 'Schools contacted for pilot program participation. Presented mentorship program benefits to school administrators. Built foundation for institutional partnerships.',
      color: 'amber',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      id: 12,
      month: 'NOV',
      day: '2025',
      category: 'Recognition',
      title: 'Selected for IN:CUBATOR Youth Entrepreneurship Incubator',
      description: 'WES Luxembourg selected and accepted into IN:CUBATOR program by Service National de la Jeunesse (SNJ).',
      details: 'Membership contract signed. Provides access to: Organizational capacity building, Professional mentorship for founders, Youth networking ecosystem in Luxembourg, Resources and support for scaling impact.',
      color: 'emerald',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    },
    {
      id: 13,
      month: 'DEC',
      day: '2025',
      category: 'Funding',
      title: '22,000 EUR Funding Secured from L\'Œuvre Nationale',
      description: 'Major funding milestone achieved! L\'Œuvre Nationale de Secours Grande-Duchesse Charlotte awarded 22,000 EUR to support our programs.',
      details: 'This funding will support: Platform development costs, Outreach and marketing initiatives, Program coordination and management, Pilot program execution in 2026.',
      color: 'green',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 14,
      month: 'DEC',
      day: '2025',
      category: 'Partnerships',
      title: 'Partnership Secured with EY Luxembourg - Pilot Launch Roadmap Finalized',
      description: 'Strategic partnership with EY Luxembourg confirmed. Pilot program launch roadmap for 2026 finalized with clear milestones.',
      details: 'EY Luxembourg will provide: Corporate mentors from various departments, Support for program coordination, Potential funding and resources, Platform for student-professional connections.',
      color: 'blue',
      icon: 'M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    }
  ];

  // Use hardcoded events as fallback if DB is empty
  const displayEvents = events.length > 0 ? events : hardcodedEvents;

  const filteredEvents = selectedFilter === 'All' 
    ? displayEvents 
    : displayEvents.filter(event => event.category === selectedFilter);

  const colorClasses = {
    blue: {
      bg: 'from-blue-400 to-blue-600',
      badge: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      border: 'border-blue-600',
      text: 'text-blue-600'
    },
    green: {
      bg: 'from-green-400 to-green-600',
      badge: 'bg-green-100 text-green-600',
      button: 'bg-green-600 hover:bg-green-700',
      border: 'border-green-600',
      text: 'text-green-600'
    },
    purple: {
      bg: 'from-purple-400 to-purple-600',
      badge: 'bg-purple-100 text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      border: 'border-purple-600',
      text: 'text-purple-600'
    },
    orange: {
      bg: 'from-orange-400 to-orange-600',
      badge: 'bg-orange-100 text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700',
      border: 'border-orange-600',
      text: 'text-orange-600'
    },
    indigo: {
      bg: 'from-indigo-400 to-indigo-600',
      badge: 'bg-indigo-100 text-indigo-600',
      button: 'bg-indigo-600 hover:bg-indigo-700',
      border: 'border-indigo-600',
      text: 'text-indigo-600'
    },
    teal: {
      bg: 'from-teal-400 to-teal-600',
      badge: 'bg-teal-100 text-teal-600',
      button: 'bg-teal-600 hover:bg-teal-700',
      border: 'border-teal-600',
      text: 'text-teal-600'
    },
    cyan: {
      bg: 'from-cyan-400 to-cyan-600',
      badge: 'bg-cyan-100 text-cyan-600',
      button: 'bg-cyan-600 hover:bg-cyan-700',
      border: 'border-cyan-600',
      text: 'text-cyan-600'
    },
    violet: {
      bg: 'from-violet-400 to-violet-600',
      badge: 'bg-violet-100 text-violet-600',
      button: 'bg-violet-600 hover:bg-violet-700',
      border: 'border-violet-600',
      text: 'text-violet-600'
    },
    pink: {
      bg: 'from-pink-400 to-pink-600',
      badge: 'bg-pink-100 text-pink-600',
      button: 'bg-pink-600 hover:bg-pink-700',
      border: 'border-pink-600',
      text: 'text-pink-600'
    },
    amber: {
      bg: 'from-amber-400 to-amber-600',
      badge: 'bg-amber-100 text-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700',
      border: 'border-amber-600',
      text: 'text-amber-600'
    },
    emerald: {
      bg: 'from-emerald-400 to-emerald-600',
      badge: 'bg-emerald-100 text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      border: 'border-emerald-600',
      text: 'text-emerald-600'
    },
    red: {
      bg: 'from-red-400 to-red-600',
      badge: 'bg-red-100 text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
      border: 'border-red-600',
      text: 'text-red-600'
    },
    yellow: {
      bg: 'from-yellow-400 to-yellow-600',
      badge: 'bg-yellow-100 text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700',
      border: 'border-yellow-600',
      text: 'text-yellow-600'
    }
  };

  return (
    <div className="min-h-screen flex flex-col sitePage">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                News & <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Events</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Our journey through 2025 - milestones, partnerships, and achievements
              </p>
            </div>
          </div>
        </section>

        {/* Key Achievements Banner */}
        <section className="py-8 md:py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">2025 Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">22K€</div>
                  <div className="text-xs md:text-sm opacity-90">Funding Secured</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">13</div>
                  <div className="text-xs md:text-sm opacity-90">Schools Contacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">7+</div>
                  <div className="text-xs md:text-sm opacity-90">Corporate Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">14</div>
                  <div className="text-xs md:text-sm opacity-90">Major Milestones</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-white sticky top-0 z-20 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
                      selectedFilter === category
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Events */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12">
                {selectedFilter === 'All' ? '2025 Timeline' : `${selectedFilter} Updates`}
              </h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  <p className="mt-4 text-gray-600">Loading news...</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                  </svg>
                  <p className="text-gray-600">No news found for this category.</p>
                </div>
              ) : (
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {filteredEvents.map((event) => {
                  const colors = colorClasses[event.color] || colorClasses.blue;
                  const isExpanded = expandedCard === (event._id || event.id);
                  
                  return (
                    <div 
                      key={event._id || event.id}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 ${colors.border}`}
                    >
                      <div className={`h-32 md:h-40 bg-gradient-to-br ${colors.bg} flex items-center justify-center relative`}>
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={event.icon}></path>
                        </svg>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                          {event.month} {event.day}
                        </div>
                      </div>
                      
                      <div className="p-4 md:p-6">
                        <div className={`inline-block px-3 py-1 ${colors.badge} rounded-full text-xs font-semibold mb-3`}>
                          {event.category}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 mb-4">
                          {event.description}
                        </p>
                        
                        {isExpanded && (
                          <div className="bg-gray-50 p-4 rounded-lg mb-4 animate-fadeIn">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {event.details}
                            </p>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setExpandedCard(isExpanded ? null : (event._id || event.id))}
                          className={`${colors.text} font-semibold text-sm hover:underline flex items-center`}
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                          <svg 
                            className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Stay Updated</h2>
                <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
                  Subscribe to our newsletter to receive the latest news, event announcements, and success stories directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                  />
                  <button className="px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 whitespace-nowrap font-semibold text-sm md:text-base shadow-lg hover:shadow-xl">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
