'use client';

import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ConceptWorkItem } from '@/lib/data';

interface Props {
  item: ConceptWorkItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="badge" style={{ background: 'rgba(139,111,192,0.15)', color: 'var(--accent)', fontWeight: 700, padding: '4px 10px', borderRadius: 6, fontSize: 12 }}>
              {item.badge}
            </span>
            <h2 className="modal-title" style={{ marginTop: 10, fontSize: 24 }}>{item.title}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="modal-section">
            <h4 style={{ color: 'var(--navy)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.1em', marginBottom: 6 }}>
              The Challenge
            </h4>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.challenge}</p>
          </div>

          <div className="modal-section">
            <h4 style={{ color: 'var(--navy)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.1em', marginBottom: 6 }}>
              The Approach
            </h4>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.approach}</p>
          </div>

          <div className="modal-section">
            <h4 style={{ color: 'var(--navy)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.1em', marginBottom: 6 }}>
              The Execution
            </h4>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.execution}</p>
          </div>

          <div className="modal-section">
            <h4 style={{ color: 'var(--navy)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.1em', marginBottom: 6 }}>
              The Outcome
            </h4>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.outcome}</p>
          </div>

          {/* Tags */}
          <div className="modal-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {item.tags.map((tag) => (
              <span key={tag} className="tag-micro">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="modal-footer" style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onClose} className="btn-secondary btn-sm">
            Close
          </button>
          <Link href="/contact" className="btn-primary btn-sm" onClick={onClose}>
            <span>START A PROJECT</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
