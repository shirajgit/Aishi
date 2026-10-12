import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { site, services, offer } from '../../data/site';

/* =========================================================
   Aishi Assistant — a lightweight scripted chat widget.
   No backend or API key: it matches keywords against the
   site's own content and routes anything else to WhatsApp
   / the contact page, where the team replies within 24h.
========================================================= */

type Action = { label: string; to?: string; href?: string; intent?: string };
type Msg = { id: number; from: 'bot' | 'user'; text: string; actions?: Action[] };

const svc = (slug: string) => services.find((s) => s.slug === slug);

const WA: Action = { label: 'Chat on WhatsApp', href: site.whatsapp };
const CONTACT: Action = { label: 'Contact page', to: '/contact' };
const SERVICES: Action = { label: 'View all services', to: '/services' };

/** Persistent shortcuts shown above the input. */
const QUICK = ['Services', 'Pricing', 'Timeline', 'Contact'];

function serviceReply(slug: string): { text: string; actions: Action[] } {
  const s = svc(slug)!;
  const price = offer.active ? `Now from ${s.startingPrice} (was ${s.oldPrice}, ${offer.percent}% off)` : `Starts from ${s.startingPrice}`;
  return {
    text: `${s.title}: ${s.desc} ${price}, typically ${s.timeline}.`,
    actions: [{ label: `See ${s.title}`, to: `/services/${s.slug}` }, WA],
  };
}

/** Turn a user message into the bot's reply. */
function respond(raw: string): { text: string; actions?: Action[] } {
  const t = raw.toLowerCase().trim();
  const has = (...w: string[]) => w.some((x) => t.includes(x));

  if (has('hi', 'hello', 'hey', 'yo ', 'namaste') || t === 'hi' || t === 'hey')
    return {
      text: "Hey! I can help you figure out what you need and what it'll cost. What are you looking to build?",
      actions: [SERVICES, WA],
    };

  if (has('price', 'pricing', 'cost', 'cheap', 'budget', 'rate', 'quote', '₹', 'rupee', 'money', 'afford'))
    return {
      text: `Great news — we're running a ${offer.percent}% launch offer right now. Projects start from ${site.pricingFrom} (was ${site.pricingWas}), fixed price quoted up front. Business websites are ₹4,499, web apps from ₹12,499, and AI features from ₹7,499. First consultation is free. Want a quick quote?`,
      actions: [WA, CONTACT],
    };

  if (has('timeline', 'how long', 'time', 'days', 'deadline', 'fast', 'when', 'delivery'))
    return {
      text: 'Most websites and small apps go live in 2–8 days. Bigger systems take a little longer, and we always agree a clear timeline before we start.',
      actions: [WA, CONTACT],
    };

  if (has('website', 'web app', 'webapp', 'dashboard', 'crm', 'admin', 'landing')) return serviceReply('custom-web-apps');
  if (has('mobile', 'android', 'ios', 'app store', 'play store', 'mobile app')) return serviceReply('mobile-apps');
  if (has('marketing', 'seo', 'ads', 'social media', 'promote', 'promotion', 'leads', 'google ad', 'meta ad')) return serviceReply('digital-marketing');
  if (has('ai', 'automation', 'chatbot', 'chat bot', 'gpt', 'smart search')) return serviceReply('ai-automation');
  if (has('attendance', 'payroll', 'staff', 'employee', 'shift', 'biometric')) return serviceReply('attendance-system');
  if (has('school', 'college', 'student', 'education', 'fees', 'timetable')) return serviceReply('school-management');
  if (has('hospital', 'clinic', 'patient', 'doctor', 'pharmacy', 'medical', 'appointment')) return serviceReply('hospital-management');
  if (has('iot', 'hardware', 'sensor', 'esp32', 'arduino', 'home automation', 'smart home')) return serviceReply('iot-hardware');
  if (has('ecommerce', 'e-commerce', 'shop', 'store', 'sell', 'cart', 'product')) return serviceReply('ecommerce-stores');
  if (has('maintenance', 'support', 'update', 'fix', 'bug', 'monitor')) return serviceReply('maintenance-support');

  if (has('service', 'build', 'make', 'do you', 'what can', 'offer'))
    return {
      text: 'We build custom web apps, AI features & automation, school systems, IoT/hardware, business websites, e-commerce stores, and ongoing support. Which one sounds like you?',
      actions: [SERVICES, WA],
    };

  if (has('contact', 'talk', 'reach', 'call', 'human', 'email', 'whatsapp', 'phone', 'connect'))
    return {
      text: 'The fastest way is WhatsApp — we usually reply within 24 hours. You can also send your requirement through the contact page or email us.',
      actions: [WA, { label: 'Email us', href: `mailto:${site.email}` }, CONTACT],
    };

  if (has('who', 'about', 'team', 'location', 'where', 'based'))
    return {
      text: `We're ${site.name} — a small team based in ${site.location} building web apps, automation, and IoT for businesses, schools, and shops. You always talk to the people building your project.`,
      actions: [{ label: 'About us', to: '/about' }, WA],
    };

  if (has('work', 'portfolio', 'project', 'example', 'client'))
    return {
      text: "We build websites, apps, and systems for real businesses, and our portfolio links to the live sites. Take a look and see if something feels close to what you need.",
      actions: [{ label: 'See our work', to: '/work' }, WA],
    };

  if (has('thank', 'thanks', 'thx', 'great', 'awesome', 'cool', 'ok', 'okay'))
    return { text: "Anytime! Whenever you're ready, drop us a message on WhatsApp and we'll take it from there.", actions: [WA] };

  return {
    text: "I'm a quick assistant, so I might not have that exact answer — but the team will, and they usually reply within 24 hours. Want to drop a message on WhatsApp?",
    actions: [WA, CONTACT],
  };
}

