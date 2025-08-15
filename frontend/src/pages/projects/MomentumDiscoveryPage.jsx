 
import { useState, useEffect } from 'react';
import { 
  FiSearch, FiUsers, FiClock, FiMusic, 
  FiCoffee, FiStar, FiMapPin, FiX, 
  FiFilter, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import ProjectCards from "../../components/projects/ProjectCards"; 

const MomentumDiscoveryPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('momentum');
  
  // Geolocation state
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Categories with icons
  const categories = [
    { value: 'all', label: 'All', icon: <FiStar /> },
    { value: 'lemcrew', label: 'Lem Crew', icon: <FiUsers /> },
    { value: 'food', label: 'Food', icon: <FiCoffee /> },
    { value: 'fanparty', label: 'Fan Party', icon: <FiMusic /> },
    { value: 'mealparty', label: 'Meal Party', icon: <FiCoffee /> },
    { value: 'music', label: 'Music', icon: <FiMusic /> }
  ];

  // Sort options
  const sortOptions = {
    active: [
      { value: 'momentum', label: 'Most Momentum', icon: <FiArrowUp /> },
      { value: 'newest', label: 'Newest', icon: <FiClock /> },
      { value: 'ending', label: 'Ending Soon', icon: <FiClock /> }
    ],
    upcoming: [
      { value: 'launching', label: 'Launching Soon', icon: <FiClock /> },
      { value: 'popular', label: 'Most Popular', icon: <FiUsers /> }
    ]
  };

  // Sample projects data with locations
  const projects = [
    {
      id: 1,
      type: 'fanparty',
      title: "Wizkid Album Listening Party",
      host: "Atin's Fan Club",
      description: "Exclusive virtual listening session for Wizkid's new album",
      image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
      location: "Lagos, Nigeria",
      coordinates: { lat: 6.5244, lng: 3.3792 },
      goal: 5000,
      current: 3614,
      daysLeft: 2,
      supporters: ["user1", "user2", "user3"],
      createdAt: "2023-10-15"
    },
    {
      id: 2,
      type: 'mealparty',
      title: "Nigerian Street Food Tour",
      host: "Lagos Foodies",
      description: "Monthly pop-up featuring the best street food vendors",
      image: "https://placehold.co/600x400/F97316/FFFFFF?text=Food+Tour",
      location: "Lagos, Nigeria",
      coordinates: { lat: 6.5244, lng: 3.3792 },
      goal: 2000,
      current: 1248,
      daysLeft: 7,
      supporters: ["user4", "user5"],
      createdAt: "2023-10-10"
    },
    {
      id: 3,
      type: 'lemcrew',
      title: "Afrobeat Dance Challenge",
      host: "Dance With Efe",
      description: "Learn the hottest Afrobeat moves in our virtual classes",
      image: "https://placehold.co/600x400/10B981/FFFFFF?text=Dance+Party",
      location: "Abuja, Nigeria",
      coordinates: { lat: 9.0579, lng: 7.4951 },
      goal: 3000,
      current: 2456,
      daysLeft: 14,
      supporters: ["user6", "user7", "user8"],
      createdAt: "2023-10-05"
    }
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocode to get location name
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            
            setLocationName(
              data.address.city || 
              data.address.town || 
              data.address.village ||
              'Your Location'
            );
          } catch (error) {
            setLocationError("Couldn't determine location name");
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLocationName('Nearby');
          }
          setIsLocating(false);
        },
        (error) => {
          setLocationError("Location access denied");
          setIsLocating(false);
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setIsLocating(false);
    }
  };

  // Clear location filter
  const clearLocation = () => {
    setUserLocation(null);
    setLocationName('');
    setLocationError(null);
  };

  // Calculate distance between coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = category === 'all' || project.type === category;
      
      // Location filter
      const matchesLocation = !userLocation || (
        project.coordinates && 
        calculateDistance(
          userLocation.lat,
          userLocation.lng,
          project.coordinates.lat,
          project.coordinates.lng
        ) <= 50 // Within 50km radius
      );
      
      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      // Sort by momentum (progress percentage)
      if (sortBy === 'momentum') {
        return (b.current/b.goal) - (a.current/a.goal);
      }
      // Sort by newest
      else if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // Sort by ending soon
      else if (sortBy === 'ending') {
        return a.daysLeft - b.daysLeft;
      }
      // Sort by launching soon (for upcoming)
      else if (sortBy === 'launching') {
        return a.daysLeft - b.daysLeft;
      }
      // Sort by popularity
      else if (sortBy === 'popular') {
        return b.supporters.length - a.supporters.length;
      }
      return 0;
    });

  
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Search and Location Bar */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b shadow-sm">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Main Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parties, crews, or hosts..."
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Location Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by location..."
                className="w-full bg-gray-100 rounded-full pl-10 pr-10 py-2 text-sm"
                value={locationName}
                readOnly
              />
              {userLocation && (
                <button 
                  onClick={clearLocation}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
            <button
              onClick={getCurrentLocation}
              disabled={isLocating}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full text-sm flex items-center gap-1 transition disabled:opacity-50"
            >
              {isLocating ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Locating...
                </>
              ) : (
                <>
                  <FiMapPin size={14} />
                  Use My Location
                </>
              )}
            </button>
          </div>
          {locationError && (
            <div className="text-red-500 text-xs pl-2">{locationError}</div>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b bg-white sticky top-32 z-10">
        <button
          className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'active' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('active');
            setSortBy('momentum');
          }}
        >
          <FiUsers size={16} />
          Active Campaigns
        </button>
        <button
          className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'upcoming' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => {
            setActiveTab('upcoming');
            setSortBy('launching');
          }}
        >
          <FiClock size={16} />
          Upcoming Projects
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 border-b sticky top-44 z-10">
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
          <div className="relative">
            <select
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm appearance-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions[activeTab].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {sortOptions[activeTab].find(o => o.value === sortBy)?.icon}
            </div>
          </div>

          {/* Filter Button */}
          <button className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-sm flex items-center gap-2 transition">
            <FiFilter size={14} />
            More Filters
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
  <ProjectCards
    key={project.id}
    project={project}
    isLaunch=true
  />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-400 mb-2">No projects found matching your criteria</div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategory('all');
                clearLocation();
              }}
              className="text-purple-600 hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MomentumDiscoveryPage;
