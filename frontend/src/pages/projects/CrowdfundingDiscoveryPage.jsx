import { useState } from 'react';
import { FiSearch, FiFilter, FiStar, FiUsers, FiClock, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const CrowdfundingDiscoveryPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState(activeTab === 'active' ? 'trending' : 'launchingSoon');

  // Sample data - active projects
  const activeProjects = [
    {
      id: 1,
      title: "Smart Widget Pro",
      creator: "Tech Innovations Inc",
      category: "technology",
      image: "https://placehold.co/400x225/EEE/31343C?text=Smart+Widget",
      pledged: 50000,
      goal: 25000,
      backers: 1240,
      rating: 4.8,
      reviews: 380,
      daysLeft: 3,
      trendingScore: 95
    },
    // More active projects...
  ];

  // Sample data - pre-launch projects
  const prelaunchProjects = [
    {
      id: 101,
      title: "Eco-Friendly Travel Gear",
      creator: "Green Adventures Co",
      category: "fashion",
      image: "https://placehold.co/400x225/EEE/31343C?text=Eco+Gear",
      followers: 1240,
      launchDate: "2023-12-15",
      notifyCount: 856
    },
    // More pre-launch projects...
  ];

  // Available categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'games', label: 'Games' },
    { value: 'food', label: 'Food' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'art', label: 'Art' },
    { value: 'publishing', label: 'Publishing' }
  ];

  // Sort options by tab
  const sortOptions = {
    active: [
      { value: 'trending', label: 'Trending', icon: <FiStar /> },
      { value: 'mostBackers', label: 'Most Backers', icon: <FiUsers /> },
      { value: 'mostFunded', label: 'Most Funded', icon: <FiArrowUp /> },
      { value: 'priceLow', label: 'Price: Lowest', icon: <FiArrowDown /> },
      { value: 'priceHigh', label: 'Price: Highest', icon: <FiArrowUp /> },
      { value: 'recent', label: 'Recently Launched', icon: <FiClock /> },
      { value: 'ending', label: 'Ending Soon', icon: <FiClock /> }
    ],
    prelaunch: [
      { value: 'launchingSoon', label: 'Launching Soon', icon: <FiClock /> },
      { value: 'mostFollowers', label: 'Most Followers', icon: <FiUsers /> }
    ]
  };

  // Filter and sort projects
  const getFilteredProjects = () => {
    const projects = activeTab === 'active' ? activeProjects : prelaunchProjects;
    
    return projects
      .filter(project => {
        const matchesSearch = searchQuery === '' || 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          project.creator.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = category === 'all' || project.category === category;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'trending': return b.trendingScore - a.trendingScore;
          case 'mostBackers': return b.backers - a.backers;
          case 'mostFunded': return (b.pledged/b.goal) - (a.pledged/a.goal);
          case 'priceLow': return a.priceTier - b.priceTier;
          case 'priceHigh': return b.priceTier - a.priceTier;
          case 'recent': return new Date(b.launchDate) - new Date(a.launchDate);
          case 'ending': return new Date(a.endDate) - new Date(b.endDate);
          case 'mostFollowers': return b.followers - a.followers;
          case 'launchingSoon': return new Date(a.launchDate) - new Date(b.launchDate);
          default: return 0;
        }
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b shadow-sm">
        <div className="relative max-w-4xl mx-auto">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, creators, or categories..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b bg-white sticky top-16 z-10">
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'active' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('active');
            setSortBy('trending');
          }}
        >
          Active Projects
        </button>
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'prelaunch' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('prelaunch');
            setSortBy('launchingSoon');
          }}
        >
          Pre-Launch Projects
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 border-b sticky top-28 z-10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3">
          {/* Category Dropdown */}
          <select
            className="bg-gray-100 rounded-full px-4 py-2 text-sm cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            className="bg-gray-100 rounded-full px-4 py-2 text-sm cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions[activeTab].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter Button */}
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2">
            <FiFilter size={14} />
            More Filters
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredProjects().length > 0 ? (
          getFilteredProjects().map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              type={activeTab} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-400 mb-2">No projects found</div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategory('all');
                setSortBy(activeTab === 'active' ? 'trending' : 'launchingSoon');
              }}
              className="text-purple-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, type }) => {
  const isActive = type === 'active';
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Project Image */}
      <div className="relative aspect-video bg-gray-200">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {!isActive && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Project Status */}
        {isActive ? (
          <div className="mb-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div 
                className="h-full bg-purple-600" 
                style={{ width: `${Math.min(100, (project.pledged / project.goal) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>${project.pledged.toLocaleString()} raised</span>
              <span>{Math.round((project.pledged / project.goal) * 100)}% of goal</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-3 text-sm">
            <div className="flex items-center text-gray-600">
              <FiClock className="mr-1" />
              <span>Launching in {project.daysUntilLaunch}d</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiUsers className="mr-1" />
              <span>{project.followers.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Project Info */}
        <div className="mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{project.title}</h3>
          <p className="text-gray-600 text-sm">by {project.creator}</p>
        </div>

        {/* Rating/Category */}
        <div className="flex justify-between items-center mb-4">
          {isActive ? (
            <div className="flex items-center text-sm">
              <FiStar className="text-yellow-400 mr-1" />
              <span className="font-medium">{project.rating}</span>
              <span className="text-gray-500 ml-1">({project.reviews})</span>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              {project.notifyCount.toLocaleString()} notified
            </div>
          )}
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>

        {/* CTA Button */}
        <button className={`w-full py-2 rounded-lg font-medium ${isActive ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-purple-600 hover:bg-gray-200'}`}>
          {isActive ? 'Back This Project' : 'Notify Me'}
        </button>
      </div>
    </div>
  );
};

export default CrowdfundingDiscoveryPage;
