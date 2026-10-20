import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoCollapseOnScrollOptions {
  collapseThreshold?: number; // Scroll distance (px) away from card needed to auto-collapse (default: 140)
  restoreThreshold?: number;  // Distance (px) from origin needed to re-expand when scrolling back (default: 50)
}

/**
 * Eliminates flickering when scrolling between sticky cards by using:
 * 1. Directional delta accumulation (user must actively reverse scroll direction to restore)
 * 2. Asymmetric hysteresis gap (140px collapse vs 50px restore = 90px deadband)
 * 3. Settlement cooldown (300ms lock during expand/collapse reflow)
 * 4. Synthetic jump filter (rejects single-frame layout recalculations > 280px)
 */
export function useAutoCollapseOnScroll(options: UseAutoCollapseOnScrollOptions = {}) {
  const { collapseThreshold = 140, restoreThreshold = 50 } = options;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const activeIdRef = useRef<string | null>(null);
  const isAutoCollapsedRef = useRef(false);
  const isAllExpandedRef = useRef(false);

  // Accumulated net user scroll distance since the card was opened
  const accumulatedScrollRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const cooldownUntilRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => {
    isAutoCollapsedRef.current = isAutoCollapsed;
  }, [isAutoCollapsed]);

  useEffect(() => {
    isAllExpandedRef.current = isAllExpanded;
  }, [isAllExpanded]);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  // Toggle card open or closed
  const toggleCard = useCallback((id: string) => {
    setIsAllExpanded(false);
    isAllExpandedRef.current = false;

    setActiveId(prev => {
      // If user clicked the currently open card, manually collapse it permanently
      if (prev === id && !isAutoCollapsedRef.current) {
        activeIdRef.current = null;
        setIsAutoCollapsed(false);
        isAutoCollapsedRef.current = false;
        accumulatedScrollRef.current = 0;
        return null;
      }

      // Open this card
      activeIdRef.current = id;
      setIsAutoCollapsed(false);
      isAutoCollapsedRef.current = false;
      accumulatedScrollRef.current = 0;
      lastScrollYRef.current = window.scrollY;
      cooldownUntilRef.current = Date.now() + 400; // 400ms cooldown to ignore click inertia
      return id;
    });
  }, []);

  // Expand all cards
  const expandAll = useCallback(() => {
    setActiveId(null);
    activeIdRef.current = null;
    setIsAllExpanded(true);
    isAllExpandedRef.current = true;
    setIsAutoCollapsed(false);
    isAutoCollapsedRef.current = false;
    accumulatedScrollRef.current = 0;
    lastScrollYRef.current = window.scrollY;
    cooldownUntilRef.current = Date.now() + 400;
  }, []);

  // Collapse all cards
  const collapseAll = useCallback(() => {
    setActiveId(null);
    activeIdRef.current = null;
    setIsAllExpanded(false);
    isAllExpandedRef.current = false;
    setIsAutoCollapsed(false);
    isAutoCollapsedRef.current = false;
    accumulatedScrollRef.current = 0;
  }, []);

  // Check if a specific card should be displayed open
  const isCardOpen = useCallback((id: string) => {
    if (isAllExpanded && !isAutoCollapsed) return true;
    return activeId === id && !isAutoCollapsed;
  }, [activeId, isAutoCollapsed, isAllExpanded]);

  // Scroll listener: directional tracking with settlement cooldown to eliminate flickering
  useEffect(() => {
    if (!activeId && !isAllExpanded) {
      accumulatedScrollRef.current = 0;
      return;
    }

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const now = Date.now();
      // Guard against click momentum or mid-transition layout reflow
      if (now < cooldownUntilRef.current) {
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      // Ignore micro-jitters (< 2px)
      if (Math.abs(delta) < 2) return;

      // Ignore synthetic layout jumps (> 280px in a single frame) caused by DOM reflow
      if (Math.abs(delta) > 280) return;

      if (!isAutoCollapsedRef.current) {
        // Card is currently OPEN:
        // Accumulate scroll distance away from the card
        accumulatedScrollRef.current += delta;

        // When user scrolls away by collapseThreshold (e.g. 140px towards the next card):
        if (Math.abs(accumulatedScrollRef.current) >= collapseThreshold) {
          setIsAutoCollapsed(true);
          isAutoCollapsedRef.current = true;
          // 300ms cooldown so the collapse animation and reflow settle completely without flicker
          cooldownUntilRef.current = Date.now() + 300;
        }
      } else {
        // Card was AUTO-COLLAPSED:
        // Accumulate scroll. To re-expand, user must scroll BACK towards the origin!
        accumulatedScrollRef.current += delta;

        // Determine if user has returned to the card's original location
        const isBackNearOrigin = Math.abs(accumulatedScrollRef.current) <= restoreThreshold;

        // Must be scrolling in the reverse direction (or back at origin):
        // If they scrolled down (accumulated > 0), they must now be scrolling up (delta < 0)
        // If they scrolled up (accumulated < 0), they must now be scrolling down (delta > 0)
        const isReversingScroll = (accumulatedScrollRef.current > 0 && delta < 0) ||
                                  (accumulatedScrollRef.current < 0 && delta > 0) ||
                                  isBackNearOrigin;

        if (isBackNearOrigin && isReversingScroll) {
          setIsAutoCollapsed(false);
          isAutoCollapsedRef.current = false;
          accumulatedScrollRef.current = 0;
          // 300ms cooldown so the re-expand animation settles cleanly without flicker
          cooldownUntilRef.current = Date.now() + 300;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeId, isAllExpanded, collapseThreshold, restoreThreshold]);

  return {
    activeId,
    isAutoCollapsed,
    isCardOpen,
    toggleCard,
    expandAll,
    collapseAll
  };
}
