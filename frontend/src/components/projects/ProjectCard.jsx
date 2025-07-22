import { FiUsers, FiClock, FiMapPin } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  const calculateProgress = (current, goal) => Math.min(100, (current / goal) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-video bg-gray-200">
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

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-purple-600">
              🚀 {calculateProgress(project.current, project.goal).toFixed(0)}% to goal
            </span>
            <span className="text-gray-500">
              {project.current.toLocaleString()}/{project.goal.toLocaleString()} members
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
              style={{ width: `${calculateProgress(project.current, project.goal)}%` }}
            />
          </div>
        </div>

        {/* Info */}
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-1">Hosted by {project.host}</p>
        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{project.description}</p>
        
        {/* Location */}
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <FiMapPin size={12} className="mr-1" />
          {project.location}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center text-gray-600">
            <FiUsers className="mr-1" size={12} />
            <span>{project.supporters?.length || 0} supporters</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiClock className="mr-1" size={12} />
            <span>
              {project.daysLeft === 0 ? 'Ending today' : 
               `${project.daysLeft} day${project.daysLeft !== 1 ? 's' : ''} left`}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition mt-auto">
          Pledge $1 • Join Movement
        </button>

        {/* Refund Note */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Fully refundable if goal isn't reached
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
