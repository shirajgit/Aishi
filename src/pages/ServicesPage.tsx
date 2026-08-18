import PageHero from '../components/ui/PageHero';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import ContactCTA from '../components/sections/ContactCTA';
import Seo from '../components/ui/Seo';
import { services } from '../data/site';
import { breadcrumbLd, servicesItemListLd } from '../utils/schema';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services — Aishi Technologies"
        description="Custom web apps, AI features & automation, school management systems, and IoT prototyping — built clean, secure, and scalable."
        path="/services"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          servicesItemListLd(services),
        ]}
      />
      <PageHero
        tag="What We Do"
        title={<>Everything we can <span className="glow-text">build for you</span></>}
        subtitle="We design it, build it, and stick around after it's live. Here's the kind of work we take on."
      />
      <div style={{ paddingTop: 40 }}>
        <Services showCta={false} />
        <Process />
        <ContactCTA />
      </div>
    </>
  );
}
