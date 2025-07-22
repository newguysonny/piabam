import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import ProjectCard from './ProjectCard';

const ProjectsSlider = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
const [slidesToShow, setSlidesToShow] = useState(3);

   useEffect(() => {
  const handleResize = () => {
    setSlidesToShow(window.innerWidth < 768 ? 1 : 3);
  };
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Set initial value
  return () => window.removeEventListener('resize', handleResize);
}, []);
  
  // Add "View More" slide
  const slides = [...projects, { id: `view-more-${projects.length}`, isLastSlide: true }];

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= slides.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? slides.length - slidesToShow : prev - 1
    );
  };

  return (
    <div className="relative px-8">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 gap-4"
          style={{ 
            transform: `translateX(-${currentIndex * (100/slidesToShow)}%)`,
            width: `${(slides.length * 100)/slidesToShow}%`
          }}
        >
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className="flex-shrink-0"
              style={{ width: `${100/slidesToShow}%` }}
            >
              {slide.isLastSlide ? (
                <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-center">
                    Explore All Community Projects
                  </h3>
                  <button className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 transition">
                    View More <FiArrowRight />
                  </button>
                </div>
              ) : (
                <ProjectCard project={slide} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
      >
        <FiChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
      >
        <FiChevronRight size={24} />
      </button>

      {/* View All Link (Below Slider) */}
      <div className="text-center mt-8">
        <a 
          href="/discover" 
          className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium group"
        >
          View all current projects
          <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default ProjectsSlider;
