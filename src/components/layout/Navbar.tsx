import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { navItems, site } from '../../data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 20px' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px 10px 16px',
          borderRadius: 100,
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)'}`,
          background: scrolled ? 'rgba(2,5,15,0.88)' : 'rgba(2,5,15,0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: scrolled
            ? '0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,217,245,0.04)'
            : 'none',
          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              border: '1px solid rgba(56,217,245,0.2)',
              background: 'rgba(56,217,245,0.08)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 0 20px rgba(56,217,245,0.1)',
            }}
          >
            <img
              src="/Aishi.png"
              alt="Aishi"
              style={{ borderRadius: 10, width: 28, height: 28, objectFit: 'cover' }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: '0.08em',
                color: 'var(--text)',
              }}
            >
              {site.short}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              Technologies
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden-mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn-primary hidden-mobile" style={{ fontSize: 12 }}>
          Free Consultation <FiArrowRight style={{ opacity: 0.7 }} />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((p) => !p)}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            width: 42,
            height: 42,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}
          className="show-mobile"
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 20,
                height: 1.5,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'transform 0.3s, opacity 0.3s',
                transform: open
                  ? i === 0
                    ? 'translateY(6.5px) rotate(45deg)'
                    : i === 2
                    ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'none'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            maxWidth: 1280,
            margin: '10px auto 0',
            borderRadius: 24,
            border: '1px solid var(--border)',
            background: 'rgba(2,5,15,0.96)',
            padding: 16,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                borderRadius: 14,
                textDecoration: 'none',
                color: 'var(--text-dim)',
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              <span>{item.label}</span>
              <FiArrowRight style={{ opacity: 0.4, fontSize: 12 }} />
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}
          >
            Get Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
