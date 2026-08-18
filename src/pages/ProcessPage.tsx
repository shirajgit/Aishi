import PageHero from '../components/ui/PageHero';
import Process from '../components/sections/Process';
import StatsBar from '../components/sections/StatsBar';
import ContactCTA from '../components/sections/ContactCTA';
import Seo from '../components/ui/Seo';
import { breadcrumbLd } from '../utils/schema';

export default function ProcessPage() {
  return (
    <>
      <Seo
        title="Our Process — Aishi Technologies"
        description="How we work: discovery, UI design, development, and launch — with clear updates and support at every step."
        path="/process"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ])}
      />
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
