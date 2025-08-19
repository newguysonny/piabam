import { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import SearchBox from '../../components/restaurant/SearchBox';
import MainTabs from '../../components/restaurant/MainTabs';
import FilterBar from '../../components/restaurant/FilterBar';
import CategoryDropdown from '../../components/restaurant/CategoryDropdown';
import LocationInput from '../../components/restaurant/LocationInput';
import DistanceDropdown from '../../components/restaurant/DistanceDropdown';
import SortOptions from '../../components/restaurant/SortOptions';
import RestaurantCard from '../../components/restaurant/RestaurantCard';

const LemDiscoveryPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('restaurants');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('5 miles');
  const [sortBy, setSortBy] = useState('');

  // Sample data
  const [allListings] = useState([
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
  ]);
  
  // Configuration for dropdowns and tabs (avoids hardcoding in JSX)
  const tabOptions = [
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'crews', label: 'Crews' },
    { id: 'projects', label: 'Lem Projects' },
  ];

  const categoryOptions = [
    { value: 'weight loss', label: 'Weight Loss' },
    { value: 'weight gain', label: 'Weight Gain' },
    { value: 'keto', label: 'Keto' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'custom', label: 'Custom Plans' },
  ];

  const distanceOptions = [
    { value: '1 mile', label: '1 mile' },
    { value: '2 miles', label: '2 miles' },
    { value: '5 miles', label: '5 miles' },
    { value: '10 miles', label: '10 miles' },
    { value: '20 miles', label: '20 miles' },
  ];

  const sortOptions = [
    { value: 'Ratings', label: 'Ratings' },
    { value: 'Completed Orders', label: 'Completed Orders' },
    { value: 'Completion Rate', label: 'Completion Rate' },
    { value: 'Price (low to high)', label: 'Price (low to high)' },
  ];

  // Filtered listings logic (useEffect remains the same)
  // ... imports and state declarations remain the same ...

// Filtered listings logic - UPDATED AND FIXED
const [filteredListings, setFilteredListings] = useState(allListings);

useEffect(() => {
  let results = allListings;
  
  // Apply search filter
  if (searchQuery) {
    results = results.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Apply tab filter - FIXED: Check for both 'restaurants' and 'crews'
  if (activeTab === 'restaurants') {
    results = results.filter(item => item.type === 'restaurant');
  } else if (activeTab === 'crews') {
    results = results.filter(item => item.type === 'crew');
  }
  // If activeTab is 'projects', you might want to filter differently
  // For now, let's assume it shows all or something else
  
  // Apply category filter - FIXED: Only filter if category is not empty
  if (category) {
    results = results.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Apply distance filter - FIXED: Proper numeric comparison
  if (distance) {
    const distanceValue = parseFloat(distance); // Extracts the number from "5 miles"
    results = results.filter(item => {
      const itemDistance = parseFloat(item.distance); // Extracts number from "0.5 miles"
      return itemDistance <= distanceValue;
    });
  }
  
  // Apply location filter - FIXED: Handle cases where item might not have location
  if (location) {
    results = results.filter(item => 
      item.location && item.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  // Apply sorting - FIXED: Handle price range sorting better
  if (sortBy) {
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'Ratings':
          return b.rating - a.rating;
        case 'Completed Orders':
          return b.orders - a.orders;
        case 'Completion Rate':
          return b.completionRate - a.completionRate;
        case 'Price (low to high)':
          // Simple approach: compare length of priceRange string ($$$ > $$ > $)
          return a.priceRange.length - b.priceRange.length;
        default:
          return 0;
      }
    });
  }
  
  setFilteredListings(results);
}, [searchQuery, activeTab, allListings, category, distance, location, sortBy]);

  // Search input handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  // Handler for the "Use Current Location" button
  const handleUseCurrentLocation = () => {
    setLocation("Current Location");
    // You would integrate a real geolocation API here
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Box */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search restaurants, crews, or dishes..."
        />
      </div>

      {/* Main Tabs */}
      <MainTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabOptions}
      />

      {/* Filter Bar */}
      <FilterBar>
        <div className="flex flex-wrap gap-3 mb-3">
          {/* Category Dropdown */}
          <CategoryDropdown
            value={category}
            onChange={setCategory}
            options={categoryOptions}
          />

          {/* Location Input */}
          <LocationInput
            value={location}
            onChange={setLocation}
            onUseCurrentLocation={handleUseCurrentLocation}
          />

          {/* Distance Dropdown */}
          <DistanceDropdown
            value={distance}
            onChange={setDistance}
            options={distanceOptions}
          />

          {/* Filter Button */}
          <button className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2">
            <FiFilter />
            Filter
          </button>
        </div>

        {/* Sort Options */}
        <SortOptions
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </FilterBar>

      {/* Listings */}
      <div className="p-4 space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <RestaurantCard key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No listings found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default LemDiscoveryPage;
