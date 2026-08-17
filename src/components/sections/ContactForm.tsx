import { useState, type FormEvent } from 'react';
import { site } from '../../data/site';

const budgets = ['< ₹10k', '₹10k – ₹25k', '₹25k – ₹50k', '₹50k+', 'Not sure yet'];
const serviceOptions = ['Custom Web App', 'AI / Automation', 'School System', 'IoT / Hardware', 'Other'];

/**
 * Contact form. With no backend configured it composes a prefilled email via
 * `mailto:` so the message actually reaches the inbox — no data is lost.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const service = String(data.get('service') || '');
    const budget = String(data.get('budget') || '');
    const message = String(data.get('message') || '');

    const subject = `New project enquiry — ${service || 'General'} (${name})`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      '',
      'Requirement:',
      message,
    ].join('\n');

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const labelStyle = { display: 'block', fontSize: 12, color: 'var(--text-dim)', marginBottom: 8, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.04em' } as const;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ borderRadius: 28, border: '1px solid var(--border)', background: 'rgba(8,14,31,0.7)', backdropFilter: 'blur(20px)', padding: 32 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }} className="form-row">
        <div>
          <label style={labelStyle} htmlFor="name">Your Name</label>
          <input id="name" name="name" required className="field" placeholder="e.g. Shiraj" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="field" placeholder="you@company.com" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }} className="form-row">
        <div>
          <label style={labelStyle} htmlFor="service">Service</label>
          <select id="service" name="service" className="field" defaultValue="">
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} style={{ background: '#0c1428' }}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="budget">Budget Range</label>
          <select id="budget" name="budget" className="field" defaultValue="">
            <option value="" disabled>Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b} style={{ background: '#0c1428' }}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle} htmlFor="message">Requirement</label>
        <textarea id="message" name="message" required className="field" placeholder="Tell us what you want to build, your deadline, and any details…" />
      </div>

      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Send Requirement →
      </button>

      {sent && (
        <p style={{ marginTop: 16, fontSize: 13, color: 'var(--cyan)', textAlign: 'center' }}>
          ✓ Your email app should have opened with the message ready to send. Prefer WhatsApp?{' '}
          <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Chat here</a>.
        </p>
      )}
    </form>
  );
}
