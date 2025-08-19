const DistanceDropdown = ({ value, onChange, options }) => {
  return (
    <select
      className="bg-gray-100 rounded-full px-4 py-2 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DistanceDropdown;
