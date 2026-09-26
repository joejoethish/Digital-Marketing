'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header" style={{ marginBottom: 40 }}>
          <span className="eyebrow">TRANSPARENT & CLEAR</span>
          <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="section-copy" style={{ color: 'var(--muted)', fontSize: 16 }}>
            Everything you need to know about partnering with DEEYORA.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button type="button" className="faq-trigger" onClick={() => toggle(i)}>
                  <span className="faq-question" style={{ fontSize: 16, fontWeight: 700 }}>{faq.q}</span>
                  <span className="faq-icon">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
