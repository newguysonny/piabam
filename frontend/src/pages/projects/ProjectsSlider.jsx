import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const ProjectsSlider = ({ projects }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Add empty "view more" slide
  const slides = [...projects, { id: 'view-more', isLastSlide: true }];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      {/* Slider */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="flex-shrink-0 w-full px-2">
              {slide.isLastSlide ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-bold mb-4">Explore All Community Projects</h3>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 transition">
                    View More Projects <FiArrowRight />
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
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        <FiChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Secondary CTA */}
      <div className="text-center mt-8">
        <a 
          href="/projects" 
          className="inline-block text-purple-600 hover:text-purple-800 font-medium hover:underline"
        >
          View All Current Projects <FiArrowRight className="inline ml-1" />
        </a>
      </div>
    </div>
  );
};

// Reuse your existing ProjectCard component
const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
    {/* ... your existing card implementation ... */}
  </div>
);
