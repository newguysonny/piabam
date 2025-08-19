const MainTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex border-b sticky top-16 z-10 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 py-4 font-medium ${
            activeTab === tab.id
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MainTabs;
