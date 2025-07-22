import { useState } from 'react';
import { FiSearch, FiUsers, FiClock, FiMusic, FiCoffee, FiStar } from 'react-icons/fi';

const MomentumDiscoveryPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('momentum');

  // Categories with icons
  const categories = [
    { value: 'all', label: 'All', icon: <FiStar /> },
    { value: 'lemcrew', label: 'Lem Crew', icon: <FiUsers /> },
    { value: 'food', label: 'Food', icon: <FiCoffee /> },
    { value: 'fanparty', label: 'Fan Party', icon: <FiMusic /> },
    { value: 'mealparty', label: 'Meal Party', icon: <FiCoffee /> },
    { value: 'music', label: 'Music', icon: <FiMusic /> }
  ];

  // Sample projects data
  const projects = [
    {
      id: 1,
      type: 'fanparty',
      title: "Wizkid Album Listening Party",
      host: "Atin's Fan Club",
      image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
      goal: 5000,
      current: 3614,
      daysLeft: 2,
      supporters: ["user1", "user2", "user3"]
    },
    {
      id: 2,
      type: 'mealparty',
      title: "Nigerian Street Food Tour",
      host: "Lagos Foodies",
      image: "https://placehold.co/600x400/F97316/FFFFFF?text=Food+Tour",
      goal: 2000,
      current: 1248,
      daysLeft: 7,
      supporters: ["user4", "user5"]
    },
    // Add more sample projects...
  ];

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.host.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = category === 'all' || project.type === category;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by momentum (progress percentage)
      if (sortBy === 'momentum') {
        return (b.current/b.goal) - (a.current/a.goal);
      }
      // Sort by newest (placeholder)
      else if (sortBy === 'newest') {
        return b.id - a.id;
      }
      // Sort by ending soon
      else if (sortBy === 'ending') {
        return a.daysLeft - b.daysLeft;
      }
      return 0;
    });

  // Calculate progress percentage
  const calculateProgress = (current, goal) => {
    return Math.min(100, (current / goal) * 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b shadow-sm">
        <div className="relative max-w-4xl mx-auto">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search parties, crews, or hosts..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b bg-white sticky top-16 z-10">
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'active' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('active')}
        >
          Active Campaigns
        </button>
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'upcoming' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Projects
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 border-b sticky top-28 z-10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {categories.find(c => c.value === category)?.icon}
            </div>
          </div>

          {/* Sort Dropdown */}
          <select
            className="bg-gray-100 rounded-full px-4 py-2 text-sm cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="momentum">Most Momentum</option>
            <option value="newest">Newest</option>
            <option value="ending">Ending Soon</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {/* Project Image */}
              <div className="relative aspect-video bg-gray-200">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                  {categories.find(c => c.value === project.type)?.icon}
                  <span className="ml-1">
                    {categories.find(c => c.value === project.type)?.label}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-purple-600">
                      🚀 {calculateProgress(project.current, project.goal).toFixed(0)}% to {project.goal.toLocaleString()} goal
                    </span>
                    <span className="text-gray-500">{project.current.toLocaleString()}/{project.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                      style={{ width: `${calculateProgress(project.current, project.goal)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3">Hosted by {project.host}</p>

                {/* Stats */}
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiUsers className="mr-1" />
                    <span>{project.current.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-1" />
                    <span>{project.daysLeft} day{project.daysLeft !== 1 ? 's' : ''} left</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
                  Pledge $1 • Join Movement
                </button>

                {/* Refund Note */}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Fully refundable if goal isn't reached
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-400 mb-2">No projects found matching your criteria</div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategory('all');
              }}
              className="text-purple-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MomentumDiscoveryPage;
