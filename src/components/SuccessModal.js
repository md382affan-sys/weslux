'use client';
import { useEffect } from 'react';

export default function SuccessModal({ isOpen, onClose, message = "Your message has been sent successfully!" }) {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn px-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scaleIn">
        {/* Success Icon with Animation */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative">
            {/* Outer Circle Animation */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center animate-ping absolute"></div>
            
            {/* Main Success Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center relative animate-bounceIn">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-white animate-checkmark" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                  className="animate-drawCheck"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-2 animate-slideUp">
          Success!
        </h3>
        <p className="text-sm md:text-base text-gray-600 text-center animate-slideUp animation-delay-100">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 md:mt-6 w-full px-6 py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
        >
          Close
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes drawCheck {
          0% {
            stroke-dasharray: 0, 100;
          }
          100% {
            stroke-dasharray: 100, 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-drawCheck {
          stroke-dasharray: 100;
          animation: drawCheck 0.6s ease-out 0.3s forwards;
        }

        .animate-checkmark {
          stroke-dasharray: 0;
        }
      `}</style>
    </div>
  );
}
