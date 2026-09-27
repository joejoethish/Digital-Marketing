import './contact.css';
import FAQSection from '@/components/FAQSection';
import ContactForm from './ContactForm';
import DirectContact from './DirectContact';
import { CONTACT } from '@/lib/contact';

export const metadata = {
  title: 'Contact — DEEYORA',
  description: `Tell us about your business in under a minute. We reply ${CONTACT.responseTime}.`,
};

const NEXT_STEPS = [
  ['We read your message', 'We look at your business and what you want to achieve.'],
  ['We reply ' + CONTACT.responseTime, 'By email or phone — whichever you gave us.'],
  ['We start with a conversation', 'To understand your business, goals, audience, and current digital presence.'],
];

export default function Contact() {
  return (
    <>
      <section className="container contact-page">
        <header className="contact-head" data-kf="contact-hero">
          <div className="eyebrow">Contact DEEYORA</div>
          <h1>
            Let&apos;s start with a <span className="accent">conversation.</span>
          </h1>
          <p>
            You don&apos;t need to have everything figured out. Just tell us who you are and how to reach you — it
            takes less than a minute.
          </p>
        </header>

        <div className="contact-grid" data-kf="contact-form">
          <div className="contact-form-card">
            <ContactForm />
          </div>

          <aside className="contact-side" aria-label="Other ways to reach us">
            <h2>Prefer to reach us directly?</h2>
            <DirectContact />

            <h2 className="contact-side-sub">What happens next</h2>
            <ol className="contact-steps">
              {NEXT_STEPS.map(([title, copy], i) => (
                <li key={title}>
                  <span className="contact-step-num">{i + 1}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="contact-location">{CONTACT.location}</p>
          </aside>
        </div>
      </section>

      <div className="exp-section exp-faq" data-kf="contact-faq">
        <FAQSection />
      </div>
    </>
  );
}
