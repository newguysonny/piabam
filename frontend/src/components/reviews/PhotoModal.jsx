// components/PhotoModal.jsx
import { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function PhotoModal({ photos, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Handle browser back button
‎  useEffect(() => {
‎    const handlePopState = () => {
‎      onClose(); // Close modal when back button is pressed
‎    };
‎
‎    // Push a new state to prevent immediately going back in history
‎    window.history.pushState({ isModalOpen: true }, '');
‎
‎    window.addEventListener('popstate', handlePopState);
‎
‎    return () => {
‎      window.removeEventListener('popstate', handlePopState);
‎      // Clean up the state we added if modal closes normally
‎      if (window.history.state?.isModalOpen) {
‎        window.history.back();
‎      }
‎    };
‎  }, [onClose]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goNext, goPrev]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl z-10"
      >
        <FiX size={28} />
      </button>

      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 text-white text-2xl z-10 p-2 bg-black/50 rounded-full"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 text-white text-2xl z-10 p-2 bg-black/50 rounded-full"
          >
            <FiChevronRight size={28} />
          </button>
        </>
      )}

      {/* Photo display */}
      <div className="relative max-w-4xl max-h-full">
        <img
          src={photos[currentIndex]}
          alt={`Review photo ${currentIndex + 1}`}
          className="max-w-full max-h-screen object-contain"
        />
        
        {/* Photo counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>
    </div>
  );
}
