/* =======================
   Site data & content
======================= */

export type Step = { title: string; desc: string };

export type Service = {
  slug: string;
  title: string;
  desc: string; // short line for the card
  tag: string;
  icon: string;
  intro: string; // longer intro for the detail page
  includes: string[]; // what you get
  build: Step[]; // how we make it
  launch: Step[]; // how we launch it
  tech: string[];
  timeline: string;
  startingPrice: string;
  idealFor: string[];
};

export type Client = {
  name: string;
  type: string;
  year: string;
  desc: string;
  link: string;
  stack: string[];
  color: string;
  /** optional source-code link (set for projects pulled from GitHub) */
  repo?: string;
};

/** GitHub username the Work section pulls public projects from. */
export const githubUser = 'shirajgit';

/**
 * Override the live link for a repo (keyed by exact repo name) when the
 * homepage on GitHub is wrong or out of date.
 */
export const githubLinkOverrides: Record<string, string> = {
  Dture: 'https://dtrue.vercel.app/',
};

/**
 * Repos to hide from the auto-fetched Work list: this site itself, the profile
 * readme, and near-duplicate landing/backend repos of projects already shown.
 */
export const githubExclude = [
  'Aishi',
  'shirajgit',
  'vizionexl',
  'vizionexl02',
  'Dture-full-',
  'Dture-Backend',
  'landing-workos',
  'landing-growthx',
  'Portxz-App',
  'github_assignment01',
];

export type NavItem = {
  path: string;
  label: string;
};

export type ProcessStep = {
  n: string;
  title: string;
  desc: string;
  icon: string;
  /** concrete things that happen in this step, tied to what we build */
  points: string[];
};

export type Stat = {
  value: string;
  label: string;
};

/** Central contact / brand info — change once, updates everywhere */
export const site = {
  name: 'Aishi Technologies',
  short: 'AISHI',
  tagline: 'Web · AI · IoT · Automation',
  email: 'hello.aishitech@gmail.com',
  whatsapp: 'https://wa.me/918105369922',
  location: 'Karnataka, India',
  url: 'https://aishi-technologies.vercel.app',
  pricingFrom: '₹8,999',
  replyTime: 'Within 24 hours',
};

