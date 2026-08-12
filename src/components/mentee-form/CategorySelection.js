'use client';

import { useState } from 'react';

export default function CategorySelection({ onSelect }) {
  const [roleSelected, setRoleSelected] = useState(null); // null, 'mentee', or 'mentor'

  const handleRoleSelect = (role) => {
    setRoleSelected(role);
  };

  const handleBackToRoles = () => {
    setRoleSelected(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            WES Luxembourg
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Mentorship Program Registration
          </h2>
          <p className="text-xl text-gray-600">
            {roleSelected === null ? 'Choose your role' : 
             roleSelected === 'mentee' ? 'Select your education level' :
             'Become a Mentor'}
          </p>
        </div>

        {/* Step 1: Role Selection (Mentee vs Mentor) */}
        {roleSelected === null && (
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Mentee Section */}
            <button
              onClick={() => handleRoleSelect('mentee')}
              className="group bg-white p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
            >
              <div className="mb-6 flex justify-center">
                <svg className="w-24 h-24 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Join as Mentee</h3>
              <p className="text-gray-600 text-lg">Get guidance and mentorship for your career journey</p>
            </button>

            {/* Mentor Section */}
            <button
              onClick={() => handleRoleSelect('mentor')}
              className="group bg-white p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500"
            >
              <div className="mb-6 flex justify-center">
                <svg className="w-24 h-24 text-indigo-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Join as Mentor</h3>
              <p className="text-gray-600 text-lg">Share your experience and guide the next generation</p>
            </button>
          </div>
        )}

        {/* Step 2: Mentee Education Level Selection */}
        {roleSelected === 'mentee' && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              {/* 6th or 10th Grade */}
              <button
                onClick={() => onSelect('6th-10th')}
                className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-500"
              >
                <div className="mb-6 flex justify-center">
                  <svg className="w-20 h-20 text-green-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">6th or 10th Grade</h3>
                <p className="text-gray-600 text-lg">Foundation Level</p>
              </button>

              {/* 11th or 12th Grade */}
              <button
                onClick={() => onSelect('11th-12th')}
                className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-500"
              >
                <div className="mb-6 flex justify-center">
                  <svg className="w-20 h-20 text-purple-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">11th or 12th Grade</h3>
                <p className="text-gray-600 text-lg">Bridge Level</p>
              </button>

              {/* University Student */}
              <button
                onClick={() => onSelect('university')}
                className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
              >
                <div className="mb-6 flex justify-center">
                  <svg className="w-20 h-20 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">University Student</h3>
                <p className="text-gray-600 text-lg">Launch Level</p>
              </button>

              {/* Young Professional */}
              <button
                onClick={() => onSelect('young-professional')}
                className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-500"
              >
                <div className="mb-6 flex justify-center">
                  <svg className="w-20 h-20 text-orange-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Young Professional</h3>
                <p className="text-gray-600 text-lg">Career Growth</p>
              </button>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <button
                onClick={handleBackToRoles}
                className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                ← Back to Roles
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Mentor Direct Selection */}
        {roleSelected === 'mentor' && (
          <div>
            <button
              onClick={() => onSelect('mentor')}
              className="group bg-white p-16 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500 max-w-xl mx-auto block w-full"
            >
              <div className="mb-8 flex justify-center">
                <svg className="w-32 h-32 text-indigo-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Become a Mentor</h3>
              <p className="text-gray-600 text-xl mb-2">Share your expertise and experience</p>
              <p className="text-gray-500 text-lg">Help guide mentees on their journey</p>
            </button>

            {/* Back Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleBackToRoles}
                className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                ← Back to Roles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
