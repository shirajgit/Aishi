import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Each page is its own chunk — only the visited route is downloaded.
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '2px solid rgba(56,217,245,0.2)',
          borderTopColor: '#38d9f5',
          animation: 'spin-slow 0.8s linear infinite',
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<PageFallback />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <ServiceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/work"
            element={
              <Suspense fallback={<PageFallback />}>
                <WorkPage />
              </Suspense>
            }
          />
          <Route
            path="/process"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProcessPage />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
