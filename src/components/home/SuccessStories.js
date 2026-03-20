'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer at Amazon",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      story: "Through WES Luxembourg's mentorship program, I connected with an experienced tech leader who guided me through my career transition. Within 6 months, I landed my dream job at Amazon. The personalized guidance and industry insights were invaluable.",
      program: "Mentorship Program",
      year: "2024",
      achievement: "Career Transition Success",
      country: "Luxembourg"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Data Scientist at Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      story: "The Global Tech Connect program opened doors I never thought possible. I got to visit leading tech companies, network with industry professionals, and eventually secured a position at Microsoft. WES Luxembourg changed my life trajectory.",
      program: "Global Tech Connect",
      year: "2023",
      achievement: "International Career Growth",
      country: "India"
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "Product Manager at Google",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      story: "As a volunteer turned mentee, WES Luxembourg gave me the confidence and skills to pursue product management. My mentor helped me understand the tech industry better, and now I'm leading product initiatives at Google.",
      program: "Mentorship Program",
      year: "2024",
      achievement: "Role Transformation",
      country: "Spain"
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      role: "Startup Founder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      story: "The industrial visit program exposed me to real-world business operations. Combined with mentorship, I gained the knowledge and network to start my own tech company. We've now raised seed funding and are growing rapidly.",
      program: "Industrial Exposure Visit",
      year: "2023",
      achievement: "Entrepreneurship Success",
      country: "Egypt"
    },
    {
      id: 5,
      name: "Lisa Chen",
      role: "UX Designer at Apple",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      story: "WES Luxembourg's ambassador program helped me develop leadership skills while giving back to the community. The connections I made and experiences I gained led to my current role at Apple designing user experiences.",
      program: "Ambassador Program",
      year: "2024",
      achievement: "Design Career Launch",
      country: "Singapore"
    }
  ];

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transforming Lives Through{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from real people whose lives were transformed through our programs
          </p>
        </div>

        {/* Main Story Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 md:h-auto min-h-[400px] bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <Image
                  src={stories[activeStory].image}
                  alt={stories[activeStory].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {stories[activeStory].program}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {stories[activeStory].year}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stories[activeStory].name}
                  </h3>
                  <p className="text-blue-200 font-medium text-sm md:text-base">
                    {stories[activeStory].role}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Story Text */}
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                    {stories[activeStory].story}
                  </p>

                  {/* Achievement Badge */}
                  <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-sm">{stories[activeStory].achievement}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{stories[activeStory].country}</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={prevStory}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
                    aria-label="Previous story"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex space-x-2">
                    {stories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStory(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeStory
                            ? 'w-8 bg-blue-600'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to story ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextStory}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
                    aria-label="Next story"
                  >
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-xs md:text-sm text-gray-600">Lives Transformed</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-xs md:text-sm text-gray-600">Career Success Rate</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-xs md:text-sm text-gray-600">Countries Reached</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">100+</div>
            <div className="text-xs md:text-sm text-gray-600">Partner Companies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
