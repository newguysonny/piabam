const SortOptions = ({ value, onChange, options }) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <span className="text-sm text-gray-500 whitespace-nowrap">Sort By:</span>
      {options.map((option) => (
        <button
          key={option.value}
          className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
            value === option.value ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;
