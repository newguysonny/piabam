import { useState, useEffect, useRef } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import ReviewCard1 from './ReviewCard1';

const ReviewCarousel1 = ({ reviews }) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const x = useMotionValue(0);
  const desktopCardsToShow = 4;
  const mobileCardsToShow = 2;

  // Calculate groups
  const calculateGroups = () => {
    const isMobile = window.innerWidth < 768;
    const cardsPerGroup = isMobile ? mobileCardsToShow : desktopCardsToShow;
    return Math.ceil(reviews.length / cardsPerGroup);
  };

  const [totalGroups, setTotalGroups] = useState(calculateGroups());

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setTotalGroups(calculateGroups());
      // Reset to first group on mobile/desktop switch
      setCurrentGroup(0);
      x.set(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle drag gestures
  const handleDragEnd = (_, info) => {
    const threshold = info.offset.x < 0 ? -100 : 100;
    if (Math.abs(info.offset.x) > Math.abs(threshold)) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newGroup = Math.min(Math.max(currentGroup + direction, 0), totalGroups - 1);
      
      animate(x, -newGroup * 100, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
      
      setCurrentGroup(newGroup);
    } else {
      // Return to current position
      animate(x, -currentGroup * 100, {
        type: "spring",
        stiffness: 400,
      });
    }
    setIsDragging(false);
  };

  // Render card groups
  const renderCardGroups = () => {
    const isMobile = window.innerWidth < 768;
    const cardsPerGroup = isMobile ? mobileCardsToShow : desktopCardsToShow;
    
    return Array.from({ length: totalGroups }).map((_, groupIndex) => {
      const startIdx = groupIndex * cardsPerGroup;
      const endIdx = startIdx + cardsPerGroup;
      const groupReviews = reviews.slice(startIdx, endIdx);

      return (
        <motion.div 
          key={`group-${groupIndex}`}
          className={`flex ${isMobile ? 'gap-4' : 'gap-6'}`}
          style={{
            minWidth: `${100 / (isMobile ? 2 : 3.2)}%`,
            width: `${100 / (isMobile ? 2 : 3.2)}%`,
          }}
        >
          {groupReviews.map((review) => (
            <ReviewCard1 key={review.id} {...review} />
          ))}
          
          {/* Empty state placeholders */}
          {groupReviews.length < cardsPerGroup && 
            Array.from({ length: cardsPerGroup - groupReviews.length }).map((_, i) => (
              <div key={`empty-${i}`} className="flex-shrink-0" style={{ 
                width: `${100 / cardsPerGroup}%` 
              }} />
            ))
          }
        </motion.div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Restaurant Reviews</h2>
        <a href="/reviews" className="text-purple-600 hover:underline">more ></a>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        {/* Edge gradient hint */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex cursor-grab active:cursor-grabbing"
        >
          {renderCardGroups()}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalGroups }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentGroup(i);
              animate(x, -i * 100, {
                type: "spring",
                stiffness: 300,
                damping: 30,
              });
            }}
            className={`w-2 h-2 rounded-full transition ${
              i === currentGroup ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to group ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default ReviewCarousel1;
