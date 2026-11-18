import Link from 'next/link';

const partners = [
  {
    title: 'Schools',
    href: '/partners/schools',
  },
  {
    title: 'Companies',
    href: '/partners/companies',
  },
  {
    title: 'Government',
    href: '/partners/government',
  },
  {
    title: 'Civil society',
    href: '/partners/cso',
  },
];

export default function Partners() {
  return (
    <section id="partners" className="homePartners">
      <div className="homeSectionInner homePartnersInner">
        <div className="homePartnersIntro">
          <p className="homeEyebrow">Partnerships</p>
          <h2>Education moves forward through collaboration.</h2>
          <p>
            WES Luxembourg works with schools, companies, public institutions, and civil society
            organizations.
          </p>
        </div>

        <div className="homePartnerLinks">
          {partners.map((partner, index) => (
            <Link href={partner.href} className="homePartnerLink" key={partner.href}>
              <span className="homePartnerIndex">0{index + 1}</span>
              <span className="homePartnerText">
                <strong>{partner.title}</strong>
              </span>
              <span className="homePartnerArrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
