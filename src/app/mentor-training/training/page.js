'use client';
import { Header, Footer } from '@/components';
import Link from 'next/link';

export default function TrainingPage() {
  return (
    <div className="min-h-screen flex flex-col sitePage">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                🎉 Email Verified Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Welcome to the WES Mentorship Training Program. Your journey as a certified mentor begins now!
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">


              {/* Training Overview */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 What You'll Learn</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-amber-600 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Mentorship Fundamentals</h4>
                    <p className="text-gray-600 text-sm">
                      Learn the core principles of effective mentorship, including active listening, goal-setting, and feedback delivery.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-amber-600 transition-colors">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Building Trust & Repport</h4>
                    <p className="text-gray-600 text-sm">
                      Master techniques to create a safe, supportive environment where mentees feel comfortable sharing their challenges.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-amber-600 transition-colors">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Career Development Strategies</h4>
                    <p className="text-gray-600 text-sm">
                      Explore practical strategies to help mentees identify and achieve their professional goals and career aspirations.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-amber-600 transition-colors">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Measuring Impact</h4>
                    <p className="text-gray-600 text-sm">
                      Learn how to track progress, celebrate wins, and evaluate the effectiveness of your mentorship relationships.
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Timeline */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">⏱️ Course Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">Week 1-2: Foundation</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Introduction to mentorship principles, communication skills, and relationship building techniques.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">Week 3-4: Skill Development</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Master goal-setting, problem-solving, and providing constructive feedback to mentees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">Week 5-6: Advanced Topics</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Explore advanced mentoring strategies, handling difficult conversations, and long-term relationship management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        4
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">Week 7-8: Certification</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Final projects, assessments, and certification ceremony. You'll be ready to mentor!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ Key Benefits</h3>
                <ul className="space-y-3">
                  {[
                    '4-8 weeks of comprehensive, self-paced learning',
                    'Access to exclusive mentor training materials and resources',
                    'Interactive modules with real-world mentoring scenarios',
                    'Certification upon successful completion',
                    'Join a global community of certified mentors',
                    'Opportunity to mentor and impact young professionals',
                    'Ongoing support and mentorship resources',
                    'Certificate badge for LinkedIn and professional profiles'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Start Course CTA */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-8 mb-8 shadow-2xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">🎓 Begin Your Training Now</h3>
                  <p className="text-lg mb-6">Start with Module 1: Mentorship Fundamentals and progress through the certification course.</p>
                  <Link
                    href="/mentor-training/course"
                    className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-green-600 font-bold rounded-lg transition-all shadow-lg text-lg"
                  >
                    ▶ Start Training Course →
                  </Link>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4">📌 Training Overview</h3>
                <ol className="space-y-3 ml-6 list-decimal">
                  <li className="text-lg">
                    Complete Module 1: Watch the training video and pass the quiz (80% required)
                  </li>
                  <li className="text-lg">
                    Progress through additional modules at your own pace (self-paced learning)
                  </li>
                  <li className="text-lg">
                    Complete all modules, assignments, and the final assessment
                  </li>
                  <li className="text-lg">
                    Receive your Mentor Certification and access to the mentor network
                  </li>
                  <li className="text-lg">
                    Start mentoring and making a difference in mentees' lives!
                  </li>
                </ol>
              </div>

              {/* FAQ Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <details className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-amber-600 transition-colors group">
                    <summary className="font-bold text-gray-900 flex items-center justify-between">
                      How long does the training take?
                      <span className="group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-4">
                      The training program is self-paced and typically takes 4-8 weeks to complete, depending on your pace and engagement level.
                    </p>
                  </details>

                  <details className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-amber-600 transition-colors group">
                    <summary className="font-bold text-gray-900 flex items-center justify-between">
                      Is the training free?
                      <span className="group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-4">
                      Yes! The WES Mentorship Training Program is completely free for all participants. This is part of our commitment to empowering mentors.
                    </p>
                  </details>

                  <details className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-amber-600 transition-colors group">
                    <summary className="font-bold text-gray-900 flex items-center justify-between">
                      What's the certification process?
                      <span className="group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-4">
                      After completing all modules, you'll take a final assessment and submit a real-world mentoring scenario project. Upon successful completion, you'll receive your certification.
                    </p>
                  </details>

                  <details className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-amber-600 transition-colors group">
                    <summary className="font-bold text-gray-900 flex items-center justify-between">
                      Can I mentor while taking the course?
                      <span className="group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-4">
                      We recommend completing at least the first 2 weeks of training before starting to mentor, but you can start connecting with mentees once you've covered the fundamentals.
                    </p>
                  </details>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-700 mb-6">
                  Have questions about the training program? Our support team is here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="mailto:info@weslux.lu" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
                    📧 Email Support
                  </a>
                  <Link href="/contact" className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-lg transition-all">
                    📞 Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Training?
              </h2>
              <p className="text-gray-700 text-lg mb-8">
                Watch for your course access email. In the meantime, explore our resources and join our mentor community!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/programs/mentorship"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-lg transition-all shadow-lg"
                >
                  Back to Mentorship Program
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold rounded-lg transition-all"
                >
                  Explore WES
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
