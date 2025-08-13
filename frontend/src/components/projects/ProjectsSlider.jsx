import { useState, useEffect } from 'react';
import ProjectCards from './ProjectCards';

const ProjectsSlider = ({ projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Added missing state
  const [sliderConfig, setSliderConfig] = useState({
    cardWidth: 320,
    gap: 16,
    peekWidth: 80
  });

  // Responsive config
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSliderConfig({
          cardWidth: window.innerWidth * 0.8,
          gap: 12,
          peekWidth: window.innerWidth * 0.2
        });
        setCurrentIndex(0); // Reset position on mobile
      } else {
        setSliderConfig({
          cardWidth: 320,
          gap: 16,
          peekWidth: 80
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, projects.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slider Track */}
      <div 
        className="flex transition-transform duration-300"
        style={{
          gap: `${sliderConfig.gap}px`,
          transform: `translateX(calc(-${currentIndex * (sliderConfig.cardWidth + sliderConfig.gap)}px))`
        }}
      >
        {projects.map((project) => (
          <div 
            key={project.id}
            style={{
              width: `${sliderConfig.cardWidth}px`,
              flexShrink: 0
            }}
          >
            <ProjectCards project={project} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition"
        disabled={currentIndex === 0}
      >
        &larr;
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition"
        disabled={currentIndex >= projects.length - 1}
      >
        &rarr;
      </button>

      {/* Mobile Peek Overlay */}
      <div className="md:hidden absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default ProjectsSlider;
