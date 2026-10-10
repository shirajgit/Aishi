import { useState, type FormEvent } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { site } from '../../data/site';

const budgets = ['< ₹10k', '₹10k – ₹25k', '₹25k – ₹50k', '₹50k+', 'Not sure yet'];
const serviceOptions = ['Custom Web App', 'AI / Automation', 'School System', 'IoT / Hardware', 'Other'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact form. Posts to the `/api/contact` serverless function, which emails
 * the enquiry via Resend. If that fails, the visitor is pointed to email/WhatsApp.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Could not send your message.');
      }
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message.');
      setStatus('error');
    }
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

      {/* Honeypot — hidden from people, filled by bots */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />

      <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
        {status === 'sending' ? 'Sending…' : <>Send Requirement <FiArrowRight /></>}
      </button>

      {status === 'sent' && (
        <p role="status" style={{ marginTop: 16, fontSize: 13, color: 'var(--cyan)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <FiCheckCircle style={{ flexShrink: 0 }} /> Thanks — your requirement has been sent. We'll get back to you soon. Prefer WhatsApp?{' '}
          <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Chat here</a>.
        </p>
      )}

      {status === 'error' && (
        <p role="alert" style={{ marginTop: 16, fontSize: 13, color: '#ff8a8a', textAlign: 'center' }}>
          {error} You can also email us at{' '}
          <a href={`mailto:${site.email}`} style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>{site.email}</a> or{' '}
          <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>chat on WhatsApp</a>.
        </p>
      )}
    </form>
  );
}