let msgId = 0;
const nextId = () => ++msgId;

const GREETING: Msg = {
  id: nextId(),
  from: 'bot',
  text: "Hi! I'm the Aishi assistant. Ask me about our services, pricing, or timelines — or tap a shortcut below.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the latest message in view and focus the field when opened.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const reply = respond(text);
    setMessages((m) => [
      ...m,
      { id: nextId(), from: 'user', text },
      { id: nextId(), from: 'bot', text: reply.text, actions: reply.actions },
    ]);
    setInput('');
  };

  const runIntent = (label: string) => send(label);

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 900,
          width: 58,
          height: 58,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          color: '#000',
          fontSize: 24,
          background: 'linear-gradient(135deg, #38d9f5, #7b8cde)',
          boxShadow: '0 12px 32px rgba(56,217,245,0.4)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? <FiX /> : <FiMessageCircle />}
        {!open && (
          <span
            style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              border: '2px solid rgba(56,217,245,0.5)',
              animation: 'pulse-border 2s ease infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Aishi Assistant"
          style={{
            position: 'fixed',
            bottom: 94,
            right: 24,
            zIndex: 900,
            width: 'min(370px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 130px))',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 22,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'rgba(8,14,31,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            animation: 'fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid var(--border)', background: 'rgba(56,217,245,0.05)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #38d9f5, #7b8cde)', display: 'grid', placeItems: 'center', color: '#000', fontSize: 20, flexShrink: 0 }}>
              <FiMessageCircle />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14 }}>Aishi Assistant</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block' }} />
                Replies within 24 hours
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)', cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 16 }}>
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.from === 'user' ? 'flex-end' : 'flex-start', gap: 8 }}>
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '11px 14px',
                    borderRadius: 16,
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    borderTopRightRadius: m.from === 'user' ? 4 : 16,
                    borderTopLeftRadius: m.from === 'bot' ? 4 : 16,
                    color: m.from === 'user' ? '#001018' : 'var(--text-dim)',
                    background: m.from === 'user' ? 'linear-gradient(135deg, #38d9f5, #7b8cde)' : 'rgba(255,255,255,0.04)',
                    border: m.from === 'bot' ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {m.text}
                </div>
                {m.actions && m.actions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: '90%' }}>
                    {m.actions.map((a) => {
                      const style = {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        padding: '7px 13px',
                        borderRadius: 100,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        border: '1px solid rgba(56,217,245,0.3)',
                        background: 'rgba(56,217,245,0.08)',
                        color: 'var(--cyan)',
                      } as const;
                      if (a.to)
                        return (
                          <Link key={a.label} to={a.to} onClick={() => setOpen(false)} style={style}>
                            {a.label}
                          </Link>
                        );
                      if (a.href)
                        return (
                          <a key={a.label} href={a.href} target="_blank" rel="noreferrer" style={style}>
                            {a.href.startsWith('http') && <FaWhatsapp />}
                            {a.label}
                          </a>
                        );
                      return (
                        <button key={a.label} onClick={() => runIntent(a.intent || a.label)} style={style}>
                          {a.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 16px 10px' }}>
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{ fontSize: 11.5, fontFamily: 'Poppins, sans-serif', fontWeight: 600, padding: '6px 12px', borderRadius: 100, cursor: 'pointer', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-dim)' }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--border)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Type a message"
              style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 100, padding: '10px 16px', color: 'var(--text)', fontSize: 13, outline: 'none' }}
            />
            <button
              type="submit"
              aria-label="Send"
              style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center', color: '#000', fontSize: 16, background: 'linear-gradient(135deg, #38d9f5, #7b8cde)' }}
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
