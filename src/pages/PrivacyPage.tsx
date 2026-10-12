import PageHero from '../components/ui/PageHero';
import LegalDoc, { LegalList, type LegalSection } from '../components/ui/LegalDoc';
import Seo from '../components/ui/Seo';
import { site } from '../data/site';
import { breadcrumbLd } from '../utils/schema';

const mail = (
  <a href={`mailto:${site.email}`} style={{ color: 'var(--cyan)' }}>{site.email}</a>
);

const sections: LegalSection[] = [
  {
    title: 'Who we are',
    body: (
      <p>
        This website is run by {site.name}, based in {site.location}. This policy explains what
        information we receive when you use {site.url.replace('https://', '')} and what we do with it.
        If you have any question about it, write to us at {mail}.
      </p>
    ),
  },
  {
    title: 'Information you give us',
    body: (
      <>
        <p>When you send the contact form, we receive what you type into it:</p>
        <LegalList
          items={[
            'Your name and email address',
            'The service and budget range you select',
            'The requirement you describe in your message',
          ]}
        />
        <p>
          The form is delivered to our inbox as an email. This website does not save it in a database
          of its own. If you contact us by email, WhatsApp, or Instagram instead, we receive whatever
          you send us there, along with the contact details those services show us.
        </p>
      </>
    ),
  },
  {
    title: 'How we use it',
    body: (
      <>
        <LegalList
          items={[
            'To reply to your enquiry and prepare a quote',
            'To deliver and support a project if you decide to work with us',
            'To keep ordinary business records of the work we have done',
          ]}
        />
        <p>We do not sell your information, and we do not use it to send marketing you did not ask for.</p>
      </>
    ),
  },
  {
    title: 'Services that process data for us',
    body: (
      <>
        <p>A few outside services are involved in running this website, and each handles some data under its own privacy policy:</p>
        <LegalList
          items={[
            <><strong>Vercel</strong> hosts the website and, like any web host, processes technical request data such as your IP address and browser type.</>,
            <><strong>Resend</strong> delivers contact form submissions to our inbox.</>,
            <><strong>Google Fonts</strong> serves the fonts used on the site, so your browser makes a request to Google when a page loads.</>,
            <><strong>GitHub</strong> provides the project list on our Work page, so your browser makes a request to GitHub when you open it.</>,
          ]}
        />
      </>
    ),
  },
  {
    title: 'Cookies and tracking',
    body: (
      <p>
        This website does not set advertising or analytics cookies and does not run tracking scripts.
        The Work page keeps a temporary copy of the project list in your browser's session storage so
        it loads faster; it is cleared when you close the tab. The chat helper in the corner runs
        entirely in your browser and does not send what you type to us.
      </p>
    ),
  },
  {
    title: 'How long we keep it',
    body: (
      <p>
        We keep enquiries for as long as we need them to reply and to follow up on a possible project.
        If you become a client, we keep project correspondence for as long as needed to support your
        project and to meet our legal and accounting obligations.
      </p>
    ),
  },
  {
    title: 'Your choices',
    body: (
      <p>
        You can ask us to show you, correct, or delete the information we hold about you by emailing {mail}.
        We will act on the request unless we are required by law to keep the information.
      </p>
    ),
  },
  {
    title: 'Links to other websites',
    body: (
      <p>
        Our portfolio links to client websites and other third-party pages. We are not responsible for
        how those sites handle your information.
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        If we change how we handle information, we will update this page and the date at the top.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy — Aishi Technologies"
        description="What information Aishi Technologies receives when you use this website or contact us, and how it is used."
        path="/privacy"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <PageHero
        tag="Legal"
        title={<>Privacy <span className="glow-text">Policy</span></>}
        subtitle="What we receive when you use this website or get in touch, and what we do with it."
      />
      <LegalDoc updated="12 October 2026" sections={sections} />
    </>
  );
}
