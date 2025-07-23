import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSlider = ({ projects }) => {
  const [sliderConfig, setSliderConfig] = useState({
    cardWidth: 320, // Fixed card width
    gap: 16,        // Gap between cards
    peekWidth: 80   // Right peek amount
  });

  // Responsive config
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSliderConfig({
          cardWidth: window.innerWidth * 0.8, // 80% of screen width
          gap: 12,
          peekWidth: window.innerWidth * 0.2  // 20% peek
        });
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
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Mobile Peek Overlay */}
      <div className="md:hidden absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default ProjectsSlider;
