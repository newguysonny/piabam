import { useState, useEffect, useRef } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import ReviewCard1 from './ReviewCard1';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard1 from './ReviewCard1';

const ReviewCarousel1 = ({ reviews = [] }) => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [cardsToShow, setCardsToShow] = useState(2);

  // Responsive setup
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(window.innerWidth < 768 ? 2 : 4);
      // Reset to first group on resize
      setCurrentIndex([0, 0]);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animated navigation
  const paginate = (newDirection) => {
    const newIndex = Math.max(
      0,
      Math.min(currentIndex + newDirection, reviews.length - cardsToShow)
    );
    setCurrentIndex([newIndex, newDirection]);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Restaurant Reviews</h2>
        <a href="/reviews" className="text-purple-600 hover:underline">more ></a>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden h-[400px]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {reviews
              .slice(currentIndex, currentIndex + cardsToShow)
              .map((review) => (
                <motion.div 
                  key={review.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring' }}
                >
                  <ReviewCard {...review} />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          disabled={currentIndex === 0}
        >
          &larr;
        </button>
        <button 
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          disabled={currentIndex >= reviews.length - cardsToShow}
        >
          &rarr;
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(reviews.length / cardsToShow) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex([i * cardsToShow, i > currentIndex ? 1 : -1])}
            className={`w-2 h-2 rounded-full ${
              i === Math.floor(currentIndex / cardsToShow) ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel1;
