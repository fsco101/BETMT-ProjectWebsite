import { useEffect, useRef } from 'react';

interface UseStickyCardStackOptions {
  baseTop?: number;
  stepOffset?: number;
  scaleFactor?: number;
}

export function useStickyCardStack(
  itemCount: number,
  options: UseStickyCardStackOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    baseTop = 84, // 84px accounts for sticky header clearance
    stepOffset = 14,
    scaleFactor = 0.035
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return; // Keep sticky styling but skip dynamic scale

    let rafId: number | null = null;

    const updateTransforms = () => {
      rafId = null;
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-sticky-card]')
      );
      if (cards.length === 0) return;

      const cov = cards.map((c, i) => {
        const nx = cards[i + 1];
        if (!nx) return 0;
        const targetDockTop = baseTop + (i + 1) * stepOffset;
        const gap = nx.getBoundingClientRect().top - targetDockTop;
        const cardH = c.offsetHeight || 260;
        return Math.max(0, Math.min(1, 1 - gap / (cardH * 0.85)));
      });

      let acc = 0;
      for (let i = cards.length - 1; i >= 0; i--) {
        acc += cov[i];
        const scale = Math.max(0.88, 1 - scaleFactor * acc);
        cards[i].style.transform = `scale(${scale.toFixed(3)})`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateTransforms);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [itemCount, baseTop, stepOffset, scaleFactor]);

  return { containerRef };
}
