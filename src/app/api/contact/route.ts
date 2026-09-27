import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EMAIL_RE, enquiryText, type EnquiryPayload } from '@/lib/contact';

// Delivers contact-form enquiries by email over SMTP.
// Configure in .env.local (or your host's environment variables):
//   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS,
//   CONTACT_TO   (inbox that receives enquiries, defaults to SMTP_USER)
//   CONTACT_FROM (optional sender, defaults to SMTP_USER)
// Without SMTP settings the route answers 503 and the form falls back to
// opening the visitor's email app with the message pre-filled.
// Deliberately no rate limits, spam filters or format checks: any enquiry
// with something in it is delivered.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const enquiry = {
    name: clean(body.name, 100),
    contact: clean(body.contact, 200),
    needs: Array.isArray(body.needs) ? body.needs.map((n) => clean(n, 60)).filter(Boolean).slice(0, 10) : [],
    message: clean(body.message, 5000),
  };
  if (!enquiry.name && !enquiry.contact && !enquiry.message && !enquiry.needs.length) {
    return NextResponse.json({ error: 'empty' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[contact] SMTP is not configured; enquiry not emailed:', enquiry.name, enquiry.contact);
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || `"DEEYORA Website" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: EMAIL_RE.test(enquiry.contact) ? enquiry.contact : undefined,
      subject: `New enquiry from ${enquiry.name || enquiry.contact || 'the website'}`,
      text: `${enquiryText(enquiry)}\n\n— Sent from the contact form on the DEEYORA website`,
    });
  } catch (err) {
    console.error('[contact] failed to send enquiry email:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
