'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Copy, Mail, MessageCircle, WifiOff } from 'lucide-react';
import {
  CONTACT,
  NEED_OPTIONS,
  enquiryText,
  mailtoLink,
  whatsappLink,
  type EnquiryPayload,
} from '@/lib/contact';
import { DRAFT_KEY, SENT_EVENT, flushOutbox, sendEnquiry } from '@/lib/enquiry';
import { pulseStage } from '@/components/experience/stageStore';

type Status = 'idle' | 'sending' | 'sent' | 'queued' | 'fallback';

interface Draft {
  name: string;
  contact: string;
  needs: string[];
  message: string;
}

const EMPTY: Draft = { name: '', contact: '', needs: [], message: '' };

export default function ContactForm() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Restore an unfinished draft so nothing typed is ever lost.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDraft({ ...EMPTY, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (status !== 'idle') return;
    const empty = !draft.name && !draft.contact && !draft.message && !draft.needs.length;
    if (empty) localStorage.removeItem(DRAFT_KEY);
    else localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draft, status]);

  // A queued (offline) message was delivered in the background.
  useEffect(() => {
    const onSent = () => setStatus((s) => (s === 'queued' ? 'sent' : s));
    const onOnline = () => flushOutbox();
    window.addEventListener(SENT_EVENT, onSent);
    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener(SENT_EVENT, onSent);
      window.removeEventListener('online', onOnline);
    };
  }, []);

  // Bring the confirmation into view (the result is shorter than the form).
  useEffect(() => {
    if (status !== 'idle' && status !== 'sending') {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [status]);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    pulseStage(0.08); // the 3D engine stirs as you type
    setError('');
  };

  const toggleNeed = (need: string) =>
    update('needs', draft.needs.includes(need) ? draft.needs.filter((n) => n !== need) : [...draft.needs, need]);

  // No restrictions: anything at all can be sent. Only a completely blank form is held back.
  const isBlank = !draft.name.trim() && !draft.contact.trim() && !draft.message.trim() && !draft.needs.length;
  const BLANK_MESSAGE = 'Write anything at all and we’ll get it.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (isBlank) {
      setError(BLANK_MESSAGE);
      nameRef.current?.focus();
      return;
    }
    setStatus('sending');
    const payload: EnquiryPayload = {
      name: draft.name.trim(),
      contact: draft.contact.trim(),
      needs: draft.needs,
      message: draft.message.trim(),
    };
    const result = await sendEnquiry(payload);
    if (result === 'empty') {
      setStatus('idle');
      setError(BLANK_MESSAGE);
      return;
    }
    if (result !== 'fallback') localStorage.removeItem(DRAFT_KEY);
    if (result === 'sent' || result === 'queued') pulseStage(1.6);
    setStatus(result);
  };

  const reset = () => {
    setDraft(EMPTY);
    setError('');
    setStatus('idle');
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(enquiryText(draft));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const firstName = draft.name.trim().split(/\s+/)[0];

  if (status === 'sent') {
    return (
      <div ref={resultRef} className="cf-result" role="status">
        <CheckCircle2 size={44} className="accent" aria-hidden="true" />
        <h2>Thank you{firstName ? `, ${firstName}` : ''}!</h2>
        <p>
          Your message is with us.{' '}
          {draft.contact ? (
            <>
              We&apos;ll reply {CONTACT.responseTime} at <strong>{draft.contact}</strong>.
            </>
          ) : (
            <>
              If you&apos;d like a reply, email us at <a href={mailtoLink()}>{CONTACT.email}</a>.
            </>
          )}
        </p>
        <button type="button" className="cf-link" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  if (status === 'queued') {
    return (
      <div ref={resultRef} className="cf-result" role="status">
        <WifiOff size={40} className="accent" aria-hidden="true" />
        <h2>You&apos;re offline — your message is saved.</h2>
        <p>
          It will be sent automatically as soon as you&apos;re back online. You can keep browsing or close this page.
        </p>
      </div>
    );
  }

  if (status === 'fallback') {
    const wa = whatsappLink(enquiryText(draft));
    return (
      <div ref={resultRef} className="cf-result" role="status">
        <Mail size={40} className="accent" aria-hidden="true" />
        <h2>Almost there — send it in one tap.</h2>
        <p>We couldn&apos;t send your message automatically. Your details are ready to go:</p>
        <div className="cf-fallback">
          <a className="btn-primary" href={mailtoLink(draft)}>
            <Mail size={16} aria-hidden="true" />
            <span>Email it to us</span>
          </a>
          {wa && (
            <a className="cf-btn-soft" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </a>
          )}
          <button type="button" className="cf-btn-soft" onClick={copyMessage}>
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy message'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate aria-describedby="cf-intro">
      <p id="cf-intro" className="cf-intro">
        Two quick details and we&apos;ll take it from there.
      </p>

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-name">Your name</label>
          <input
            ref={nameRef}
            id="cf-name"
            name="name"
            autoComplete="name"
            enterKeyHint="next"
            placeholder="e.g. Priya Sharma"
            value={draft.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>

        <div className="cf-field">
          <label htmlFor="cf-contact">Email or phone</label>
          <input
            id="cf-contact"
            name="contact"
            autoComplete="email"
            enterKeyHint="next"
            placeholder="you@business.com or +91…"
            value={draft.contact}
            onChange={(e) => update('contact', e.target.value)}
            aria-describedby="cf-contact-hint"
          />
          <p id="cf-contact-hint" className="cf-hint">
            Whichever you prefer — we&apos;ll reply there.
          </p>
        </div>
      </div>

      <fieldset className="cf-field">
        <legend>
          What can we help with? <span className="cf-optional">Optional · pick any</span>
        </legend>
        <div className="cf-chips">
          {NEED_OPTIONS.map((need) => {
            const on = draft.needs.includes(need);
            return (
              <button
                key={need}
                type="button"
                className={`cf-chip ${on ? 'is-on' : ''}`}
                aria-pressed={on}
                onClick={() => toggleNeed(need)}
              >
                {on && <Check size={13} aria-hidden="true" />}
                {need}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="cf-field">
        <label htmlFor="cf-message">
          Anything you&apos;d like to share? <span className="cf-optional">Optional</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="A sentence is plenty — e.g. “We’re a new café and want more local customers from Instagram.”"
          value={draft.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      {error && (
        <p className="cf-error cf-form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary cf-submit" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <span className="cf-spinner" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <span>Send message</span>
            <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
      <p className="cf-note">No commitment. We reply {CONTACT.responseTime}.</p>
    </form>
  );
}
