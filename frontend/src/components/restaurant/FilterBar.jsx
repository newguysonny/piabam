const FilterBar = ({ children }) => {
  return (
    <div className="p-4 bg-white sticky top-28 z-10 shadow-sm">
      {children}
    </div>
  );
};

export default FilterBar;
