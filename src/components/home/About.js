export default function About() {
  const reasons = [
    {
      title: 'A diverse, international setting',
      description: 'Luxembourg brings together different cultures, languages and perspectives in an economy with a strong technology and innovation focus.',
    },
    {
      title: 'Guidance for the next step',
      description: 'Mentorship helps students connect what they learn with informed education and career choices.',
    },
    {
      title: 'Learning beyond the classroom',
      description: 'Technology exchange and industry exposure help make professional pathways more visible.',
    },
  ];

  return (
    <section id="about" className="homeAbout">
      <div className="homeSectionInner homeAboutInner">
        <div className="homeAboutIntro">
          <p className="homeEyebrow">About WESLUX</p>
          <h2>Why Luxembourg. Why WES.</h2>
          <p>
            WES Luxembourg for Education ASBL connects learning with professional life through mentorship,
            technology exchange and industry exposure.
          </p>
        </div>

        <div className="homeAboutReasons">
          {reasons.map((reason, index) => (
            <div className="homeAboutReason" key={reason.title}>
              <span className="homeAboutIndex" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
