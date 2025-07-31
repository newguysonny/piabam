import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  // Add this import
import { throttle } from 'lodash';
import { 
  FiSearch, 
  FiSettings, 
  FiBell, 
  FiChevronDown,
  FiPlus,
  FiMoreHorizontal,
  FiHome,
  FiBox,
  FiGlobe
} from 'react-icons/fi';
import  StartModal  from './StartModal';
import  MoreModal  from './MoreModal';

export default function Navbar() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const bottomNavRef = useRef(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [user, setUser] = useState(null); // Add user state or get from context

  const ProfileDropdown = () => (
    <div className="flex items-center cursor-pointer">
      <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
      <FiChevronDown className="w-4 h-4 text-gray-600" />
    </div>
  );
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setShowBottomNav(false);
      } else if (currentScrollY < lastScrollY) {
        setShowBottomNav(true);
      }

      setLastScrollY(currentScrollY);
    };
     

    const throttledScroll = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
     }, [lastScrollY]);
  
  return (
    <>
       {/* Mobile Top Navbar (Updated per your request) */}
      <nav className="md:hidden sticky top-0 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded mr-2"></div>
            <span className="font-bold text-white text-lg">PIABAM</span>
          </div>

          {/* Right-Aligned Icons + Sign In */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-purple-700">
              <FiSearch className="w-5 h-5" /> {/* 🔍 */}
            </button>
            <button className="text-white hover:text-purple-700 relative">
              <FiBell className="w-5 h-5" /> {/* 🔔 */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <button className="text-sm font-medium">
               <Link 
             to="/signin" 
             className="text-white hover:text-purple-600 transition-colors"
                >
                  Sign in
                </Link>
           </button>
          </div>
        </div>
      </nav>

      
      {/* Desktop Navbar */}
      <nav className="hidden md:block sticky top-0 bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm z-40">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center">
      <div className="w-8 h-8 bg-red-600 rounded mr-2"></div>
      <span className="font-bold text-red-600 text-xl">PIABAM</span>
      </div>
      
      {/* Center: Search */}
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
      
      {/* Right: Actions */}
      <div className="flex items-center gap-5">
      <button aria-label="Settings" className="text-gray-600 hover:text-red-600">
      <FiSettings className="w-5 h-5" />
      </button>
      
      <button 
      onClick={() => setShowStartModal(true)}
      className="p-1 bg-red-600 rounded-full hover:scale-110 transition-transform"
      aria-label="Start"
      >
      <FiPlus className="w-6 h-6 text-white" />
      </button>
      
      <button className="text-gray-600 hover:text-red-600 relative">
      <FiBell className="w-5 h-5" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
      </button>
      
      {user ? (
      <ProfileDropdown />
      ) : (
      <div className="flex gap-3">
      <button className="border border-red-600 text-red-600 px-4 py-1.5 rounded-full text-sm hover:bg-red-50">
      Sign In
      </button>
      <button className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700">
      Sign Up
      </button>
      </div>
      )}
      </div>
      </div>
      
      {/* Desktop Tabs */}
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
      
      {/* More Dropdown */}
      <div className="relative group">
      <button 
      onClick={() => setShowMoreModal(true)}
      className="px-6 py-3 font-medium text-gray-600 hover:text-red-600 flex items-center"
      >
      More
      <FiChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform" />
      </button>
      </div>
      </div>
      </nav>
      
      {/* Mobile Footer Nav */}
      <div 
        ref={bottomNavRef}
        className={`md:hidden fixed bottom-0 w-full bg-white border-t shadow-lg z-40 transition-transform duration-300 ${
          showBottomNav ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
      <div className="grid grid-cols-5 py-2">
        {['Home', 'Lem', 'Start', 'Faajee', 'More'].map((item) => {
  const isActive = activeTab === item;
  const baseClass = `flex flex-col items-center justify-center py-1 ${
    isActive ? 'text-purple-700' : 'text-gray-600'
  }`;

  if (item === 'Start') {
    return (
      <button
        key={item}
        onClick={() => setShowStartModal(true)}
        className={baseClass}
      >
        <div className="bg-purple-600 rounded-full p-2 -mt-6">
          <FiPlus className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs mt-1">{item}</span>
      </button>
    );
  }

  if (item === 'More') {
    return (
      <button
        key={item}
        onClick={() => setShowMoreModal(true)}
        className={baseClass}
      >
        <FiMoreHorizontal className="w-5 h-5" />
        <span className="text-xs mt-1">{item}</span>
      </button>
    );
  }

  // For Home, Lem, Faajee
  return (
    <Link
      key={item}
      to={routeMap[item]}
      onClick={() => setActiveTab(item)}
      className={baseClass}
    >
      <NavIcon name={item} />
      <span className="text-xs mt-1">{item}</span>
    </Link>
  );
})}
        
        { /*
      {['Home', 'Lem', 'Start', 'Faajee', 'More'].map((item) => (
      <button
      key={item}
      onClick={() => {
      if (item === 'Start') setShowStartModal(true);
      else if (item === 'More') setShowMoreModal(true);
      else setActiveTab(item);
      }}
      className={`flex flex-col items-center justify-center py-1 ${
      activeTab === item ? 'text-purple-700' : 'text-gray-600'
      }`}
      >
      {item === 'Start' ? (
      <div className="bg-purple-600 rounded-full p-2 -mt-6">
      <FiPlus className="w-6 h-6 text-white" />
      </div>
      ) : item === 'More' ? (
      <FiMoreHorizontal className="w-5 h-5" />
      ) : (
      <NavIcon name={item} />
      )}
      <span className="text-xs mt-1">{item}</span>
      </button>
      ))}
      */}
      </div>
      </div>
      
      {/* Modals */}
      {showStartModal && <StartModal isOpen onClose={() => setShowStartModal(false)} />}
      {showMoreModal && <MoreModal isOpen onClose={() => setShowMoreModal(false)} />}
     
     
    </>
  );
}

// Helper component for mobile icons
const NavIcon = ({ name }) => {
  const icons = {
    Home: <FiHome className="w-5 h-5" />,
    Lem: <FiBox className="w-5 h-5" />,
    Faajee: <FiGlobe className="w-5 h-5" />,
  };
  return icons[name] || null;
};




