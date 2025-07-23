

import { FiUsers, FiClock, FiMapPin } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  const progress = Math.min(100, (project.current / project.goal) * 100);
  const daysLeft = project.daysLeft > 0 ? `${project.daysLeft} days` : "Final day";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col h-full">
      {/* Image with category badge */}
      <div className="relative aspect-[3/2] bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title & Creator */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 leading-tight">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-3">by {project.creator}</p>
        
        {/* Progress bar */}
        <div className="mb-4">
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
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <FiUsers className="mr-1" size={14} />
            <span>{project.backers} backers</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1" size={14} />
            <span>{daysLeft}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-auto w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors duration-200">
          Back This Project
        </button>
      </div>
    </div>
  );
};
export default ProjectCard;
