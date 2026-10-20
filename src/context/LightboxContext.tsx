import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface LightboxItem {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

interface LightboxContextType {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  openLightbox: (
    input: LightboxItem[] | string,
    startIndex?: number,
    title?: string,
    caption?: string
  ) => void;
  closeLightbox: () => void;
  nextImage: () => void;
  prevImage: () => void;
  setIndex: (index: number) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback(
    (
      input: LightboxItem[] | string,
      startIndex = 0,
      title?: string,
      caption?: string
    ) => {
      let resolvedItems: LightboxItem[] = [];
      if (typeof input === 'string') {
        resolvedItems = [
          {
            src: input,
            alt: title || 'Full size view',
            title: title || '',
            caption: caption || '',
          },
        ];
      } else if (Array.isArray(input)) {
        resolvedItems = input;
      }

      setItems(resolvedItems);
      setCurrentIndex(Math.max(0, Math.min(startIndex, resolvedItems.length - 1)));
      setIsOpen(true);
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    if (items.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, [items.length]);

  const prevImage = useCallback(() => {
    if (items.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const setIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setCurrentIndex(index);
      }
    },
    [items.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        items,
        currentIndex,
        openLightbox,
        closeLightbox,
        nextImage,
        prevImage,
        setIndex,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export const useLightbox = (): LightboxContextType => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};
