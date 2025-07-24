import { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';

const ReviewsCarousel = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth < 768 ? 2 : 4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      Math.min(prev + 1, reviews.length - slidesToShow)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Restaurant Reviews</h2>
        <a href="/reviews" className="text-purple-600 hover:underline">
          more >
        </a>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            width: `${(reviews.length * 100) / slidesToShow}%`
          }}
        >
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="flex-shrink-0 pr-4"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition disabled:opacity-50"
          aria-label="Previous reviews"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= reviews.length - slidesToShow}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition disabled:opacity-50"
          aria-label="Next reviews"
        >
          &rarr;
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(reviews.length / slidesToShow) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * slidesToShow)}
            className={`w-2 h-2 rounded-full transition ${
              i === Math.floor(currentIndex / slidesToShow) 
                ? 'bg-purple-600' 
                : 'bg-gray-300'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
