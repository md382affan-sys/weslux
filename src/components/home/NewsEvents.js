import Link from 'next/link';
import Image from 'next/image';

const newsItems = [
  {
    title: 'Tech Connect Program Launch',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    title: 'Partnership with Leading Tech Companies',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    title: 'Industrial Visit Success Story',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
  },
];

export default function NewsEvents() {
  return (
    <section className="homeNews">
      <div className="homeSectionInner">
        <div className="homeSectionHeading">
          <div>
            <p className="homeEyebrow">Updates</p>
            <h2>What&apos;s happening at WESLUX.</h2>
          </div>
          <Link href="/news" className="homeTextLink">
            View all news <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="homeNewsList">
          {newsItems.map((item) => (
            <article className="homeNewsItem" key={item.title}>
              <div className="homeNewsPhoto">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 180px"
                />
              </div>
              <div className="homeNewsContent">
                <h3>{item.title}</h3>
              </div>
              <Link href="/news" aria-label={`View news: ${item.title}`}>
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
