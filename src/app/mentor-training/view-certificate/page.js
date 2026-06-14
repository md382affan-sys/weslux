'use client';
import { useState, useEffect, Suspense } from 'react';
import { Header, Footer } from '@/components';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ViewCertificateContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [certificateId, setCertificateId] = useState('');
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Fetch mentor data
  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        if (!email) {
          setError('Email parameter is missing');
          setLoading(false);
          return;
        }

        // Fetch mentor data from API
        const response = await fetch(`/api/mentor-training/get-mentor-by-email?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          setError('Certificate not found for this email');
          setLoading(false);
          return;
        }

        const data = await response.json();
        
        if (!data.success) {
          setError('Unable to retrieve certificate details');
          setLoading(false);
          return;
        }

        setMentorData(data);
        setCertificateId(data.certificateId || `WES-MENTOR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Failed to load certificate');
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [email]);

  const handleDownloadCertificate = async () => {
    try {
      setDownloadingPDF(true);
      
      const html2pdfModule = await import('html2pdf.js');
      const html2pdfLib = html2pdfModule.default;

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

      await html2pdfLib().set(options).from(certificateHTML).save();
      
      setSuccessMessage('✅ Certificate downloaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Unable to download as PDF. Please take a screenshot of the certificate instead.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading your certificate...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-md text-center">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8 mb-6">
              <p className="text-red-800 font-semibold text-lg">❌ {error}</p>
            </div>
            <Link
              href="/mentor-training/enroll"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg inline-block"
            >
              Go Back to Enrollment
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Celebration Section */}
        <section className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-4">
                <div className="inline-block text-5xl animate-bounce">🎊</div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                🎉 Your WES Certificate!
              </h1>
              <p className="text-lg md:text-xl mb-4">
                Congratulations on completing the WES Mentorship Training Program
              </p>
            </div>
          </div>
        </section>

        {/* Certificate Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Certificate Display */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📜 Your Certificate</h2>
                
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

              {/* Download Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🎓 Certificate Verified</h3>
                <p className="text-gray-700 mb-4">
                  This certificate has been verified and is valid for the WES Mentorship Training Program.
                </p>
                <p className="text-sm text-gray-600">
                  Certificate ID: <span className="font-mono font-bold text-blue-600">{certificateId}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ViewCertificatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading your certificate...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ViewCertificateContent />
    </Suspense>
  );
}
