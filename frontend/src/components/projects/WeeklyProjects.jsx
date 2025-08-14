import React, { useRef, useState, useEffect } from "react";
import ProjectImage from "./ProjectImage";
import ProjectProgress from "./ProjectProgress";
import ProjectInfo from "./ProjectInfo";
import ProjectLocation from "./ProjectLocation";
import ProjectStats from "./ProjectStats";
import ProjectCTA from "./ProjectCTA";

const WeeklyProjects = ({ title = "This Week's Projects", projects = [] }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to selected card
  const scrollToIndex = (index) => {
    if (carouselRef.current && carouselRef.current.children[index]) {
      carouselRef.current.scrollTo({
        left:
          carouselRef.current.children[index].offsetLeft -
          carouselRef.current.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  // Detect active card on scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      const scrollPos = carousel.scrollLeft + carousel.offsetWidth / 2;
      for (let i = 0; i < carousel.children.length; i++) {
        const item = carousel.children[i];
        if (
          item.offsetLeft <= scrollPos &&
          item.offsetLeft + item.offsetWidth > scrollPos
        ) {
          setActiveIndex(i);
          break;
        }
      }
    };

    carousel.addEventListener("scroll", onScroll);
    return () => carousel.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="my-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-snap-x gap-4 pb-5 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="scroll-snap-start min-w-[280px] w-[280px] bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-transform hover:-translate-y-1"
            >
              {/* Reusing existing components */}
              <ProjectImage
                image={project.image}
                title={project.title}
                type={project.type}
              />
              <div className="p-4">
                <ProjectProgress
                  current={project.current}
                  goal={project.goal}
                />
                <ProjectInfo
                  title={project.title}
                  host={project.host}
                  description={project.description}
                />
                <ProjectLocation location={project.location} />
                <ProjectStats
                  supporters={project.supporters}
                  daysLeft={project.daysLeft}
                />
                <ProjectCTA />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-3">
          {projects.map((_, idx) => (
            <div
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                activeIndex === idx ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyProjects;
