import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProjectCard from './ProjectCard';

const ProjectsSlider = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  // Responsive slides calculation
  useEffect(() => {
    const updateSlides = () => {
      const isMobile = window.innerWidth < 768;
      setSlidesToShow(isMobile ? 1.2 : 3.2);
      setShowArrows(!isMobile);
    };

    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  // Touch scroll handling
  useEffect(() => {
    const slider = sliderRef.current;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;

    const handleTouchStart = (e) => {
      isDragging = true;
      startPos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      currentTranslate = currentPosition - startPos;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      if (currentTranslate < -50) nextSlide();
      if (currentTranslate > 50) prevSlide();
    };

    slider.addEventListener('mousedown', handleTouchStart);
    slider.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mousemove', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleTouchEnd);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('mousedown', handleTouchStart);
      slider.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleTouchEnd);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, projects.length - 1));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="overflow-hidden select-none"
      >
        <div 
          className="flex transition-transform duration-300 ease-out gap-4"
          style={{ 
            transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}%))`,
            width: `${(projects.length * 100) / slidesToShow}%`
          }}
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="flex-shrink-0"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Arrows */}
      {showArrows && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white bg-opacity-80 shadow-md hover:bg-opacity-100 transition-all"
            disabled={currentIndex === 0}
          >
            <FiChevronLeft className="text-purple-600" size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white bg-opacity-80 shadow-md hover:bg-opacity-100 transition-all"
            disabled={currentIndex >= projects.length - slidesToShow}
          >
            <FiChevronRight className="text-purple-600" size={20} />
          </button>
        </div>
      )}

      {/* Scroll Indicator (Mobile) */}
      <div className="md:hidden mt-4 flex justify-center">
        <div className="flex gap-1">
          {projects.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full ${i === currentIndex ? 'bg-purple-600 w-4' : 'bg-gray-300 w-2'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSlider;
