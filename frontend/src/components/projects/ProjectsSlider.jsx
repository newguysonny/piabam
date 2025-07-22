import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProjectCard from './ProjectCard';

const ProjectsSlider = ({ projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3.2); // Shows 3 full + 20% peek
  const [showArrows, setShowArrows] = useState(false);

  // Responsive settings
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

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, projects.length - Math.floor(slidesToShow)));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Slider Container */}
      <div className="overflow-hidden">
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
        <div className="absolute top-0 right-0 flex gap-2 z-10 -translate-y-full">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
          >
            <FiChevronLeft className="text-purple-600" size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= projects.length - slidesToShow}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
          >
            <FiChevronRight className="text-purple-600" size={20} />
          </button>
        </div>
      )}

      {/* Mobile Indicators */}
      <div className="md:hidden flex justify-center gap-1 mt-4">
        {projects.map((_, index) => (
          <div 
            key={index}
            className={`h-1 rounded-full ${index === currentIndex ? 'bg-purple-600 w-4' : 'bg-gray-300 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSlider;
