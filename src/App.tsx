import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WorkPage from './pages/WorkPage';
import ProcessPage from './pages/ProcessPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import { services } from './data/site';

/**
 * Routes are pre-rendered to static HTML at build time by vite-react-ssg,
 * so every page ships real content (and its own <title>, meta, and JSON-LD)
 * in the initial HTML — not just an empty <div id="root">. The dynamic
 * `services/:slug` route lists its concrete paths via getStaticPaths so each
 * service page gets its own static file.
 *
 * Pages are imported eagerly: the one genuinely heavy chunk (the three.js
 * hero background) stays lazy-loaded inside Hero, so route-level splitting
 * is not worth the SSG complexity here.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      {
        path: 'services/:slug',
        element: <ServiceDetailPage />,
        getStaticPaths: () => services.map((s) => `/services/${s.slug}`),
      },
      { path: 'work', element: <WorkPage /> },
      { path: 'process', element: <ProcessPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
