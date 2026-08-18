import PageHero from '../components/ui/PageHero';
import Work from '../components/sections/Work';
import ContactCTA from '../components/sections/ContactCTA';
import Seo from '../components/ui/Seo';
import { breadcrumbLd } from '../utils/schema';

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Our Work — Aishi Technologies"
        description="A selection of client projects — business websites, marketing sites, and web apps focused on clean UI and performance."
        path="/work"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
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
