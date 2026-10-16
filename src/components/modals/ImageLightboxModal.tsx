import React, { useState, useEffect } from 'react';
import { useLightbox } from '../../context/LightboxContext';

export const ImageLightboxModal: React.FC = () => {
  const { isOpen, items, currentIndex, closeLightbox, nextImage, prevImage, setIndex } = useLightbox();
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom whenever image changes or modal closes
  useEffect(() => {
    setIsZoomed(false);
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
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-black/60 border-b border-white/10 backdrop-blur-md gap-4">
        {/* Title & Metadata */}
        <div className="flex items-center gap-3 min-w-0">
          {items.length > 1 && (
            <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 bg-white/10 rounded-xs border border-white/20 text-emerald-400 shrink-0">
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
            className="px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider font-mono border border-white/20 bg-white/5 hover:bg-white/15 text-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
            title={isZoomed ? 'Fit to screen' : 'Zoom in 1.6x'}
          >
            {isZoomed ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            )}
            <span>{isZoomed ? 'Fit Screen' : 'Zoom 1.6x'}</span>
          </button>

          {/* Open Original in New Tab */}
          <a
            href={currentItem.src}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider font-mono border border-white/20 bg-white/5 hover:bg-white/15 text-gray-200 transition-colors cursor-pointer"
            title="Open original image file in new tab"
          >
            <span>Original</span>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="w-8 h-8 sm:w-9 sm:h-9 border border-white/30 bg-white/10 hover:bg-red-600 hover:border-red-600 text-white flex items-center justify-center transition-colors text-sm sm:text-base font-bold cursor-pointer"
            aria-label="Close image viewer"
            title="Close viewer (ESC)"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
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
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/30 hover:border-white text-white flex items-center justify-center text-xl sm:text-2xl transition-all shadow-xl cursor-pointer"
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
            className="max-h-[76vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[86vw] object-contain shadow-2xl transition-all select-none border border-white/10"
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
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/30 hover:border-white text-white flex items-center justify-center text-xl sm:text-2xl transition-all shadow-xl cursor-pointer"
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
            <span className="text-gray-500 font-mono text-[10px]">
              GROUP 1 - BATCH 2023-2027 · CENTRALIZED AIR DISTRIBUTION SYSTEM
            </span>
          )}
        </div>

        {/* Gallery Thumbnails (if multiple images) */}
        {items.length > 1 ? (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setIndex(idx)}
                className={`w-10 h-8 sm:w-12 sm:h-9 overflow-hidden border transition-all cursor-pointer shrink-0 ${
                  idx === currentIndex
                    ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
                title={`Jump to image ${idx + 1}`}
              >
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-mono hidden sm:block">
            Click image to zoom · ESC to close
          </div>
        )}
      </div>
    </div>
  );
};
