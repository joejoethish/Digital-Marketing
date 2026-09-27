'use client';

import { useState } from 'react';
import { Check, Copy, Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, mailtoLink, whatsappLink } from '@/lib/contact';

/** One-tap ways to reach DEEYORA without filling in the form. */
export default function DirectContact() {
  const [copied, setCopied] = useState(false);
  const wa = whatsappLink('Hi DEEYORA, I’d like to talk about growing my business.');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="dc">
      <div className="dc-item">
        <a className="dc-main" href={mailtoLink()}>
          <span className="dc-icon">
            <Mail size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="dc-label">Email us</span>
            <span className="dc-value">{CONTACT.email}</span>
          </span>
        </a>
        <button type="button" className="dc-copy" onClick={copyEmail} aria-label="Copy email address">
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {wa && (
        <div className="dc-item">
          <a className="dc-main" href={wa} target="_blank" rel="noopener noreferrer">
            <span className="dc-icon dc-icon-wa">
              <MessageCircle size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="dc-label">WhatsApp</span>
              <span className="dc-value">Chat with us now</span>
            </span>
          </a>
        </div>
      )}

      {CONTACT.phone && (
        <div className="dc-item">
          <a className="dc-main" href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`}>
            <span className="dc-icon">
              <Phone size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="dc-label">Call us</span>
              <span className="dc-value">{CONTACT.phone}</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
