// components/navigation/TopNavbar.jsx
import { Link } from 'react-router-dom';
import { 
  FiSearch, FiSettings, FiBell, FiChevronDown, FiPlus 
} from 'react-icons/fi';

export default function TopNavbar({ user, activeTab, setActiveTab }) {
  const ProfileDropdown = () => (
    <div className="flex items-center cursor-pointer">
      <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
      <FiChevronDown className="w-4 h-4 text-gray-600" />
    </div>
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <nav className="md:hidden sticky top-0 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded mr-2"></div>
            <span className="font-bold text-white text-lg">PIABAM</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-purple-700">
              <FiSearch className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-purple-700 relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <Link 
              to="/signin" 
              className="text-sm font-medium text-white hover:text-purple-600"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:block sticky top-0 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm z-40">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded mr-2"></div>
            <span className="font-bold text-red-600 text-xl">PIABAM</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button aria-label="Settings" className="text-gray-600 hover:text-red-600">
              <FiSettings className="w-5 h-5" />
            </button>

            {/* Replaced modal with link */}
            <Link 
              to="/start" 
              className="p-1 bg-red-600 rounded-full hover:scale-110 transition-transform"
            >
              <FiPlus className="w-6 h-6 text-white" />
            </Link>

            <button className="text-gray-600 hover:text-red-600 relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {user ? (
              <ProfileDropdown />
            ) : (
              <div className="flex gap-3">
                <Link to="/signin" className="border border-red-600 text-red-600 px-4 py-1.5 rounded-full text-sm hover:bg-red-50">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t flex justify-center">
          {['Home', 'Lem', 'Faajee', 'Escrow'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium ${
                activeTab === tab 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              {tab}
            </button>
          ))}

          <Link
            to="/more"
            className="px-6 py-3 font-medium text-gray-600 hover:text-red-600 flex items-center"
          >
            More
            <FiChevronDown className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </nav>
    </>
  );
}
