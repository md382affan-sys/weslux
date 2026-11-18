'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
    alt: 'Students studying together',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    alt: 'A team collaborating around a table',
  },
  {
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80',
    alt: 'A learning space with books and a laptop',
  },
  {
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=80',
    alt: 'A professional workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
    alt: 'People taking part in a group discussion',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    alt: 'Colleagues working together',
  },
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="homeHero">
      <div className="homeHeroInner">
        <div className="homeHeroCopy">
          <p className="homeEyebrow">WES Luxembourg for Education ASBL</p>
          <h1>Connecting education with the real world.</h1>
          <p className="homeHeroDescription">
            We connect students, mentors and industry professionals to create meaningful learning and career opportunities.
          </p>
          <div className="homeHeroActions">
            <Link href="#program" className="homeButton homeButtonPrimary">
              Explore Programs
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/join-us/volunteer" className="homeButton homeButtonSecondary">
              Join as Volunteer
            </Link>
          </div>
        </div>

        <div className="homeHeroPhoto">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`homeHeroSlide${index === currentImage ? ' isActive' : ''}`}
              role={index === currentImage ? 'img' : undefined}
              aria-label={index === currentImage ? image.alt : undefined}
              aria-hidden={index !== currentImage}
              style={{
                backgroundImage: `linear-gradient(180deg, rgb(37 43 41 / 2%) 42%, rgb(37 43 41 / 38%) 100%), url("${image.src}")`,
              }}
            />
          ))}
          <div className="homeHeroPhotoControls" aria-label="Choose a photograph">
            <span>{String(currentImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
            <div>
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  onClick={() => setCurrentImage(index)}
                  aria-label={`Show photograph: ${image.alt}`}
                  aria-current={index === currentImage ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
