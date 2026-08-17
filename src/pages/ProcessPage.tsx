import { useEffect } from 'react';
import PageHero from '../components/ui/PageHero';
import Process from '../components/sections/Process';
import StatsBar from '../components/sections/StatsBar';
import ContactCTA from '../components/sections/ContactCTA';
import { setMeta } from '../utils/seo';

export default function ProcessPage() {
  useEffect(() => {
    setMeta(
      'Our Process — Aishi Technologies',
      'How we work: discovery, UI design, development, and launch — with clear updates and support at every step.'
    );
  }, []);

  return (
    <>
      <PageHero
        tag="How We Work"
        title={<>How we work, <span className="glow-text">start to finish</span></>}
        subtitle="Four steps, no surprises. You stay in the loop the whole way through."
      />
      <div style={{ paddingTop: 72 }}>
        <Process />
        <StatsBar />
        <ContactCTA />
      </div>
    </>
  );
}
