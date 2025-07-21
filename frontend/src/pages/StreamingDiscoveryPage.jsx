import { useState } from 'react';
import { FiSearch, FiUsers, FiX } from 'react-icons/fi';

const StreamingDiscoveryPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('fanParties');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample party data
  const parties = [
    {
      id: 1,
      type: 'fanParty',
      host: 'Atin',
      fanbase: 'Fans of Wizkid',
      totalMembers: '4.4k',
      onlineMembers: '5.09k'
    },
    {
      id: 2,
      type: 'fanParty',
      host: 'Temi',
      fanbase: 'Burna Boy Tribe',
      totalMembers: '3.2k',
      onlineMembers: '1.8k'
    },
    {
      id: 3,
      type: 'mealParty',
      host: 'Chef Tolu',
      fanbase: 'Food Lovers Club',
      totalMembers: '1.1k',
      onlineMembers: '450'
    },
    {
      id: 4,
      type: 'mealParty',
      host: 'Aunty B',
      fanbase: 'Home Cooks United',
      totalMembers: '2.7k',
      onlineMembers: '892'
    }
  ];

  // Filter parties based on search and active tab
  const filteredParties = parties.filter(party => {
    const matchesSearch = 
      party.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      party.fanbase.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      activeTab === 'fanParties' ? party.type === 'fanParty' : party.type === 'mealParty';
    
    return matchesSearch && matchesTab;
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Box */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search parties, hosts, or fanbases..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b sticky top-16 z-10 bg-white">
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'fanParties' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('fanParties')}
        >
          Fan Parties
        </button>
        <button
          className={`flex-1 py-4 font-medium ${activeTab === 'mealParties' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('mealParties')}
        >
          Meal Parties
        </button>
      </div>

      {/* Party Cards */}
      <div className="p-4 space-y-4">
        {filteredParties.length > 0 ? (
          filteredParties.map(party => (
            <div key={party.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{party.host}</h3>
                  <p className="text-gray-600 mt-1">{party.fanbase}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">
                    <FiUsers className="inline mr-1" />
                    {party.totalMembers} members
                  </span>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-600">{party.onlineMembers} online</span>
                </div>
                <button className="text-sm bg-purple-600 text-white px-4 py-1 rounded-full">
                  Join
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No parties found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamingDiscoveryPage;