export const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/work', label: 'Work' },
  { path: '/process', label: 'Process' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const services: Service[] = [
  {
    slug: 'custom-web-apps',
    title: 'Custom Web Apps',
    desc: 'Dashboards, admin panels, CRM and billing tools that take the manual work off your team every day.',
    tag: 'Web / SaaS',
    icon: '◈',
    intro:
      'If your team runs on spreadsheets, WhatsApp, and paper, a custom web app pulls it all into one place. We build the exact tool your business needs, not an off-the-shelf product you have to bend your workflow around.',
    includes: [
      'A dashboard built around how you actually work',
      'Secure logins with roles for staff and admins',
      'Billing, invoices, and reports',
      'Search, filters, and exports',
      'Payments and WhatsApp / email integrations',
      'Mobile-friendly, works on any device',
    ],
    build: [
      { title: 'We map your workflow', desc: 'We sit with you and note every step your team does by hand today, then decide what the app should handle.' },
      { title: 'Design first', desc: 'You see every screen as a clickable design and approve it before we write a single line of code.' },
      { title: 'We build in stages', desc: 'We build feature by feature on a modern, reliable stack, and show you progress along the way.' },
      { title: 'We test it properly', desc: 'Everything is checked on real devices with real data before it ever reaches your users.' },
    ],
    launch: [
      { title: 'Go live', desc: 'We deploy it to a fast, secure host and connect your domain.' },
      { title: 'Train your team', desc: 'We walk your staff through it and hand over simple guides.' },
      { title: 'Support after', desc: 'We stay on to fix, tweak, and add features as you grow.' },
    ],
    tech: ['React', 'Node', 'MongoDB', 'TypeScript', 'Tailwind'],
    timeline: '2–8 days',
    startingPrice: '₹24,999',
    idealFor: ['Growing businesses', 'Service companies', 'Startups', 'Agencies'],
  },
  {
    slug: 'ai-automation',
    title: 'AI Features & Automation',
    desc: "Chatbots, smart search, and automated workflows that handle the repetitive stuff so people don't have to.",
    tag: 'AI',
    icon: '◎',
    intro:
      'AI is only useful when it saves real hours. We add smart features on top of your product where they actually help, so your team can stop doing the same repetitive tasks every day.',
    includes: [
      'Chat assistants trained on your content',
      'Smart search that understands plain questions',
      'Automated workflows and reminders',
      'Document and data extraction',
      'Reports and insights from your own data',
      'Integrations with your existing tools',
    ],
    build: [
      { title: 'Find the time-wasters', desc: 'We look at where your team loses the most time on repetitive work and start there.' },
      { title: 'Pick the right approach', desc: 'We choose the simplest tool that solves it, whether that is automation or an AI model.' },
      { title: 'Build and connect', desc: 'We build the feature and wire it into your website, app, or existing systems.' },
    ],
    launch: [
      { title: 'Roll out safely', desc: 'We launch it to a small group first, then to everyone once it is solid.' },
      { title: 'Tune it', desc: 'We watch how it performs and adjust it so it keeps getting better.' },
    ],
    tech: ['Claude API', 'Node', 'Python', 'FastAPI', 'React'],
    timeline: '3–10 days',
    startingPrice: '₹14,999',
    idealFor: ['Support-heavy teams', 'Content businesses', 'SaaS products', 'Ops teams'],
  },
  {
    slug: 'school-management',
    title: 'School Management Systems',
    desc: 'Attendance, fees, staff and student records, timetables, and one admin panel that keeps it all in order.',
    tag: 'Education',
    icon: '◇',
    intro:
      'Running a school or college on registers and spreadsheets is slow and error-prone. We build one system that handles attendance, fees, staff, students, and timetables, with a clean admin panel that ties it all together.',
    includes: [
      'Student and staff records in one place',
      'Attendance tracking with reports',
      'Fee collection, receipts, and reminders',
      'Timetable and class scheduling',
      'Parent and student portals',
      'Admin dashboard with analytics',
    ],
    build: [
      { title: 'Understand your institute', desc: 'Every school runs differently, so we start by learning your classes, fees, and roles.' },
      { title: 'Design the panels', desc: 'We design the admin, staff, and student views and get your sign-off first.' },
      { title: 'Build module by module', desc: 'Attendance, fees, timetable, and records are built and tested one at a time.' },
    ],
    launch: [
      { title: 'Import your data', desc: 'We move your existing student and staff data in so you start ready to go.' },
      { title: 'Train staff', desc: 'We train your admin and teaching staff and leave clear guides behind.' },
      { title: 'Ongoing support', desc: 'We handle new sessions, new classes, and any changes each year.' },
    ],
    tech: ['React', 'Node', 'MongoDB', 'Tailwind'],
    timeline: '5–14 days',
    startingPrice: '₹29,999',
    idealFor: ['Schools', 'Colleges', 'Coaching centres', 'Training institutes'],
  },
  {
    slug: 'iot-hardware',
    title: 'IoT & Hardware Prototyping',
    desc: 'Smart home setups, sensors, and device controls you can watch and run from a live dashboard.',
    tag: 'IoT',
    icon: '⬡',
    intro:
      'We connect the physical world to the web, whether that is smart lights at home, sensors in a shop, or a prototype for a hardware idea. You get live control and monitoring from a simple dashboard on your phone.',
    includes: [
      'Smart home and office automation',
      'Sensors for temperature, motion, and more',
      'Live dashboards with real-time data',
      'Mobile and web control',
      'Alerts and automation rules',
      'Prototype builds for new ideas',
    ],
    build: [
      { title: 'Plan the setup', desc: 'We work out what to measure or control and pick the right boards and sensors.' },
      { title: 'Wire and program', desc: 'We build the circuit and write the firmware to talk to the cloud.' },
      { title: 'Build the dashboard', desc: 'We connect it to a live dashboard so you can see and control everything.' },
    ],
    launch: [
      { title: 'Install and test', desc: 'We set it up on site and test every sensor and control in real conditions.' },
      { title: 'Hand over', desc: 'We show you how it works and stay available if anything needs a tweak.' },
    ],
    tech: ['ESP32 / ESP8266', 'Arduino', 'MQTT', 'React', 'Node'],
    timeline: '4–12 days',
    startingPrice: '₹19,999',
    idealFor: ['Homeowners', 'Retail shops', 'Makers', 'Hardware startups'],
  },
  {
    slug: 'business-websites',
    title: 'Business Websites & Landing Pages',
    desc: 'Fast, modern websites that make your business look serious and bring in enquiries.',
    tag: 'Web',
    icon: '✦',
    intro:
      'Your website is often the first thing a customer sees. We build fast, modern sites that load quickly, look great on every phone, and are built to turn visitors into enquiries and calls.',
    includes: [
      'Custom design, no cheap templates',
      'Mobile-first and fast-loading',
      'Enquiry forms and WhatsApp buttons',
      'Basic SEO so you show up on Google',
      'Social and link-preview ready',
      'Easy-to-update content',
    ],
    build: [
      { title: 'Understand your business', desc: 'We learn what you offer and who you are trying to reach.' },
      { title: 'Design the pages', desc: 'We design a clean, on-brand layout and get your approval before building.' },
      { title: 'Build and optimise', desc: 'We build it fast and light, and set up SEO and link previews.' },
    ],
    launch: [
      { title: 'Go live on your domain', desc: 'We connect your domain and deploy it to a fast host.' },
      { title: 'Set up basics', desc: 'We add analytics and make sure Google can find you.' },
    ],
    tech: ['Next.js', 'React', 'Tailwind', 'Vercel'],
    timeline: '2–5 days',
    startingPrice: '₹8,999',
    idealFor: ['Local businesses', 'Freelancers', 'Startups', 'Service providers'],
  },
  {
    slug: 'ecommerce-stores',
    title: 'E-commerce Stores',
    desc: 'Online stores with products, cart, payments, and orders, ready to start selling.',
    tag: 'E-commerce',
    icon: '◇',
    intro:
      'Whether you sell one product or a hundred, we build online stores that are easy for customers to buy from and easy for you to manage. Products, cart, payments, and orders, all handled.',
    includes: [
      'Product catalogue with images and variants',
      'Cart and smooth checkout',
      'Online payments and UPI',
      'Order and inventory management',
      'WhatsApp order confirmations',
      'Admin panel to run the store',
    ],
    build: [
      { title: 'Plan your catalogue', desc: 'We set up how your products, categories, and pricing should work.' },
      { title: 'Design the storefront', desc: 'We design a clean shopping experience and get your sign-off.' },
      { title: 'Build store and admin', desc: 'We build the shop plus the panel you use to manage orders and stock.' },
    ],
    launch: [
      { title: 'Connect payments', desc: 'We set up and test your payment gateway so money reaches you safely.' },
      { title: 'Go live and train', desc: 'We launch the store and show you how to add products and handle orders.' },
    ],
    tech: ['Next.js', 'React', 'Node', 'MongoDB', 'Razorpay'],
    timeline: '4–10 days',
    startingPrice: '₹19,999',
    idealFor: ['Retail shops', 'D2C brands', 'Restaurants', 'Home businesses'],
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    desc: 'Keep your site or app fast, secure, and up to date without lifting a finger.',
    tag: 'Support',
    icon: '◎',
    intro:
      'Launching is just the start. We keep your website or app running smoothly with regular updates, fixes, backups, and small changes whenever you need them, so you never have to worry about it breaking.',
    includes: [
      'Regular updates and security patches',
      'Bug fixes and small changes',
      'Backups and uptime monitoring',
      'Content and product updates',
      'Speed and performance checks',
      'Priority support over WhatsApp',
    ],
    build: [
      { title: 'Review what you have', desc: 'We audit your current site or app and note what needs attention.' },
      { title: 'Set up monitoring', desc: 'We put backups and uptime monitoring in place so issues get caught early.' },
    ],
    launch: [
      { title: 'Monthly check-ins', desc: 'We keep everything updated and send you a short summary each month.' },
      { title: 'On-call for changes', desc: 'Message us any time for fixes or small additions.' },
    ],
    tech: ['Any stack', 'Vercel', 'Render', 'MongoDB'],
    timeline: 'Ongoing',
    startingPrice: '₹2,999/mo',
    idealFor: ['Existing clients', 'Busy owners', 'Growing stores', 'Any business online'],
  },
];

/** Look up a service by its URL slug. */
export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);

