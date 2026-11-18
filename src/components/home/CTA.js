import Link from 'next/link';

export default function CTA() {
  return (
    <section className="homeCta">
      <div className="homeSectionInner homeCtaInner">
        <div>
          <p className="homeEyebrow">Get involved</p>
          <h2>Help widen access to education and mentorship.</h2>
          <p>Partner, volunteer, or contribute to WES Luxembourg&apos;s work.</p>
        </div>
        <div className="homeCtaActions">
          <Link href="/join-us/volunteer" className="homeButton homeButtonLight">
            Become a Volunteer <span aria-hidden="true">→</span>
          </Link>
          <Link href="/partners/companies" className="homeButton homeButtonOutline">
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
