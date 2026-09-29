// Single source of truth for how customers can reach DEEYORA.
// The details live in the env file (see .env.example). Leave `phone`,
// `whatsapp` or `instagram` empty to hide those buttons. They're
// NEXT_PUBLIC_ because client components (the header, contact page) read
// them — they're inlined at build time, so restart `next dev` after editing.

export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@deeyora.com',
  /** Display + dial format, e.g. '+91 98765 43210'. */
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  /** Digits only, with country code, e.g. '919876543210'. */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  /** Full profile URL, e.g. 'https://instagram.com/deeyora'. */
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  responseTime: 'within 24 hours',
  location: 'India · Working Globally',
};

export const NEED_OPTIONS = [
  'Brand & Strategy',
  'Social Media & Content',
  'Paid Advertising',
  'Website & Conversion',
  'SEO',
  'Analytics & Reporting',
  'Not sure yet',
];

export interface EnquiryPayload {
  name: string;
  contact: string;
  needs: string[];
  message: string;
}

/** Only used to set Reply-To on the notification email — never to block a submission. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function whatsappLink(text = '') {
  if (!CONTACT.whatsapp) return '';
  return `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export function enquiryText(p: Pick<EnquiryPayload, 'name' | 'contact' | 'needs' | 'message'>) {
  return [
    p.name ? `Name: ${p.name}` : '',
    p.contact ? `Contact: ${p.contact}` : '',
    p.needs.length ? `Interested in: ${p.needs.join(', ')}` : '',
    p.message ? `\n${p.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/** mailto: link pre-filled with the enquiry — used as a no-server fallback. */
export function mailtoLink(p?: Pick<EnquiryPayload, 'name' | 'contact' | 'needs' | 'message'>) {
  if (!p) return `mailto:${CONTACT.email}`;
  const subject = p.name ? `Enquiry from ${p.name}` : 'Enquiry from the website';
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryText(p))}`;
}
