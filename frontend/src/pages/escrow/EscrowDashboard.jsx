import { useState } from 'react';
import { FiMenu, FiX, FiChevronDown, FiFilter } from 'react-icons/fi';
import EscrowCard from '../../components/escrow/EscrowCard';

const EscrowDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);


   const [activeTransactions] = useState([
  {
    id: 1,
    title: 'Lem Transaction #123',
    date: 'Jul 25, 2023',
    description: 'Payment for monthly subscription',
    status: 'Active'
  }
]);

const [allTransactions] = useState([
  {
    id: 1,
    title: 'Lem Transaction #123',
    date: 'Jul 25, 2023',
    description: 'Payment for monthly subscription',
    status: 'Active'
  },
  {
    id: 2,
    title: 'Faajee Order #456',
    date: 'Jul 20, 2023',
    description: 'Food delivery order',
    status: 'Completed'
  }
]);

  
  // Sample data
  const transactionTypes = ['All Types', 'Lem', 'Faajee'];
  const statusOptions = [
    'All Statuses',
    'Crew Created',
    'Crew Active',
    'Crew Pending completion',
    'Crew Sold out',
    'Crew Expired',
    'Order Locked',
    'Order Sent to Restaurants',
    'Pending Preparation',
    'Preparation Complete',
    'Ready for Pickup',
    'Picked up by Customer'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          <FiMenu size={24} />
        </button>
        
        <h1 className="text-xl font-semibold">My Transactions</h1>
        
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="w-64 h-full bg-white p-4">
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
                  <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
                    Payment Method
                  </button>
                </li>
                <li>
                  <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
                    Verification
                  </button>
                </li>
                <li>
                  <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100">
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
            onClick={() => setActiveTab('Active')}
          >
            Active
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'All' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('All')}
          >
            All
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

          {/* Status Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-white py-2 px-4 rounded-lg border border-gray-300 hover:border-gray-400"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <FiFilter size={16} />
              <span>{selectedStatus}</span>
              <FiChevronDown size={16} />
            </button>
            
            {showStatusDropdown && (
              <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedStatus === status ? 'bg-gray-100 text-purple-600' : ''}`}
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowStatusDropdown(false);
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
          {/* Placeholder for transaction items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  {activeTab === 'Active' ? (
    activeTransactions.length > 0 ? (
      activeTransactions.map((transaction) => (
        <EscrowCard key={transaction.id} transaction={transaction} />
      ))
    ) : (
      <div className="p-6 text-center text-gray-500">
        No active transactions
      </div>
    )
  ) : (
    allTransactions.length > 0 ? (
      allTransactions.map((transaction) => (
        <EscrowCard key={transaction.id} transaction={transaction} />
      ))
    ) : (
      <div className="p-6 text-center text-gray-500">
        No transactions found
      </div>
    )
  )}
</div>
        </div>
      </main>
    </div>
  );
};

export default EscrowDashboard;
