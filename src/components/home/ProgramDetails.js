import Link from 'next/link';
import Image from 'next/image';

const programs = [
  {
    number: '01',
    title: 'Mentorship Program',
    description: 'One-to-one guidance for career planning, skill development, and professional growth.',
    href: '/programs/mentorship',
    icon: 'mentorship',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85',
    imageAlt: 'Students working together around a table',
  },
  {
    number: '02',
    title: 'Global Tech Connect',
    description: 'An international exchange connecting Luxembourg with global technology communities.',
    href: '/programs/tech-connect',
    icon: 'global',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=85',
    imageAlt: 'Professionals sharing ideas in a group discussion',
  },
  {
    number: '03',
    title: 'Industrial Exposure Visit',
    description: 'Visits that introduce learners to workplaces and real-world industry practice.',
    href: '/programs/industrial-visit',
    icon: 'industry',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85',
    imageAlt: 'A professional working with digital equipment',
  },
];

function ProgramIcon({ name }) {
  return (
    <svg
      className="homeProgramIcon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'mentorship' && (
        <>
          <circle cx="17" cy="15" r="6" />
          <path d="M5 38c0-7 5-12 12-12s12 5 12 12M31 13a6 6 0 010 12m4 3c5 1 8 5 8 10" />
        </>
      )}
      {name === 'global' && (
        <>
          <circle cx="24" cy="24" r="18" />
          <path d="M6 24h36M24 6c5 5 7 11 7 18s-2 13-7 18m0-36c-5 5-7 11-7 18s2 13 7 18" />
        </>
      )}
      {name === 'industry' && (
        <>
          <path d="M7 41V19l12 7V17l12 7V10h10v31H7zM14 34h4m7 0h4m7 0h2M34 15h2" />
        </>
      )}
    </svg>
  );
}

export default function ProgramDetails() {
  return (
    <section id="program" className="homePrograms">
      <div className="homeSectionInner">
        <div className="homeSectionHeading">
          <div>
            <p className="homeEyebrow">What we do</p>
            <h2>Learning connected to what comes next.</h2>
          </div>
          <p>Explore the ways WES Luxembourg supports learning and career development.</p>
        </div>

        <div className="homeProgramList">
          {programs.map((program) => (
            <article className="homeProgram" key={program.number}>
              <div className="homeProgramPhoto">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </div>
              <div className="homeProgramContent">
                <div className="homeProgramTopline">
                  <span className="homeProgramNumber">{program.number}</span>
                  <ProgramIcon name={program.icon} />
                </div>
                <h3>{program.title}</h3>
                <p className="homeProgramDescription">{program.description}</p>
                <Link href={program.href} className="homeTextLink">
                  Explore programme <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
