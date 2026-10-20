import { useEffect } from 'react';

// Global reference counter for modal locks across the entire application
let lockCount = 0;
let previousOverflow = '';

/**
 * Locks the body scroll. Safe for nested modals.
 */
export function lockBodyScroll(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

/**
 * Decrements the lock counter and releases the body scroll when no modals are active.
 */
export function unlockBodyScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    if (previousOverflow && previousOverflow !== 'hidden') {
      document.body.style.overflow = previousOverflow;
    } else {
      document.body.style.removeProperty('overflow');
    }
    previousOverflow = '';
  }
}

/**
 * Force-resets body scroll lock. Useful for page transitions or emergency cleanup.
 */
export function resetBodyScrollLock(): void {
  if (typeof document === 'undefined') return;
  lockCount = 0;
  previousOverflow = '';
  document.body.style.removeProperty('overflow');
}

/**
 * React hook to lock body scrolling when a modal or overlay is open.
 * Safely handles nested modals (e.g. Lightbox over a Drawer), rapid toggling, and clean unmounting.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [isLocked]);
}
