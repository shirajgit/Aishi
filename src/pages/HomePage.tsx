import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import Services from '../components/sections/Services';
import WhyUs from '../components/sections/WhyUs';
import StatsBar from '../components/sections/StatsBar';
import Industries from '../components/sections/Industries';
import Process from '../components/sections/Process';
import Work from '../components/sections/Work';
import Faq from '../components/sections/Faq';
import ContactCTA from '../components/sections/ContactCTA';
import Seo from '../components/ui/Seo';
import { faqs } from '../data/site';
import { faqPageLd } from '../utils/schema';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Aishi Technologies — Web Apps, AI Automation & IoT"
        description="We build scalable web apps, AI-powered automation, and IoT systems for businesses, startups, and institutes. Clean, secure, and ready for real-world use."
        path="/"
        jsonLd={faqPageLd(faqs)}
      />
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <StatsBar />
      <Industries />
      <Process />
      <Work limit={3} />
      <Faq />
      <ContactCTA />
    </>
  );
}
