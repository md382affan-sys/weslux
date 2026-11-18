'use client';
import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components';
import Link from 'next/link';

export default function CompletionPage() {
  const [mentorData, setMentorData] = useState(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [certificateId, setCertificateId] = useState('');
  
  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Fetch mentor data from sessionStorage or email
  useEffect(() => {
    // Generate certificate ID on client side to avoid hydration mismatch
    setCertificateId(`WES-MENTOR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`);
    
    const fetchMentorData = async () => {
      try {
        console.log('Starting mentor data fetch...');
        
        // First, try to get stored data from sessionStorage
        const storedEmail = sessionStorage.getItem('mentorEmail');
        const storedData = sessionStorage.getItem('mentorData');
        
        console.log('Stored Email:', storedEmail);
        console.log('Stored Data:', storedData);
        
        // If we have stored data in sessionStorage, use it as immediate source
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            console.log('Parsed mentor data from sessionStorage:', parsedData);
            setMentorData(parsedData);
            return;
          } catch (parseError) {
            console.error('Error parsing stored data:', parseError);
          }
        }
        
        // If we have email, try to fetch from API
        if (storedEmail) {
          try {
            console.log('Fetching from API with email:', storedEmail);
            const response = await fetch(`/api/mentor-training/get-mentor-by-email?email=${encodeURIComponent(storedEmail)}`);
            
            if (response.ok) {
              const apiData = await response.json();
              console.log('Received data from API:', apiData);
              
              if (apiData.success) {
                setMentorData(apiData);
                return;
              }
            } else {
              console.warn('API response not OK:', response.status);
            }
          } catch (fetchError) {
            console.error('Error fetching from API:', fetchError);
          }
        }
        
        // If nothing worked, set empty data
        console.warn('No mentor data available');
        setMentorData({
          fullName: 'Mentor',
          country: 'N/A',
          profession: 'N/A',
          email: 'N/A',
          expertise: 'N/A',
          experience: 'N/A',
          whyMentor: 'N/A',
          linkedin: 'Not Provided'
        });
        
      } catch (error) {
        console.error('Unexpected error in fetchMentorData:', error);
        setMentorData({
          fullName: 'Mentor',
          country: 'N/A',
          profession: 'N/A',
          email: 'N/A',
          expertise: 'N/A',
          experience: 'N/A',
          whyMentor: 'N/A',
          linkedin: 'Not Provided'
        });
      }
    };

    fetchMentorData();
  }, []);

  const handleDownloadCertificate = async () => {
    try {
      setDownloadingPDF(true);
      
      // Dynamically import html2pdf
      const html2pdfModule = await import('html2pdf.js');
      const html2pdfLib = html2pdfModule.default;

      // Create a clean certificate HTML - A4 portrait fixed size (210mm x 297mm)
      const certificateHTML = `
        <div style="
          width: 210mm;
          height: 297mm;
          padding: 20mm;
          background-color: #fffbeb;
          background-image: linear-gradient(135deg, #fef3c7 0%, #fef08a 100%);
          border: 3mm solid #92400e;
          font-family: Georgia, serif;
          text-align: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0;
        ">
          <!-- Header with Logo -->
          <div style="margin-bottom: 10mm;">
            <img src="/image.png?v=2" alt="WES Logo" style="
              height: 30mm;
              width: auto;
              margin-bottom: 5mm;
            " />
            <h1 style="
              font-size: 28pt;
              font-weight: bold;
              color: #92400e;
              margin: 5mm 0;
            ">Certificate of Completion</h1>
            <p style="
              font-size: 16pt;
              color: #b45309;
              margin: 3mm 0;
            ">WES Mentorship Training Program</p>
            
            <!-- Decorative Line -->
            <div style="
              width: 60mm;
              height: 2mm;
              background-color: #92400e;
              margin: 5mm auto;
            "></div>
          </div>

          <!-- Body Content -->
          <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
            <p style="font-size: 12pt; color: #5a5a5a; margin: 3mm 0;">This is to certify that</p>
            
            <h2 style="
              font-size: 24pt;
              font-weight: bold;
              color: #92400e;
              margin: 5mm 0;
              border-bottom: 2mm solid #92400e;
              padding-bottom: 4mm;
            ">${mentorData?.fullName || '[Mentor Name]'}</h2>

            <p style="font-size: 11pt; color: #5a5a5a; margin: 3mm 0;">of <strong>${mentorData?.country || '[Country]'}</strong></p>
            
            <p style="font-size: 10pt; color: #666666; margin: 2mm 0;"><strong>Profession:</strong> ${mentorData?.profession || 'N/A'}</p>
            <p style="font-size: 10pt; color: #666666; margin: 2mm 0;"><strong>Email:</strong> ${mentorData?.email || 'N/A'}</p>
            <p style="font-size: 10pt; color: #666666; margin: 3mm 0;"><strong>LinkedIn:</strong> ${mentorData?.linkedin || 'Not Provided'}</p>

            <p style="font-size: 11pt; color: #5a5a5a; margin: 5mm 0 2mm 0;">has successfully completed the</p>
            <p style="font-size: 16pt; font-weight: bold; color: #92400e; margin: 3mm 0;">WES Mentorship Training Program</p>

            <p style="
              font-size: 9pt;
              color: #5a5a5a;
              line-height: 1.4;
              margin: 5mm 0;
              text-align: justify;
            ">This comprehensive training program equips mentors with essential skills including mentorship fundamentals, building trust and rapport, career development strategies, and measuring impact. The holder has demonstrated commitment to excellence in mentoring.</p>

            <!-- Profile Section -->
            <div style="
              background-color: #fcd34d;
              border: 1.5mm solid #92400e;
              border-radius: 3mm;
              padding: 5mm;
              margin: 5mm 0;
              text-align: left;
              font-size: 9pt;
            ">
              <p style="color: #5a5a5a; margin: 2mm 0;"><strong>Background:</strong> ${mentorData?.whyMentor || 'N/A'}</p>
              <p style="color: #5a5a5a; margin: 3mm 0 2mm 0;"><strong>Expertise:</strong> ${mentorData?.expertise || 'N/A'}</p>
              <p style="color: #5a5a5a; margin: 3mm 0 2mm 0;"><strong>Experience:</strong> ${mentorData?.experience || 'N/A'}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top: 10mm;">
            <!-- Decorative Line -->
            <div style="
              width: 60mm;
              height: 2mm;
              background-color: #92400e;
              margin: 5mm auto;
            "></div>

            <div style="
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 10mm;
              margin-top: 8mm;
              font-size: 10pt;
            ">
              <div style="text-align: center;">
                <p style="color: #666666; margin: 0 0 2mm 0; font-size: 8pt;">Date</p>
                <p style="
                  color: #92400e;
                  font-weight: bold;
                  border-top: 1.5mm solid #92400e;
                  padding-top: 2mm;
                  margin: 0;
                ">${formattedDate}</p>
              </div>

              <div style="text-align: center; font-size: 20pt; color: #92400e;">✓</div>

              <div style="text-align: center;">
                <p style="color: #666666; margin: 0 0 2mm 0; font-size: 8pt;">Verified</p>
                <p style="
                  color: #92400e;
                  font-weight: bold;
                  border-top: 1.5mm solid #92400e;
                  padding-top: 2mm;
                  margin: 0;
                ">✓ WES</p>
              </div>
            </div>

            <!-- Certificate ID -->
            <p style="
              font-size: 8pt;
              color: #999999;
              margin: 5mm 0 0 0;
            ">Certificate ID: ${certificateId}</p>
          </div>
        </div>
      `;

      const options = {
        margin: 0,
        filename: `WES_Certificate_${mentorData?.fullName?.replace(/\s+/g, '_') || 'Mentor'}_${new Date().getFullYear()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          orientation: 'portrait', 
          unit: 'mm', 
          format: 'a4'
        }
      };

      // Generate PDF using clean HTML string
      await html2pdfLib().set(options).from(certificateHTML).save();
      
      setSuccessMessage('✅ Certificate downloaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Unable to download as PDF. Please take a screenshot of the certificate instead.');
      setSuccessMessage('');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const handleSendCertificateEmail = async () => {
    try {
      setSendingEmail(true);

      if (!mentorData?.email) {
        alert('Email address not found');
        setSendingEmail(false);
        return;
      }

      const certificateId = `WES-MENTOR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Send certificate email via API
      const response = await fetch('/api/mentor-training/send-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: mentorData.email,
          fullName: mentorData.fullName,
          certificateId: certificateId,
          completionDate: formattedDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Certificate sent successfully to ${mentorData.email}!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending certificate email:', error);
      alert('Error sending certificate. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sitePage">
      <Header />
      
      <main className="flex-grow">
        {/* Celebration Section */}
        <section className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-block">
                  <div className="text-6xl animate-bounce mb-4">🎊</div>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                🎉 Congratulations!
              </h1>
              <p className="text-xl md:text-2xl mb-6 font-light">
                You've successfully completed the WES Mentorship Training Program
              </p>
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-md rounded-2xl px-8 py-4 border border-white border-opacity-30">
                <p className="text-lg text-black font-semibold">✨ You are now a Certified Mentor ✨</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Certificate Display */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📜 Your Certificate</h2>
                
                {/* Certificate Container */}
                <div 
                  className="border-4 border-amber-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                  id="certificate"
                  style={{
                    backgroundColor: '#fffbeb',
                    backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
                    aspectRatio: '210 / 297',
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden'
                  }}
                >
                  <div className="text-center h-full flex flex-col justify-between">
                    {/* Logo Section */}
                    <div>
                      <img 
                        src="/image.png?v=2" 
                        alt="WES Logo" 
                        style={{
                          height: '50px',
                          width: 'auto',
                          margin: '0 auto 8px'
                        }}
                        unoptimized
                      />
                      
                      {/* Certificate Title */}
                      <h3 className="text-2xl font-bold text-amber-900 mb-1">Certificate of Completion</h3>
                      <p className="text-amber-700 text-sm mb-3">WES Mentorship Training Program</p>

                      {/* Decorative Line */}
                      <div className="w-12 h-1 bg-amber-600 mx-auto mb-3"></div>
                    </div>

                    {/* Certificate Body */}
                    <div className="flex-grow flex flex-col justify-center">
                      <p className="text-gray-700 mb-1 font-semibold text-xs">This is to certify that</p>
                      <p className="text-xl font-bold text-amber-900 mb-2 border-b-2 border-amber-600 pb-2">
                        {mentorData?.fullName || '[Mentor Name]'}
                      </p>
                      <p className="text-gray-700 mb-1 text-xs">of {mentorData?.country || '[Country]'}</p>
                      <p className="text-xs text-gray-600 mb-1">
                        <strong>Profession:</strong> {mentorData?.profession || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600 mb-1">
                        <strong>Email:</strong> {mentorData?.email || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>LinkedIn:</strong> {mentorData?.linkedin || 'Not Provided'}
                      </p>
                      <p className="text-gray-700 mb-1 text-xs">has successfully completed the</p>
                      <p className="text-base font-bold text-amber-800 mb-2">WES Mentorship Training Program</p>
                      <p className="text-gray-700 leading-tight mb-2 text-xs">
                        This comprehensive training program equips mentors with essential skills in mentorship fundamentals, building trust, and career development strategies.
                      </p>
                      <div className="bg-amber-100 border-2 border-amber-600 rounded p-2 mt-2">
                        <p className="text-xs text-gray-700 mb-1"><strong>Background:</strong></p>
                        <p className="text-xs text-gray-600 mb-1 line-clamp-2">{mentorData?.whyMentor || 'N/A'}</p>
                        <p className="text-xs text-gray-700 mb-1"><strong>Expertise:</strong></p>
                        <p className="text-xs text-gray-600 mb-1 line-clamp-2">{mentorData?.expertise || 'N/A'}</p>
                        <p className="text-xs text-gray-700"><strong>Experience:</strong></p>
                        <p className="text-xs text-gray-600 line-clamp-2">{mentorData?.experience || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Decorative Line */}
                    <div className="w-12 h-1 bg-amber-600 mx-auto mb-3"></div>

                    {/* Date and Seal */}
                    <div>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="text-center">
                          <p className="text-gray-600 text-xs mb-1">Date</p>
                          <p className="text-amber-900 font-semibold border-t-2 border-amber-600 pt-1 text-xs">
                            {formattedDate}
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="text-xl text-amber-600">✓</span>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-xs mb-1">Verified</p>
                          <p className="text-amber-900 font-semibold border-t-2 border-amber-600 pt-1 text-xs">
                            ✓ WES
                          </p>
                        </div>
                      </div>

                      {/* Certificate Number */}
                      <p className="text-gray-500 text-xs">
                        ID: {certificateId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {successMessage && (
                  <div className="w-full bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-semibold">✅ {successMessage}</p>
                  </div>
                )}
                <button
                  onClick={handleDownloadCertificate}
                  disabled={downloadingPDF}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {downloadingPDF ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Certificate PDF
                    </>
                  )}
                </button>

                <button
                  onClick={handleSendCertificateEmail}
                  disabled={sendingEmail}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {sendingEmail ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Send Certificate Email
                    </>
                  )}
                </button>
  
              </div>

              {/* What's Next */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 What's Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Access Your Mentor Dashboard</h4>
                      <p className="text-gray-600 text-sm mt-1">Log in to view available mentees and start making an impact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Complete Your Profile</h4>
                      <p className="text-gray-600 text-sm mt-1">Add a profile picture and bio to help mentees connect with you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Get Matched with a Mentee</h4>
                      <p className="text-gray-600 text-sm mt-1">Review mentee profiles and request connections based on your expertise</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Start Mentoring</h4>
                      <p className="text-gray-600 text-sm mt-1">Schedule regular sessions, provide guidance, and help shape careers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 Mentor Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-3">📖 Mentorship Guide</h4>
                    <p className="text-gray-600 text-sm mb-4">Comprehensive guide with best practices, templates, and resources for ongoing mentoring</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm">Download Guide →</a>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-3">🤝 Community Forum</h4>
                    <p className="text-gray-600 text-sm mb-4">Connect with other mentors, share experiences, and get advice from the community</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm">Join Community →</a>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-3">💬 Monthly Webinars</h4>
                    <p className="text-gray-600 text-sm mb-4">Live training sessions on advanced mentoring topics and success stories from mentors</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm">View Schedule →</a>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-3">🎯 Progress Tracker</h4>
                    <p className="text-gray-600 text-sm mb-4">Track your mentees' progress and your impact on their professional development</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm">Access Tracker →</a>
                  </div>
                </div>
              </div>

              {/* Recognition Section */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-8 text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">🌟 You're Part of Something Special</h3>
                <p className="text-lg mb-6">
                  You've joined a global community of passionate mentors dedicated to empowering the next generation of professionals. Your dedication to mentorship will create lasting impact.
                </p>
                <p className="text-sm opacity-90">
                  Welcome to the WES Mentor Network! 🎓
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/mentor-training/training"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg text-center"
                >
                  Back to Training Overview
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-lg transition-all shadow-lg text-center"
                >
                  Explore WES Platform
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
