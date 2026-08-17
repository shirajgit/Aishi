import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CursorGlow from '../ui/CursorGlow';

/** App shell: cursor glow + nav on top, routed page in the middle, footer at the bottom. */
export default function Layout() {
  return (
    <div
      className="noise"
      style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', position: 'relative', overflow: 'hidden' }}
    >
      <ScrollToTop />
      <CursorGlow />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
