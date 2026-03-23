import { Header, Footer } from '@/components';

export default function OurStoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Our <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Story</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                From humble beginnings to transforming lives - the journey of WES Luxembourg for Education
              </p>
            </div>
          </div>
        </section>

        {/* Personal Journey - The Beginning */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  The Beginning
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">A Product of Education</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our founder's journey began in India, where he lived until 2006 in economically challenging conditions. Growing up in poverty, he experienced firsthand the struggles that many families face. But education became his pathway to transformation.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  After moving to Bangalore, he started working and gained valuable experience. His dedication led to opportunities to work in the United States, broadening his perspective on education and professional development. Upon returning to India and continuing his work in Bangalore, a profound realization struck him.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
                  <p className="text-gray-800 italic text-lg">
                    "I am a product of education. Education gave me advantages that others from similar backgrounds didn't have. The only differentiating factor was education."
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  This understanding became the foundation of everything that followed. If education could transform one life, it could transform thousands. But there was a gap - a critical missing piece in the education system that needed to be addressed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Gap in Education */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Identifying the Problem
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Online Education Gap</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Around the time when online education was being hailed as the future, our founder noticed something different. While everyone was excited about online learning platforms, he realized that effective online education tools were still missing. The landscape wasn't changing as dramatically as people claimed.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  This observation led to a decision: to work on bridging this gap. But where to start? The answer came from going back to basics - computer literacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Steps - Computer Literacy */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  First Initiative
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Computer Literacy Program</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  The journey began with a computer literacy program in government schools. Students needed basic digital skills to access the opportunities that technology could provide. This was the first step in creating meaningful impact.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  But as the program progressed, it became clear that students needed more than just technical skills. They needed guidance, inspiration, and connections to the real world. They needed mentors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Birth of Mentorship */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  The Breakthrough
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Discovering the Power of Mentorship</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Recognizing that we didn't have all the knowledge and experience needed, we started connecting students with mentors from various fields. If a student wanted to become a doctor, we would introduce them to a practicing doctor. If they were interested in engineering, we'd connect them with engineers.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The impact was immediate and profound. Students gained guidance, inspiration, and most importantly - they started believing in themselves. They could see real people who had achieved what they aspired to achieve.
                </p>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg my-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">A Turning Point</h3>
                  <p className="text-gray-700 leading-relaxed">
                    One parent approached us asking if we could connect their daughter with a doctor mentor. We did exactly that. The parent later came back and said, "This mentorship program has such a huge impact. Can you help others too? Can you find mentors for more students?"
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    That moment crystallized our mission. We realized mentorship wasn't just helpful - it was transformative.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge - 2023 */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Learning from Failure
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The 2023 Setback</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  In 2023, we decided to scale the mentorship program. We wanted to reach more students, create more connections, and amplify our impact. However, we couldn't manage the program effectively at that scale. The initiative failed.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  But failure taught us valuable lessons. We learned what worked, what didn't, and what needed to change. We documented every problem, every challenge, and every insight. This failure became the foundation for our future success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership with Silvia */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  New Beginning
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Meeting Silvia - A Fresh Start</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  After the setback, we met Silvia, who expressed interest in working on this project. When we shared the story of the mentorship program - both its successes and failures - she saw the potential.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  "Let's redesign it," she said. "Let's make it work."
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Together, we went back to the drawing board. We identified every problem, documented every challenge, and redesigned the entire program from the ground up. This time, we had the benefit of experience, the clarity of purpose, and a partner who believed in the mission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WES Luxembourg - Present Day */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 md:mb-12">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Today
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">WES Luxembourg for Education</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  We registered WES Luxembourg for Education ASBL as a not-for-profit organization in Luxembourg. Our mission: to work with youth internationally, providing them with mentorship and opportunities that can transform their lives.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  We redesigned the mentorship program specifically for Luxembourg's youth, incorporating everything we learned from our journey. We launched it with careful planning, proper systems, and a commitment to sustainable impact.
                </p>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl my-8 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Hope and Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    With this journey, we hope to create significant positive impact for young people internationally. We've learned from our failures, built on our successes, and created a program that truly bridges the gap between education and professional reality.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Every student deserves a mentor. Every young person deserves guidance. Every dream deserves support. That's what we're here to provide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Visual */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Our Journey Timeline</h2>
              
              <div className="space-y-8">
                {/* Until 2006 */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <div className="bg-blue-50 rounded-lg p-4 md:p-6">
                      <span className="text-xs md:text-sm font-semibold text-blue-600">Until 2006</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">Early Life in India</h3>
                      <p className="text-sm md:text-base text-gray-600">Growing up in economically challenging conditions, experiencing poverty firsthand.</p>
                    </div>
                  </div>
                </div>

                {/* Post 2006 */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <div className="bg-green-50 rounded-lg p-4 md:p-6">
                      <span className="text-xs md:text-sm font-semibold text-green-600">Post 2006</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">Moving to Bangalore</h3>
                      <p className="text-sm md:text-base text-gray-600">Started working, gained experience, and had the opportunity to work in the United States.</p>
                    </div>
                  </div>
                </div>

                {/* Computer Literacy */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="w-0.5 h-full bg-purple-200 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <div className="bg-purple-50 rounded-lg p-4 md:p-6">
                      <span className="text-xs md:text-sm font-semibold text-purple-600">Early Initiative</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">Computer Literacy Program</h3>
                      <p className="text-sm md:text-base text-gray-600">Launched computer literacy program in government schools to bridge the digital divide.</p>
                    </div>
                  </div>
                </div>

                {/* Mentorship Discovery */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="w-0.5 h-full bg-orange-200 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <div className="bg-orange-50 rounded-lg p-4 md:p-6">
                      <span className="text-xs md:text-sm font-semibold text-orange-600">The Breakthrough</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">Mentorship Program Begins</h3>
                      <p className="text-sm md:text-base text-gray-600">Started connecting students with industry mentors, discovering the transformative power of mentorship.</p>
                    </div>
                  </div>
                </div>

                {/* 2023 Challenge */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="w-0.5 h-full bg-red-200 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <div className="bg-red-50 rounded-lg p-4 md:p-6">
                      <span className="text-xs md:text-sm font-semibold text-red-600">2023</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">Scaling Challenge</h3>
                      <p className="text-sm md:text-base text-gray-600">Attempted to scale the program but faced management challenges. Learned valuable lessons from failure.</p>
                    </div>
                  </div>
                </div>

                {/* Partnership */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      6
                    </div>
                    <div className="w-0.5 h-full bg-indigo-200 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <div className="bg-indigo-50 rounded-lg p-4 md:p-6">
                      <span className="text-xs md:text-sm font-semibold text-indigo-600">Post 2023</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">Partnership with Silvia</h3>
                      <p className="text-sm md:text-base text-gray-600">Collaborated to redesign and relaunch the mentorship program with improved systems.</p>
                    </div>
                  </div>
                </div>

                {/* Present */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      7
                    </div>
                  </div>
                  <div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 md:p-6 border-2 border-blue-200">
                      <span className="text-xs md:text-sm font-semibold text-blue-600">Today</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-2">WES Luxembourg for Education</h3>
                      <p className="text-sm md:text-base text-gray-600">Registered as a not-for-profit in Luxembourg, working internationally to provide mentorship and transform young lives.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Our Impact Today</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">Lives Transformed</h3>
                  <p className="text-xs md:text-sm text-gray-600">Through mentorship programs</p>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">200+</div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">Active Mentors</h3>
                  <p className="text-xs md:text-sm text-gray-600">Industry professionals</p>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">Partner Organizations</h3>
                  <p className="text-xs md:text-sm text-gray-600">Schools and companies</p>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform">
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">3</div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">Core Programs</h3>
                  <p className="text-xs md:text-sm text-gray-600">Transforming education</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Message */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Our Journey Continues</h2>
              <p className="text-base md:text-lg leading-relaxed mb-8 opacity-90">
                From poverty to purpose, from failure to success, from one student to thousands - our story is proof that education and mentorship can transform lives. We're just getting started.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
                <p className="text-lg md:text-xl italic">
                  "Every student we help, every connection we make, every life we transform - it all started with one simple belief: education is the great equalizer."
                </p>
                <p className="mt-4 text-sm md:text-base opacity-75">- WES Luxembourg for Education Team</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
