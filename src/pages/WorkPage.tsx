import { useEffect } from 'react';
import PageHero from '../components/ui/PageHero';
import Work from '../components/sections/Work';
import ContactCTA from '../components/sections/ContactCTA';
import { setMeta } from '../utils/seo';

export default function WorkPage() {
  useEffect(() => {
    setMeta(
      'Our Work — Aishi Technologies',
      'A selection of client projects — business websites, marketing sites, and web apps focused on clean UI and performance.'
    );
  }, []);

  return (
    <>
      <PageHero
        tag="Portfolio"
        title={<>Work we've <span className="glow-text">shipped lately</span></>}
        subtitle="A handful of recent projects. Click any of them to see the real thing."
      />
      <div style={{ paddingTop: 72 }}>
        <Work withHeader={false} />
        <ContactCTA />
      </div>
    </>
  );
}
