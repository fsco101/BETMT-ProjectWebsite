import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoCollapseOnScrollOptions {
  minCollapseThreshold?: number; // Minimum pixels of scroll delta before auto-collapsing (default: 300)
  restoreRatio?: number;         // Ratio of collapse threshold required to re-expand when scrolling back (default: 0.8)
}

export function useAutoCollapseOnScroll(options: UseAutoCollapseOnScrollOptions = {}) {
  const { minCollapseThreshold = 300, restoreRatio = 0.8 } = options;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const expandScrollYRef = useRef<number | null>(null);
  const isAutoCollapsedRef = useRef(false);
  const isAllExpandedRef = useRef(false);
  const openTimestampRef = useRef<number>(0);

  // Sync refs with state to prevent stale closures in scroll listener
  useEffect(() => {
    isAutoCollapsedRef.current = isAutoCollapsed;
  }, [isAutoCollapsed]);

  useEffect(() => {
    isAllExpandedRef.current = isAllExpanded;
  }, [isAllExpanded]);

  // Toggle or open a single card
  const toggleCard = useCallback((id: string) => {
    setIsAllExpanded(false);
    isAllExpandedRef.current = false;

    setActiveId(prev => {
      // If user clicks the currently open card, manually close it
      if (prev === id && !isAutoCollapsedRef.current) {
        expandScrollYRef.current = null;
        setIsAutoCollapsed(false);
        isAutoCollapsedRef.current = false;
        return null;
      }

      // Open this card, record scroll position anchor, and set cooldown against click momentum
      expandScrollYRef.current = window.scrollY;
      openTimestampRef.current = Date.now() + 400; // 400ms cooldown
      setIsAutoCollapsed(false);
      isAutoCollapsedRef.current = false;
      return id;
    });
  }, []);

  // Expand all cards
  const expandAll = useCallback(() => {
    setActiveId(null);
    expandScrollYRef.current = window.scrollY;
    openTimestampRef.current = Date.now() + 400;
    setIsAllExpanded(true);
    isAllExpandedRef.current = true;
    setIsAutoCollapsed(false);
    isAutoCollapsedRef.current = false;
  }, []);

  // Collapse all cards manually
  const collapseAll = useCallback(() => {
    setActiveId(null);
    expandScrollYRef.current = null;
    setIsAllExpanded(false);
    isAllExpandedRef.current = false;
    setIsAutoCollapsed(false);
    isAutoCollapsedRef.current = false;
  }, []);

  // Determine if a given card is currently open
  const isCardOpen = useCallback((id: string) => {
    if (isAllExpanded && !isAutoCollapsed) return true;
    return activeId === id && !isAutoCollapsed;
  }, [activeId, isAutoCollapsed, isAllExpanded]);

  // Scroll listener: handles both auto-collapse on scroll away AND re-expansion on scroll back
  useEffect(() => {
    if (!activeId && !isAllExpanded) {
      expandScrollYRef.current = null;
      return;
    }

    const handleScroll = () => {
      if (expandScrollYRef.current === null) return;

      // Ignore micro-scrolls during the 400ms opening transition to avoid closing from click momentum
      if (Date.now() < openTimestampRef.current) return;

      // Calculate dynamic threshold based on the actual card's rendered height
      let cardHeight = 360;
      if (activeId) {
        const cardEl = document.querySelector(`[data-card-id="${activeId}"]`) as HTMLElement | null;
        if (cardEl && cardEl.offsetHeight > 100) {
          cardHeight = cardEl.offsetHeight;
        }
      }

      // Generous threshold allowing the user to comfortably scroll and read inside the card
      const collapseThreshold = Math.max(minCollapseThreshold, cardHeight * 0.75);
      const restoreThreshold = collapseThreshold * restoreRatio;

      const diff = Math.abs(window.scrollY - expandScrollYRef.current);

      if (!isAutoCollapsedRef.current) {
        // Card is currently expanded: only collapse when user has scrolled away past the card
        if (diff > collapseThreshold) {
          setIsAutoCollapsed(true);
          isAutoCollapsedRef.current = true;
        }
      } else {
        // Card was auto-collapsed: when user scrolls back within the card's reading range, re-expand!
        if (diff <= restoreThreshold) {
          setIsAutoCollapsed(false);
          isAutoCollapsedRef.current = false;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeId, isAllExpanded, minCollapseThreshold, restoreRatio]);

  return {
    activeId,
    isAutoCollapsed,
    isCardOpen,
    toggleCard,
    expandAll,
    collapseAll
  };
}
