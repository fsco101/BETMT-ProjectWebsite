import React, { useState, useEffect } from 'react';
import { useLightbox } from '../../context/LightboxContext';

export const ImageLightboxModal: React.FC = () => {
  const { isOpen, items, currentIndex, closeLightbox, nextImage, prevImage, setIndex } = useLightbox();
  const [isZoomed, setIsZoomed] = useState(false);

  // Lock body scroll when modal is open and reset zoom
  useEffect(() => {
    setIsZoomed(false);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, isOpen]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md text-white select-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Image Fullscreen Viewer"
    >
      {/* Top Header Controls Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-black/70 border-b border-white/10 backdrop-blur-md gap-4">
        {/* Title & Metadata */}
        <div className="flex items-center gap-3 min-w-0">
          {items.length > 1 && (
            <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 bg-white/10 rounded-md border border-white/20 text-emerald-400 font-bold shrink-0">
              {currentIndex + 1} / {items.length}
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-sans font-bold text-sm sm:text-base text-white truncate tracking-tight uppercase">
              {currentItem.title || currentItem.alt || 'Pneumatic System Photograph'}
            </h3>
            {currentItem.caption && (
              <p className="text-[11px] text-gray-400 truncate max-w-xl font-light hidden sm:block">
                {currentItem.caption}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Zoom Toggle Button */}
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="px-3 py-1.5 rounded-lg text-[10px] sm:text-xs uppercase tracking-wider font-mono border border-white/20 bg-white/5 hover:bg-white/15 text-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
            title={isZoomed ? 'Fit to screen' : 'Zoom in 1.6x'}
          >
            <span className="material-symbols-outlined text-sm">
              {isZoomed ? 'zoom_out' : 'zoom_in'}
            </span>
            <span>{isZoomed ? 'Fit Screen' : 'Zoom 1.6x'}</span>
          </button>

          {/* Open Original in New Tab */}
          <a
            href={currentItem.src}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs uppercase tracking-wider font-mono border border-white/20 bg-white/5 hover:bg-white/15 text-gray-200 transition-colors cursor-pointer"
            title="Open original image file in new tab"
          >
            <span>Original</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="w-8 h-8 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close image viewer"
            title="Close viewer (ESC)"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden cursor-pointer"
        onClick={(e) => {
          // If clicked directly on the stage background (not on the image), close modal
          if (e.target === e.currentTarget) {
            closeLightbox();
          }
        }}
      >
        {/* Navigation Previous Button */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/30 hover:border-white text-white flex items-center justify-center text-xl sm:text-2xl transition-all shadow-xl cursor-pointer"
            aria-label="Previous image"
            title="Previous image (Left Arrow)"
          >
            ‹
          </button>
        )}

        {/* Displayed Image */}
        <div className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ${
          isZoomed ? 'scale-150 cursor-zoom-out overflow-auto' : 'cursor-zoom-in'
        }`}>
          <img
            key={currentItem.src}
            src={currentItem.src}
            alt={currentItem.alt || currentItem.title || 'Full size view'}
            onClick={() => setIsZoomed(!isZoomed)}
            className="max-h-[76vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[86vw] object-contain shadow-2xl transition-all select-none rounded-lg border border-white/15"
          />
        </div>

        {/* Navigation Next Button */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/30 hover:border-white text-white flex items-center justify-center text-xl sm:text-2xl transition-all shadow-xl cursor-pointer"
            aria-label="Next image"
            title="Next image (Right Arrow)"
          >
            ›
          </button>
        )}
      </div>

      {/* Bottom Caption & Thumbnail Strip Bar */}
      <div className="relative z-20 px-4 sm:px-8 py-3 bg-black/70 border-t border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Caption */}
        <div className="text-gray-300 text-[11px] sm:text-xs text-center sm:text-left leading-relaxed max-w-3xl">
          {currentItem.caption ? (
            <span>{currentItem.caption}</span>
          ) : (
            <span className="text-gray-400 font-mono text-[10px]">
              GROUP 1 · BATCH 2023 · CENTRALIZED AIR DISTRIBUTION SYSTEM
            </span>
          )}
        </div>

        {/* Gallery Thumbnails (if multiple images) */}
        {items.length > 1 ? (
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setIndex(idx)}
                className={`w-11 h-8 sm:w-12 sm:h-9 rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                  idx === currentIndex
                    ? 'border-sky-400 ring-2 ring-sky-400/50 scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
                title={`Jump to image ${idx + 1}`}
              >
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono hidden sm:block">
            Click image to zoom · ESC to close
          </div>
        )}
      </div>
    </div>
  );
};

