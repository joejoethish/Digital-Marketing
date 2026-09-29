'use client';

import { useEffect } from 'react';

const isEditable = (el: EventTarget | null) =>
  el instanceof HTMLElement &&
  (el.isContentEditable || !!el.closest('input, textarea, select, [contenteditable="true"]'));

// Browser shortcuts that open DevTools / page source. Matched on e.code so
// Mac Option-key combos (which change e.key) are still caught.
const isInspectShortcut = (e: KeyboardEvent) => {
  if (e.key === 'F12') return true;
  const mod = e.ctrlKey || e.metaKey;
  if (!mod) return false;
  // Ctrl+Shift+I/J/C (Windows/Linux), Cmd+Option+I/J/C (Mac)
  if ((e.shiftKey || e.altKey) && ['KeyI', 'KeyJ', 'KeyC', 'KeyK'].includes(e.code)) return true;
  // View source (Ctrl+U / Cmd+Option+U) and Save page (Ctrl/Cmd+S)
  return e.code === 'KeyU' || e.code === 'KeyS';
};

/**
 * Site-wide: blocks text selection by mouse (drag, double/triple click) and
 * keyboard (Ctrl/Cmd+A, Shift+arrows), plus copy/cut of page text.
 * Form fields are left alone so the contact form keeps working normally.
 *
 * In production it also disables the right-click menu and the DevTools /
 * view-source shortcuts. Left on in development so the site can be debugged.
 */
export default function ContentGuard() {
  useEffect(() => {
    const lockInspect = process.env.NODE_ENV === 'production';

    const block = (e: Event) => {
      if (!isEditable(e.target)) e.preventDefault();
    };
    const blockAlways = (e: Event) => e.preventDefault();
    const onKeyDown = (e: KeyboardEvent) => {
      if (lockInspect && isInspectShortcut(e)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (isEditable(e.target)) return;
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === 'a' || key === 'c' || key === 'x')) {
        e.preventDefault();
      }
    };
    const clearStray = () => {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && !isEditable(document.activeElement)) sel.removeAllRanges();
    };

    document.addEventListener('selectstart', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('selectionchange', clearStray);
    window.addEventListener('keydown', onKeyDown, true);
    if (lockInspect) window.addEventListener('contextmenu', blockAlways, true);
    return () => {
      document.removeEventListener('selectstart', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('selectionchange', clearStray);
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('contextmenu', blockAlways, true);
    };
  }, []);

  return null;
}
