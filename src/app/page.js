import {
  Header,
  Hero,
  About,
  ProgramDetails,
  Impact,
  SuccessStories,
  Partners,
  SDG,
  NewsEvents,
  PartnersShowcase,
  CTA,
  Footer,
} from '@/components';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={`${styles.homePage} min-h-screen`}>
      <Header />
      <Hero />
      <About />
      <ProgramDetails />
      <Impact />
      <SuccessStories />
      <Partners />
      <SDG />
      <NewsEvents />
      <PartnersShowcase />
      <CTA />
      <Footer />
    </div>
  );
}