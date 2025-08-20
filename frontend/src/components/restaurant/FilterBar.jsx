const FilterBar = ({ children }) => {
  return (
    <div className="p-4 bg-white sticky top-16 z-10 shadow-sm">
      {children}
    </div>
  );
};

export default FilterBar;
