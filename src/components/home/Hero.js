import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
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
