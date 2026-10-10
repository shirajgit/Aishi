/**
 * Vercel serverless function: receives the contact form and emails it via Resend.
 * The API key stays server-side — set RESEND_API_KEY in the Vercel project env.
 */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'shirajmujawar03@gmail.com';
// Until a domain is verified in Resend, only the onboarding sender is allowed.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Aishi Website <onboarding@resend.dev>';

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: 'Email service is not configured.' }, 500);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(payload.company, 200)) return json({ ok: true }, 200);

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const service = clean(payload.service, 80);
  const budget = clean(payload.budget, 80);
  const message = clean(payload.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please fill in your name, a valid email and your requirement.' }, 400);
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service || '—'}`,
    `Budget: ${budget || '—'}`,
    '',
    'Requirement:',
    message,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New project enquiry — ${service || 'General'} (${name.replace(/[\r\n]+/g, ' ')})`,
      text,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return json({ error: 'Could not send your message. Please try again.' }, 502);
  }

  return json({ ok: true }, 200);
}
