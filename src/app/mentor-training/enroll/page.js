'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components';
import Link from 'next/link';

export default function MentorEnrollPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    country: '',
    profession: '',
    experience: '',
    expertise: '',
    whyMentor: '',
    linkedin: '',
  });
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    // Validate all fields except OTP
    if (!formData.fullName || !formData.email || !formData.age || !formData.country || 
        !formData.profession || !formData.experience || !formData.expertise || !formData.whyMentor) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/mentor-training/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        setOtp('');
        setVerifyError('');
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOtp(value);
      setVerifyError('');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setVerifyError('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    setVerifyError('');

    try {
      const res = await fetch('/api/mentor-training/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setVerified(true);
        setOtpSent(false);
        
        // Store mentor email in sessionStorage for certificate page
        sessionStorage.setItem('mentorEmail', formData.email);
        sessionStorage.setItem('mentorData', JSON.stringify(formData));
        
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/mentor-training/training');
        }, 3000);
      } else {
        setVerifyError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setVerifyError('Failed to verify OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/mentor-training/verify-otp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setVerifyError('');
        setOtp('');
        setResendCooldown(60);
        const countdown = setInterval(() => {
          setResendCooldown(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setVerifyError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setVerifyError('Failed to resend OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (verified) {
    return (
      <div className="min-h-screen flex flex-col sitePage">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been verified. Welcome to the WES Mentorship Training Program!
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                ✓ Application submitted successfully
              </p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to training page...
            </p>
            <Link
              href="/mentor-training/training"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
            >
              Go to Training
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col sitePage">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Enroll in Mentorship Training
              </h1>
              <p className="text-lg text-gray-600">
                Begin your journey as a certified mentor. Fill in your details below and start making a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOTP} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={otpSent}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address * 
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={otpSent}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll send a verification code to this email</p>
                </div>

                {!otpSent && (
                  <>
                    {/* Age */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          min="18"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
                          placeholder="e.g., 30"
                        />
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
                          placeholder="e.g., Luxembourg"
                        />
                      </div>
                    </div>

                    {/* Profession */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Current Profession *
                      </label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="e.g., Software Engineer, Manager, Consultant"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="e.g., 5+ years in tech industry"
                      />
                    </div>

                    {/* Expertise */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Your Expertise *
                      </label>
                      <textarea
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all resize-none"
                        placeholder="Describe your skills and areas of expertise..."
                      />
                    </div>

                    {/* Why Mentor */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Why do you want to be a mentor? *
                      </label>
                      <textarea
                        name="whyMentor"
                        value={formData.whyMentor}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all resize-none"
                        placeholder="Share your motivation and what you want to contribute..."
                      />
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        LinkedIn Profile (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    {/* Send OTP Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                          Sending OTP...
                        </>
                      ) : (
                        'Send OTP to Email'
                      )}
                    </button>
                  </>
                )}

                {/* OTP Verification Section */}
                {otpSent && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-900">OTP Sent</p>
                        <p className="text-xs text-blue-700">Check your email for 6-digit code</p>
                      </div>
                    </div>

                    {verifyError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 text-sm">{verifyError}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Enter 6-Digit OTP Code *
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        maxLength="6"
                        className="w-full px-4 py-4 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all tracking-widest"
                        placeholder="000000"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-white font-bold rounded-lg transition-all"
                      >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                      >
                        Back
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-2">Didn't receive code?</p>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {resendCooldown > 0 
                          ? `Resend in ${resendCooldown}s` 
                          : 'Resend OTP'}
                      </button>
                    </div>

                    <p className="text-xs text-center text-gray-500">
                      ⏱️ Code expires in 10 minutes
                    </p>
                  </div>
                )}

                {!otpSent && (
                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Happens Next?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Email Verification</h4>
                  <p className="text-sm text-gray-600">Enter the OTP code from your email</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Application Review</h4>
                  <p className="text-sm text-gray-600">Our team reviews your application (24-48 hours)</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Get Certified</h4>
                  <p className="text-sm text-gray-600">Complete course and earn your mentor certificate</p>
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
