'use client';

import { useState } from 'react';
import { Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import FAQSection from '@/components/FAQSection';

const LOOKING_FOR_OPTIONS = [
  'Brand & Strategy',
  'Social Media & Content',
  'Paid Advertising',
  'Website & CRO',
  'SEO & Organic Growth',
  'Analytics & Reporting',
  'Not Sure Yet',
];

export default function Contact() {
  const [selectedLookingFor, setSelectedLookingFor] = useState<string>('Not Sure Yet');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div className="container subhero" style={{ paddingBottom: 60 }}>
        <div className="eyebrow">CONTACT DEEYORA</div>
        <h1 className="hero-headline" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', margin: '16px 0 20px', lineHeight: 1.1 }}>
          LET'S START WITH A <span className="accent">CONVERSATION.</span>
        </h1>

        <div className="subgrid" style={{ marginTop: 36, gap: 40 }}>
          {/* Left Column: Context & Contact details */}
          <div>
            <p className="section-copy" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 32 }}>
              You don't need to have everything figured out before reaching out. Tell us about your business, what you're trying to achieve, and where you're currently stuck. We'll take it from there.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, margin: '32px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(139,111,192,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail className="accent" size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 15, color: 'var(--navy)' }}>Direct Email</strong>
                  <a href="mailto:hello@deeyora.com" style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none' }}>
                    hello@deeyora.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(139,111,192,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin className="accent" size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 15, color: 'var(--navy)' }}>Location</strong>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>India · Working Globally</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="calculator-card" style={{ margin: 0, padding: 36 }}>
            {sent ? (
              <div style={{ padding: '30px 0', textAlign: 'center' }}>
                <CheckCircle2 size={48} className="accent" style={{ margin: '0 auto 16px auto' }} />
                <div className="eyebrow">INQUIRY RECEIVED</div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, color: 'var(--navy)', margin: '12px 0' }}>
                  Thank you for reaching out.
                </h2>
                <p className="section-copy" style={{ margin: '0 auto', fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>
                  We'll review your business details and get back to you shortly to schedule a conversation.
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
                      NAME *
                    </label>
                    <input
                      required
                      placeholder="Your Name"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--line)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
                      WORK EMAIL *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--line)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
                      BUSINESS / BRAND *
                    </label>
                    <input
                      required
                      placeholder="Company Name"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--line)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
                      WEBSITE OR SOCIAL PROFILE
                    </label>
                    <input
                      placeholder="https://yourbrand.com or @handle"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--line)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8 }}>
                      WHAT ARE YOU LOOKING FOR?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {LOOKING_FOR_OPTIONS.map((opt) => {
                        const isSelected = selectedLookingFor === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={`calc-type-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => setSelectedLookingFor(opt)}
                            style={{ fontSize: 12, padding: '6px 12px' }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
                      WHAT'S YOUR GOAL?
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us briefly about your business and what you'd like to improve."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid var(--line)' }}
                    />
                  </div>

                  <button className="btn-primary" style={{ marginTop: 10, justifyContent: 'center' }}>
                    <span>SEND INQUIRY</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section on Contact page */}
      <FAQSection />
    </>
  );
}
