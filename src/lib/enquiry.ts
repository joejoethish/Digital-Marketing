// Client-side delivery for contact enquiries. Enquiries written while offline
// (or when the request fails mid-flight) are kept in an outbox and sent
// automatically once the connection returns — on any page of the site.

import type { EnquiryPayload } from './contact';

const OUTBOX_KEY = 'deeyora-enquiry-outbox';
export const DRAFT_KEY = 'deeyora-enquiry-draft';
export const SENT_EVENT = 'deeyora:enquiry-sent';

export type SendResult = 'sent' | 'queued' | 'fallback' | 'empty';

function readOutbox(): EnquiryPayload[] {
  try {
    return JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeOutbox(items: EnquiryPayload[]) {
  if (items.length) localStorage.setItem(OUTBOX_KEY, JSON.stringify(items));
  else localStorage.removeItem(OUTBOX_KEY);
}

async function post(payload: EnquiryPayload) {
  return fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<SendResult> {
  const queue = () => {
    writeOutbox([...readOutbox(), payload]);
    return 'queued' as const;
  };
  if (!navigator.onLine) return queue();
  try {
    const res = await post(payload);
    if (res.ok) return 'sent';
    if (res.status === 422) return 'empty';
    return 'fallback';
  } catch {
    return queue();
  }
}

let flushing = false;

/** Sends anything waiting in the outbox. Safe to call often. */
export async function flushOutbox() {
  if (flushing || !navigator.onLine) return;
  const items = readOutbox();
  if (!items.length) return;
  flushing = true;
  const remaining: EnquiryPayload[] = [];
  for (const item of items) {
    try {
      const res = await post(item);
      // A 4xx will never succeed on retry; drop those.
      if (res.ok || (res.status >= 400 && res.status < 500)) {
        if (res.ok) window.dispatchEvent(new CustomEvent(SENT_EVENT, { detail: item }));
      } else {
        remaining.push(item);
      }
    } catch {
      remaining.push(item);
    }
  }
  writeOutbox(remaining);
  flushing = false;
}

export const hasQueuedEnquiries = () => readOutbox().length > 0;
