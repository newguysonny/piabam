// components/navigation/BottomNavbar.jsx
import { useState, useEffect, useRef } from 'react';
import { FiHome, FiBox, FiGlobe, FiPlus, FiMoreHorizontal } from 'react-icons/fi';
import StartModal from '../StartModal';
import MoreModal from '../MoreModal';

export default function BottomNavbar({ activeTab, setActiveTab }) {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const bottomNavRef = useRef(null);

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

    const throttledScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [lastScrollY]);

  const NavIcon = ({ name }) => {
    const icons = {
      Home: <FiHome className="w-5 h-5" />,
      Lem: <FiBox className="w-5 h-5" />,
      Faajee: <FiGlobe className="w-5 h-5" />,
    };
    return icons[name] || null;
  };

  return (
    <>
      <div
        ref={bottomNavRef}
        className={`md:hidden fixed bottom-0 w-full bg-white border-t shadow-lg z-40 transition-transform duration-300 ${
          showBottomNav ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="grid grid-cols-5 py-2">
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
        </div>
      </div>

      {/* Modals */}
      {showStartModal && <StartModal isOpen onClose={() => setShowStartModal(false)} />}
      {showMoreModal && <MoreModal isOpen onClose={() => setShowMoreModal(false)} />}
    </>
  );
}
