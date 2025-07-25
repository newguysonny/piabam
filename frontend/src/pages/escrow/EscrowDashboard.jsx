import { useState } from 'react';
import { FiMenu, FiX, FiChevronDown, FiFilter } from 'react-icons/fi';
import EscrowCard from '../../components/escrow/EscrowCard';


  const EscrowDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSubstatus, setSelectedSubstatus] = useState('All Statuses');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSubstatusDropdown, setShowSubstatusDropdown] = useState(false);

  // Sample transaction data with substatuses
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
  const filteredTransactions = (activeTab === 'Active' ? activeTransactions : pastTransactions)
    .filter(transaction => {
      const typeMatch = selectedType === 'All Types' || transaction.type === selectedType;
      const substatusMatch = selectedSubstatus === 'All Statuses' || transaction.substatus === selectedSubstatus;
      return typeMatch && substatusMatch;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <button onClick={() => setIsMenuOpen(true)} className="text-gray-600 hover:text-gray-900">
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-semibold">My Transactions</h1>
        <div className="w-6"></div>
      </header>

      {/* Mobile Menu (unchanged) */}

      <main className="container mx-auto px-4 py-6">
        {/* Updated Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'Active' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Active')}
          >
            Active
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'Past Orders' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Past Orders')}
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
              <EscrowCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No {activeTab.toLowerCase()} transactions found
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EscrowDashboard;
