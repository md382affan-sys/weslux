import Link from 'next/link';

const figures = [
  { value: '5,000+', label: 'Students reached' },
  { value: '500+', label: 'Mentors engaged' },
  { value: '100+', label: 'Partner organizations' },
  { value: '25+', label: 'Countries connected' },
];

export default function Impact() {
  return (
    <section className="homeImpact">
      <div className="homeSectionInner homeImpactInner">
        <div className="homeImpactIntro">
          <p className="homeEyebrow">Our impact</p>
          <h2>Make opportunity more tangible.</h2>
          <p>
            WES Luxembourg supports learning and career development through mentorship, global technology
            connections, and industry exposure.
          </p>
          <Link href="/impact" className="homeTextLink">
            Learn more about our impact <span aria-hidden="true">→</span>
          </Link>
        </div>

        <dl className="homeImpactFigures">
          {figures.map((figure) => (
            <div className="homeImpactFigure" key={figure.label}>
              <dt>{figure.label}</dt>
              <dd>{figure.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
