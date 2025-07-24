import { useState, useEffect, useRef } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import ReviewCard1 from './ReviewCard1';


const ReviewCarousel1 = ({ reviews }) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const x = useMotionValue(0);

  // Responsive setup
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configuration
  const CARD_WIDTH = 300;
  const CARD_GAP = 16;
  const cardsPerGroup = isMobile ? 2 : 4;
  const groupWidth = (CARD_WIDTH * cardsPerGroup) + (CARD_GAP * (cardsPerGroup - 1));
  const totalGroups = Math.ceil(reviews.length / cardsPerGroup);

  // Handle drag gestures
  const handleDragEnd = (_, info) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newGroup = Math.min(Math.max(currentGroup + direction, 0), totalGroups - 1);
      
      animate(x, -newGroup * groupWidth, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
      
      setCurrentGroup(newGroup);
    } else {
      animate(x, -currentGroup * groupWidth, { type: "spring" });
    }
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
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{
            left: -((totalGroups - 1) * groupWidth),
            right: 0,
          }}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
        >
          {Array.from({ length: totalGroups }).map((_, groupIndex) => (
            <div 
              key={`group-${groupIndex}`}
              className="flex gap-4"
              style={{ minWidth: groupWidth }}
            >
              {reviews
                .slice(groupIndex * cardsPerGroup, (groupIndex + 1) * cardsPerGroup)
                .map((review) => (
                  <ReviewCard1 key={review.id} {...review} />
                ))
              }
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalGroups }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentGroup(i);
              animate(x, -i * groupWidth, { type: "spring" });
            }}
            className={`w-2 h-2 rounded-full transition ${
              i === currentGroup ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel1;
