import { useState } from 'react';
import { FiUsers, FiClock, FiMapPin } from 'react-icons/fi';


const ProjectCard = ({ project }) => {
  const calculateProgress = (current, goal) => Math.min(100, (current / goal) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full mx-1.5">
      {/* Image with fixed aspect ratio */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
          {project.type === 'food' ? '🍔' : '🎵'}
          <span className="ml-1">
            {project.type === 'food' ? 'Food' : 'Music'}
          </span>
        </div>
      </div>

      {/* Content - Fixed height */}
      <div className="p-4 flex flex-col" style={{ height: '180px' }}>
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-purple-600">
              🚀 {calculateProgress(project.current, project.goal)}%
            </span>
            <span className="text-gray-500">
              {project.current.toLocaleString()}/{project.goal.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
              style={{ width: `${calculateProgress(project.current, project.goal)}%` }}
            />
          </div>
        </div>

        {/* Text content */}
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-1 mb-2">Hosted by {project.host}</p>
        
        {/* Location */}
        <div className="flex items-center text-xs text-gray-500 mt-auto">
          <FiMapPin size={12} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{project.location}</span>
        </div>

        {/* CTA Button */}
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition mt-3">
          Join Movement
        </button>
      </div>
    </div>
  );
};

export default ProjectCard; 
