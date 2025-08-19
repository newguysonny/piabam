const CategoryDropdown = ({ value, onChange, options }) => {
  return (
    <select
      className="bg-gray-100 rounded-full px-4 py-2 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
