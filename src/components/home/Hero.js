import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[600px] py-20">
      {/* Background Image with Overlay */}
      <Image
        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        alt="Team collaboration and learning"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <h1 className="text-5xl sm:text-5xl md:text-5xl font-bold text-white">
              Community • Education • Technology
            </h1>
          </div>
          <p className="text-xl text-white mb-8">
            We create paths where talent meets opportunity.
          </p>
          <p className="text-lg text-gray-200 mb-10 max-w-3xl mx-auto">
            WES Luxembourg for Education ASBL is a purpose driven association based in Luxembourg, dedicated to creating opportunities for personal and professional growth by developing a Mentorship Program that bridges education and professional reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programs/mentorship" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Explore Mentorship
            </Link>
            <Link 
              href="/join-us/volunteer" 
              className="bg-transparent hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white transition duration-300"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
