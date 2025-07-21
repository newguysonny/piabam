import { useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiRefreshCw } from 'react-icons/fi';

export default function LemDiscoveryPage() {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('5 miles');
  const [sortBy, setSortBy] = useState('');

  // Sample data
  const listings = [
    {
      id: 1,
      name: "Healthy Bites",
      type: "restaurant",
      category: "weight loss",
      rating: 4.8,
      orders: 1964,
      completionRate: 99,
      priceRange: "$$",
      distance: "0.5 miles",
      deliveryTime: "15 mins"
    },
    {
      id: 2,
      name: "Muscle Fuel Kitchen",
      type: "restaurant", 
      category: "weight gain",
      rating: 4.5,
      orders: 2616,
      completionRate: 95,
      priceRange: "$$$",
      distance: "1.2 miles",
      deliveryTime: "20 mins"
    },
    {
      id: 3,
      name: "Chef Ade's Meal Prep",
      type: "crew",
      category: "custom",
      rating: 4.2,
      orders: 1355,
      completionRate: 88,
      priceRange: "$$",
      distance: "2.5 miles",
      deliveryTime: "30 mins"
    }
  ];

        // Filter listings based on search and other filters
  const filteredListings = listings
    .filter(item => activeTab === 'restaurants' ? item.type === 'restaurant' : item.type === 'crew')
    .filter(item => 
      searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    
    <div className="bg-gray-50 min-h-screen">
      {/* Search Box */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants, crews, or dishes..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs - now positioned below search */}
      <div className="flex border-b sticky top-16 z-10 bg-white">
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'restaurants' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants
        </button>
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'crews' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('crews')}
        >
          Crews
        </button>
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'projects' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('projects')}
        >
          Lem Projects
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white sticky top-14 z-10 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-3">
          {/* Category Dropdown */}
          <select 
            className="bg-gray-100 rounded-full px-4 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="weight loss">Weight Loss</option>
            <option value="weight gain">Weight Gain</option>
            <option value="keto">Keto</option>
            <option value="vegan">Vegan</option>
            <option value="custom">Custom Plans</option>
          </select>

          {/* Location Input */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Enter location"
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-full text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <FiMapPin className="absolute left-3 top-2.5 text-gray-400" />
            <button 
              className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600"
              onClick={() => setLocation("Current Location")}
            >
              <FiRefreshCw size={16} />
            </button>
          </div>

          {/* Distance Dropdown */}
          <select
            className="bg-gray-100 rounded-full px-4 py-2 text-sm"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value="1 mile">1 mile</option>
            <option value="2 miles">2 miles</option>
            <option value="5 miles">5 miles</option>
            <option value="10 miles">10 miles</option>
            <option value="20 miles">20 miles</option>
          </select>

          {/* Filter Button */}
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2">
            <FiFilter />
            Filter
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">Sort By:</span>
          {['Ratings', 'Completed Orders', 'Completion Rate', 'Price (low to high)'].map((option) => (
            <button
              key={option}
              className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${sortBy === option ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
              onClick={() => setSortBy(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="p-4 space-y-4">
        {listings
          .filter(item => activeTab === 'restaurants' ? item.type === 'restaurant' : item.type === 'crew')
          .map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500">★ {item.rating}</span>
                    <span className="text-gray-500 text-sm">• {item.orders} orders • {item.completionRate}%</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{item.category}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{item.distance}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-sm">{item.deliveryTime}</span>
                  <div className="mt-1">{item.priceRange}</div>
                </div>
              </div>
              <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-medium">
                View Menu
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
