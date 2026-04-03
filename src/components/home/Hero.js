'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Unsplash images for education, mentorship, and professional growth
  const images = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80', // Students studying together
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80', // Team collaboration
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80', // Laptop and learning
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&q=80', // Professional workspace
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80', // Group discussion
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80', // Team meeting
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section 
      id="home" 
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[400px] pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 overflow-hidden"
    >
      {/* Background Images with Fade Transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: currentSlide === index ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Community • Education • Technology
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 px-4">
            We create paths where talent meets opportunity.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 md:mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
            WES Luxembourg for Education ASBL is a purpose driven association based in Luxembourg, dedicated to creating opportunities for personal and professional growth by developing a Mentorship Program that bridges education and professional reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link 
              href="/programs/mentorship" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:px-8 rounded-lg transition duration-300 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Mentorship
            </Link>
            <Link 
              href="/join-us/volunteer" 
              className="bg-transparent hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-6 md:px-8 rounded-lg border-2 border-white transition duration-300 text-sm md:text-base"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}