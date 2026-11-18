import Image from 'next/image';

const partners = [
  {
    name: 'Tech Corp',
    category: 'Technology',
    description: 'Leading technology solutions provider',
    image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
  },
  {
    name: 'Innovation Labs',
    category: 'Research',
    description: 'Cutting-edge research and development',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
  },
  {
    name: 'Global Education',
    category: 'Education',
    description: 'International educational initiatives',
    image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?w=200&q=80',
  },
  {
    name: 'Future Skills',
    category: 'Training',
    description: 'Professional development programs',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80',
  },
  {
    name: 'Digital Solutions',
    category: 'Technology',
    description: 'Digital transformation specialists',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80',
  },
  {
    name: 'Smart Industries',
    category: 'Manufacturing',
    description: 'Industrial innovation leaders',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80',
  },
  {
    name: 'EduTech Alliance',
    category: 'Education',
    description: 'Educational technology pioneers',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80',
  },
  {
    name: 'Sustainable Future',
    category: 'Sustainability',
    description: 'Environmental and social impact',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&q=80',
  },
];

export default function PartnersShowcase() {
  return (
    <section className="homePartnerShowcase">
      <div className="homeSectionInner homePartnerShowcaseInner">
        <div className="homePartnerShowcaseHeading">
          <p className="homeEyebrow">Working together</p>
          <h2>Trusted Partners</h2>
          <p>
            We collaborate with industry leaders and innovative organizations to drive
            educational transformation.
          </p>
        </div>
        <div className="homePartnerShowcaseGrid">
          {partners.map((partner) => (
            <article className="homePartnerShowcaseCard" key={partner.name}>
              <div className="homePartnerShowcaseLogo">
                <Image src={partner.image} alt="" fill sizes="(max-width: 760px) 25vw, 120px" />
              </div>
              <h3>{partner.name}</h3>
              <span>{partner.category}</span>
              <p>{partner.description}</p>
            </article>
          ))}
        </div>
        <p className="homePartnerShowcaseClosing">
          Our growing network of partners committed to shaping the future of education.
        </p>
      </div>
    </section>
  );
}
