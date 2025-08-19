import { FiMapPin, FiRefreshCw } from 'react-icons/fi';

const LocationInput = ({ value, onChange, onUseCurrentLocation }) => {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <input
        type="text"
        placeholder="Enter location"
        className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-full text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FiMapPin className="absolute left-3 top-2.5 text-gray-400" />
      <button
        type="button"
        className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-600"
        onClick={onUseCurrentLocation}
      >
        <FiRefreshCw size={16} />
      </button>
    </div>
  );
};

export default LocationInput;
