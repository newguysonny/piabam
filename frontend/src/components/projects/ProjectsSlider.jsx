import { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSlider = ({ projects }) => {
  const [visibleSlides, setVisibleSlides] = useState(3.3);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Responsive slide count
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(window.innerWidth < 768 ? 1.2 : window.innerWidth < 1024 ? 2.2 : 3.3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch scroll handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative group">
      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        onMouseDown={handleMouseDown}
        onMouseLeave={() => setIsDragging(false)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
      >
        <div 
          className="flex gap-4 w-max"
          style={{ paddingLeft: 'calc((100% - (100%/var(--slides))) / 2)' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="flex-shrink-0 snap-start"
              style={{ 
                width: `calc(100% / ${visibleSlides} - 1rem)`,
                '--slides': visibleSlides
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Hint (mobile) */}
      <div className="md:hidden text-center mt-4 text-xs text-gray-500 animate-pulse">
        ← Scroll horizontally →
      </div>
    </div>
  );
};
