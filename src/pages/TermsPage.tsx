import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import LegalDoc, { type LegalSection } from '../components/ui/LegalDoc';
import Seo from '../components/ui/Seo';
import { site } from '../data/site';
import { breadcrumbLd } from '../utils/schema';

const sections: LegalSection[] = [
  {
    title: 'About these terms',
    body: (
      <p>
        These terms cover your use of this website, run by {site.name}, based in {site.location}. By
        using the site you agree to them. Work we do for you as a client is covered by the written
        quote or agreement we send for that project, which takes priority over this page if the two
        differ.
      </p>
    ),
  },
  {
    title: 'Prices and offers shown on this site',
    body: (
      <p>
        Prices on this website are starting prices and are shown as a guide. The actual price of a
        project depends on its scope, and we confirm it in a written quote before any work starts.
        Offers and discounts can change or end at any time; a quote we have already sent stays valid
        for the period stated in it.
      </p>
    ),
  },
  {
    title: 'Timelines',
    body: (
      <p>
        Delivery times on this website are typical ranges, not guarantees. The timeline for your
        project is set out in your quote and depends on its scope and on us receiving the content,
        approvals, and access we need from you on time.
      </p>
    ),
  },
  {
    title: 'Enquiries and quotes',
    body: (
      <p>
        Sending an enquiry or having a first consultation does not commit you or us to anything. A
        project begins only once you have accepted our quote. Payment terms, what is included, and
        what counts as extra work are set out in that quote.
      </p>
    ),
  },
  {
    title: 'Ownership of project work',
    body: (
      <p>
        Once a project is paid for in full, the code and design we created for it are yours.
        Third-party software, libraries, fonts, and services used in a project remain subject to
        their own licences and fees.
      </p>
    ),
  },
  {
    title: 'Content on this website',
    body: (
      <p>
        The text, design, and logo on this website belong to {site.name}. Client names and projects in
        our portfolio belong to their respective owners. Please do not copy or reuse content from this
        site without our permission.
      </p>
    ),
  },
  {
    title: 'Acceptable use',
    body: (
      <p>
        Do not use this website to send spam, attempt to break or overload it, or submit false or
        unlawful content through the contact form.
      </p>
    ),
  },
  {
    title: 'Links to other websites',
    body: (
      <p>
        This website links to client sites and other third-party pages that we do not control. We are
        not responsible for their content or availability.
      </p>
    ),
  },
  {
    title: 'Liability',
    body: (
      <p>
        We work to keep the information on this website accurate and the site available, but we
        provide it as it is, without guarantees. To the extent the law allows, we are not liable for
        loss arising from your use of this website or from relying on the information on it.
      </p>
    ),
  },
  {
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India, and any dispute about them falls under the
        jurisdiction of the courts of Karnataka.
      </p>
    ),
  },
  {
    title: 'Changes and contact',
    body: (
      <p>
        We may update these terms, and the date at the top shows the latest version. For how we handle
        your information, see our <Link to="/privacy" style={{ color: 'var(--cyan)' }}>Privacy Policy</Link>.
        Questions about these terms can be sent to{' '}
        <a href={`mailto:${site.email}`} style={{ color: 'var(--cyan)' }}>{site.email}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Use — Aishi Technologies"
        description="The terms that apply when you use the Aishi Technologies website, including how prices, timelines, and quotes work."
        path="/terms"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Terms of Use', path: '/terms' },
        ])}
      />
      <PageHero
        tag="Legal"
        title={<>Terms of <span className="glow-text">Use</span></>}
        subtitle="The ground rules for using this website, and how prices, timelines, and quotes work."
      />
      <LegalDoc updated="12 October 2026" sections={sections} />
    </>
  );
}
