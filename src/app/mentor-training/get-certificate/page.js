'use client';
import { useState } from 'react';
import { Header, Footer } from '@/components';
import Link from 'next/link';

export default function GetCertificatePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const response = await fetch('/api/mentor-training/resend-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`✅ Certificate sent successfully to ${email}! Check your inbox for the certificate link.`);
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Failed to send certificate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sitePage">
      <Header />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                📜 Get Your Certificate
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                If you've already completed the WES Mentorship Training Program, retrieve your certificate here.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="text-green-800 font-semibold text-sm">{successMessage}</p>
                  <p className="text-green-700 text-xs mt-2">
                    A certificate link has been sent to your email. The link allows you to view and download your certificate.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="text-red-800 font-semibold text-sm">{errorMessage}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-900 font-semibold mb-2">
                    Enter Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Enter the email address you used to enroll in the training program.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Sending Certificate...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Send Certificate to Email
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Don't have your certificate yet?
                </p>
                <Link
                  href="/mentor-training/enroll"
                  className="block w-full text-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors"
                >
                  Start Training Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ How It Works</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Email</h3>
                  <p className="text-gray-600 text-sm">
                    Provide the email address you used when enrolling in the training program.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Receive Email</h3>
                  <p className="text-gray-600 text-sm">
                    We'll send you an email with a personalized link to view your certificate.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">View & Download</h3>
                  <p className="text-gray-600 text-sm">
                    Click the link to view your certificate online and download it as a PDF.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎓 Your Certificate Includes</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Your Full Details</h4>
                    <p className="text-gray-600 text-sm">Name, country, profession, and expertise displayed on the certificate</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">WES Logo</h4>
                    <p className="text-gray-600 text-sm">Official WES branding and authentication seal</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Unique Certificate ID</h4>
                    <p className="text-gray-600 text-sm">Verifiable certificate number for authenticity</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">PDF Download</h4>
                    <p className="text-gray-600 text-sm">Download and share your certificate easily</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">A4 Format</h4>
                    <p className="text-gray-600 text-sm">Professional certificate on standard A4 page</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Online Viewable</h4>
                    <p className="text-gray-600 text-sm">Access your certificate anytime, anywhere</p>
                  </div>
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
