import { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import SearchBox from '../../components/restaurants/SearchBox';
import MainTabs from '../../components/restaurants/MainTabs';
import FilterBar from '../../components/restaurants/FilterBar';
import CategoryDropdown from '../../components/restaurants/CategoryDropdown';
import LocationInput from '../../components/restaurants/LocationInput';
import DistanceDropdown from '../../components/restaurants/DistanceDropdown';
import SortOptions from '../../components/restaurants/SortOptions';
import RestaurantCard from '../../components/restaurants/RestaurantCard';

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
    // ... (your sample data remains the same)
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
  const [filteredListings, setFilteredListings] = useState(allListings);
  useEffect(() => {
    // ... (your filtering logic remains exactly the same)
  }, [searchQuery, activeTab, allListings, category, distance, location, sortBy]);

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