export const industries: string[] = [
  'Businesses & Startups',
  'Schools & Colleges',
  'Clinics & Hospitals',
  'Restaurants & Retail',
  'Home Automation',
  'Logistics & Ops',
];

export const clients: Client[] = [
  {
    name: 'Akeel Lights',
    type: 'Business Website',
    year: '2024',
    desc: 'Website for a lighting and decoration business, built to bring in enquiries.',
    link: 'https://akeel-lights.vercel.app',
    stack: ['Next.js', 'Tailwind', 'UI/UX'],
    color: '#38d9f5',
  },
  {
    name: 'Clickonadzz',
    type: 'Marketing Website',
    year: '2024',
    desc: 'Site for a digital marketing agency that shows off what they do.',
    link: 'https://clickonadzz.com',
    stack: ['Next.js', 'Tailwind', 'Framer Motion'],
    color: '#a5b4fc',
  },
  {
    name: 'Nehra Cars',
    type: 'Car Rental Website',
    year: '2024',
    desc: 'Self-drive car rental site with a simple booking enquiry flow.',
    link: 'https://nehra-cars.vercel.app',
    stack: ['Next.js', 'Tailwind', 'Forms'],
    color: '#38d9f5',
  },
  {
    name: 'VizionExl',
    type: 'IT Services Website',
    year: '2024',
    desc: 'Website for an IT services company, laid out around their services.',
    link: 'https://vizionexl.vercel.app',
    stack: ['Next.js', 'Tailwind', 'Forms'],
    color: '#a5b4fc',
  },
];

