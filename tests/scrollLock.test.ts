import { describe, it, expect, beforeEach } from 'vitest';
import {
  lockBodyScroll,
  unlockBodyScroll,
  resetBodyScrollLock,
} from '../src/hooks/useBodyScrollLock';

// Simple DOM environment shim for vitest Node runner
const mockStyles: Record<string, string> = {};
if (typeof globalThis.document === 'undefined') {
  (globalThis as any).document = {
    body: {
      style: {
        get overflow() {
          return mockStyles.overflow || '';
        },
        set overflow(val: string) {
          mockStyles.overflow = val;
        },
        removeProperty(prop: string) {
          delete mockStyles[prop];
        },
      },
    },
  };
}

describe('useBodyScrollLock reference counted manager', () => {
  beforeEach(() => {
    resetBodyScrollLock();
  });

  it('locks body scroll when first modal opens', () => {
    expect(document.body.style.overflow).toBe('');
    lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal closes', () => {
    lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe('');
  });

  it('handles nested modals without prematurely unlocking or leaking hidden overflow', () => {
    // Modal A (e.g. Drawer) opens
    lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');

    // Modal B (e.g. Lightbox on top of Drawer) opens
    lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');

    // Modal B closes (Drawer still open)
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden'); // Should still be locked!

    // Modal A closes
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe(''); // Now cleanly unlocked!
  });

  it('handles multiple unlock calls gracefully', () => {
    lockBodyScroll();
    unlockBodyScroll();
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe('');
  });

  it('resetBodyScrollLock cleanly clears any active locks', () => {
    lockBodyScroll();
    lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');
    resetBodyScrollLock();
    expect(document.body.style.overflow).toBe('');
  });
});
