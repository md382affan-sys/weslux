import Image from 'next/image';
import Link from 'next/link';

const goals = [
  {
    number: 4,
    title: 'Quality education',
  },
  {
    number: 5,
    title: 'Gender equality',
  },
  {
    number: 8,
    title: 'Decent work',
  },
  {
    number: 9,
    title: 'Industry and innovation',
  },
  {
    number: 10,
    title: 'Reduced inequalities',
  },
  {
    number: 17,
    title: 'Partnerships',
  },
];

export default function SDG() {
  return (
    <section className="homeSdg">
      <div className="homeSectionInner">
        <div className="homeSectionHeading">
          <div>
            <p className="homeEyebrow">Our wider commitment</p>
            <h2>Learning and opportunity for all.</h2>
          </div>
          <p>
            Our work is connected to the United Nations Sustainable Development Goals, especially those
            focused on education, inclusion and meaningful work.
          </p>
        </div>

        <ul className="homeSdgList">
          {goals.map((goal) => (
            <li className="homeSdgGoal" key={goal.number}>
              <Image
                src={`/sdg/sdg-${goal.number}.png`}
                alt={`Sustainable Development Goal ${goal.number}: ${goal.title}`}
                width={56}
                height={56}
              />
              <div>
                <p className="homeSdgNumber">Goal {goal.number}</p>
                <h3>{goal.title}</h3>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/impact" className="homeTextLink homeSdgLink">
          Learn more about our impact <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
