import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiChevronDown, FiFilter, FiSearch } from 'react-icons/fi';
import EscrowCard from '../../components/escrow/EscrowCard';
import Navbar from "../../components/navigation/Navbar";
import { useNavigate } from 'react-router-dom';

const EscrowDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState('Active'); // not 'activeTab'
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSubstatus, setSelectedSubstatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSubstatusDropdown, setShowSubstatusDropdown] = useState(false);
  const navigate = useNavigate();

  // Sample transaction data
  const [activeTransactions] = useState([
    {
      id: 1,
      host: 'Anna456',
      title: 'Friday BBQ Crew',
      type: 'Lem',
      date: 'Jul 25, 2023',
      description: 'Group meal at Main Restaurant',
      status: 'Active',
      substatus: 'MEAL_PREPARING'
    },
    {
      id: 2,
      host: 'MusicLover',
      title: 'DJ Night + Dinner',
      type: 'Faajee',
      date: 'Jul 26, 2023',
      description: 'Music event with catering',
      status: 'Active',
      substatus: 'PAYMENT_RECEIVED'
    }
  ]);

  const [pastTransactions] = useState([
    {
      id: 3,
      host: 'ChefJohn',
      title: 'Brunch Club',
      type: 'Lem',
      date: 'Jul 20, 2023',
      description: 'Sunday brunch gathering',
      status: 'Completed',
      substatus: 'COMPLETED'
    },
    {
      id: 4,
      host: 'PartyMaker',
      title: 'Birthday Bash',
      type: 'Faajee',
      date: 'Jul 15, 2023',
      description: 'Birthday celebration',
      status: 'Cancelled',
      substatus: 'CANCELLED'
    }
  ]);

  // Filter options
  const transactionTypes = ['All Types', 'Lem', 'Faajee'];
  const substatusOptions = [
    'All Statuses',
    'CREATED',
    'PAYMENT_RECEIVED',
    'MEAL_PREPARING',
    'READY_FOR_PICKUP',
    'COMPLETED',
    'CANCELLED'
  ];

  // Filter logic
  const filteredTransactions = (dashboardTab === 'Active' ? activeTransactions : pastTransactions)
    .filter(transaction => {
      const typeMatch = selectedType === 'All Types' || transaction.type === selectedType;
      const substatusMatch = selectedSubstatus === 'All Statuses' || transaction.substatus === selectedSubstatus;
      const searchMatch = searchQuery === '' || 
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        transaction.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && substatusMatch && searchMatch;
    });

  const handleViewDetails = (transactionId) => {
    navigate(`/crew-room/${transactionId}`);
  };

  return (
   <> 
    <Navbar />
    <div className="min-h-screen bg-gray-50">
      
      {/* Header with Search */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiMenu size={24} />
        </button>
        
        <div className="relative mx-4 flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-6"></div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="w-64 h-full bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <nav>
              <ul className="space-y-4">
                <li>
                  <button 
                    className="w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Payment Method
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Verification
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Help
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'Active' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setDashboardTab('Active')}
          >
            Active
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'Past Orders' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setDashboardTab('Past Orders')}
          >
            Past Orders
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Type Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white py-2 px-4 rounded-lg border border-gray-300 hover:border-gray-400"
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            >
              <FiFilter size={16} />
              <span>{selectedType}</span>
              <FiChevronDown size={16} />
            </button>
            
            {showTypeDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                {transactionTypes.map((type) => (
                  <button
                    key={type}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedType === type ? 'bg-gray-100 text-purple-600' : ''}`}
                    onClick={() => {
                      setSelectedType(type);
                      setShowTypeDropdown(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Substatus Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white py-2 px-4 rounded-lg border border-gray-300 hover:border-gray-400"
              onClick={() => setShowSubstatusDropdown(!showSubstatusDropdown)}
            >
              <FiFilter size={16} />
              <span>{selectedSubstatus}</span>
              <FiChevronDown size={16} />
            </button>
            
            {showSubstatusDropdown && (
              <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                {substatusOptions.map((status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedSubstatus === status ? 'bg-gray-100 text-purple-600' : ''}`}
                    onClick={() => {
                      setSelectedSubstatus(status);
                      setShowSubstatusDropdown(false);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <EscrowCard 
                key={transaction.id} 
                transaction={transaction}
                onViewDetails={() => handleViewDetails(transaction.id)}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No {activeTab.toLowerCase()} transactions found
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          )}
        </div>
      </main>
    
    </div>
 </>
  );
};

export default EscrowDashboard;
