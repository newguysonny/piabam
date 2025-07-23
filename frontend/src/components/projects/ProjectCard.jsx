

import { FiUsers, FiClock, FiHeart } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  const progress = Math.min(100, (project.current / project.goal) * 100);
  const daysLeft = project.daysLeft > 0 ? `${project.daysLeft} days left` : "Final hours";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 flex flex-col h-full mx-auto" style={{ width: '100%', maxWidth: '320px' }}>
      {/* Image with category badge */}
      <div className="relative aspect-[3/2] bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-gray-100 transition">
            <FiHeart className="text-gray-700" size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title & Creator */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mt-1">by {project.creator}</p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-purple-600">{progress.toFixed(0)}% funded</span>
            <span className="text-gray-500">${project.current.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-600 mb-4 mt-auto">
          <div className="flex items-center">
            <FiUsers className="mr-1.5" size={14} />
            <span>{project.backers.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1.5" size={14} />
            <span>{daysLeft}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors duration-200 text-sm">
          Back This Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