export const marqueeItems: string[] = [
  'Web Apps',
  'AI Automation',
  'IoT Systems',
  'UI/UX Design',
  'Node.js',
  'React',
  'MongoDB',
  'Next.js',
  'TypeScript',
];

export const stats: Stat[] = [
  { value: '30+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '2–8d', label: 'Typical Delivery' },
  { value: '< 24h', label: 'Response Time' },
];

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Discovery',
    desc: 'We figure out what you need, who it is for, and what it should cost.',
    icon: '◎',
    points: [
      'Map how your work runs today',
      'Agree on features and scope',
      'Fixed price and timeline up front',
    ],
  },
  {
    n: '02',
    title: 'UI / UX Design',
    desc: 'You see the whole thing on screen and sign off before we write any code.',
    icon: '◇',
    points: [
      'Wireframes of every screen',
      'Polished, on-brand final design',
      'Your approval before we build',
    ],
  },
  {
    n: '03',
    title: 'Development',
    desc: 'We build the actual product on a modern, reliable stack.',
    icon: '◈',
    points: [
      'Dashboards, panels and portals',
      'Secure logins and user roles',
      'Payments, WhatsApp and integrations',
    ],
  },
  {
    n: '04',
    title: 'AI & Automation',
    desc: 'Where it saves real time, we add smart features on top.',
    icon: '✦',
    points: [
      'Chatbots and smart search',
      'Automated workflows and reminders',
      'Reports and data insights',
    ],
  },
  {
    n: '05',
    title: 'Testing & Review',
    desc: 'We check everything on real devices before it reaches your users.',
    icon: '◉',
    points: [
      'Tested on mobile and desktop',
      'Bugs fixed and speed tuned',
      'You review it before it goes live',
    ],
  },
  {
    n: '06',
    title: 'Launch & Support',
    desc: 'We put it live and stick around long after the handover.',
    icon: '⬡',
    points: [
      'Deployed and monitored',
      'Team training and handover',
      'Ongoing fixes and updates',
    ],
  },
];

export const techStack = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node', 'MongoDB', 'IoT'];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'How much does a project cost?',
    a: `It depends on what you need, but projects start from ${site.pricingFrom}. Once we know the scope, we send a fixed price up front so there are no surprises later.`,
  },
  {
    q: 'How long will it take?',
    a: 'Most websites and small apps go live in 2 to 8 days. Bigger systems take longer, and we will give you a clear timeline before we start.',
  },
  {
    q: 'Do I own the code and design?',
    a: 'Yes. Once the project is paid for, everything is yours. The code, the design, and the accounts all belong to you.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'That is normal, and we are around for it. Small tweaks are quick, and for bigger additions we will quote you before doing anything.',
  },
  {
    q: 'I am not technical. Is that a problem?',
    a: 'Not at all. Most of our clients are not developers. We handle the technical side and explain things in plain language.',
  },
  {
    q: 'Where are you based, and do you work remotely?',
    a: `We are based in ${site.location} and work with clients anywhere. Everything can be handled over WhatsApp, email, and calls.`,
  },
];
