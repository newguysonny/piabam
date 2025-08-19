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
  // State management (removed activeTab)
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
      deliveryTime: "15 mins",
      location: "123 Main St, Cityville"
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
      deliveryTime: "20 mins",
      location: "456 Oak Ave, Townsville"
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
      deliveryTime: "30 mins",
      location: "789 Pine Rd, Villageton"
    }
  ]);

  // Configuration for dropdowns (removed tabOptions)
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

  // Filtered listings logic - SIMPLIFIED (removed tab filtering)
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
    
    // REMOVED: Tab filter section entirely
    
    // Apply category filter
    if (category) {
      results = results.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply distance filter
    if (distance) {
      const distanceValue = parseFloat(distance);
      results = results.filter(item => {
        const itemDistance = parseFloat(item.distance);
        return itemDistance <= distanceValue;
      });
    }
    
    // Apply location filter
    if (location) {
      results = results.filter(item => 
        item.location && item.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Apply sorting
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
            return a.priceRange.length - b.priceRange.length;
          default:
            return 0;
        }
      });
    }
    
    setFilteredListings(results);
  }, [searchQuery, allListings, category, distance, location, sortBy]); // Removed activeTab from dependencies

  // Handler for the "Use Current Location" button
  const handleUseCurrentLocation = () => {
    setLocation("Current Location");
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

      {/* REMOVED: MainTabs component */}

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
