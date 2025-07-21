
import { 
  FiX, 
  FiShield, 
  FiUsers, 
  FiCheck, 
  FiBox, 
  FiDatabase, 
  FiMusic, 
  FiClock,
  FiUser,
  FiStar,
  FiSettings,
  FiArrowRight
} from 'react-icons/fi';
import { useState } from 'react';

// 1. Main Modal Component
export default function UserProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-end md:items-center md:justify-center">
      {/* Desktop Modal */}
      <div className="hidden md:block bg-gray-800 rounded-xl w-full max-w-md overflow-hidden">
        <ModalHeader onClose={onClose} />
        <ModalContent />
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden w-full bg-gray-800 rounded-t-3xl animate-slide-up">
        <ModalHeader onClose={onClose} mobile />
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <ModalContent mobile />
        </div>
      </div>
    </div>
  );
}

// 2. Modal Header
function ModalHeader({ onClose, mobile = false }) {
  return (
    <div className={`flex justify-between items-center p-4 ${mobile ? 'border-b border-gray-700' : ''}`}>
      <h2 className="text-xl font-bold">User Profile</h2>
      <button 
        onClick={onClose}
        className="p-1 rounded-full hover:bg-gray-700 transition-colors"
      >
        <FiX className="text-xl" />
      </button>
    </div>
  );
}

// 3. Modal Content
function ModalContent({ mobile = false }) {
  return (
    <>
      <ProfileSection />
      <StatusBar mobile={mobile} />
      <LevelProgress />
      <ServicesGrid mobile={mobile} />
    </>
  );
}

// 4. Profile Section
function ProfileSection() {
  return (
    <div className="p-6 text-center relative">
      {/* Premium/Settings Badges */}
      <div className="absolute top-4 right-4 flex gap-3">
        <FiStar className="text-yellow-400 text-xl" />
        <FiSettings className="text-gray-400 text-xl" />
      </div>
      
      {/* Avatar */}
      <div className="mx-auto w-20 h-20 bg-gray-700 rounded-full mb-3 flex items-center justify-center">
        <FiUser className="text-3xl text-gray-400" />
      </div>
      
      {/* User Info */}
      <h2 className="text-xl font-bold">username</h2>
      <p className="text-gray-400">full name</p>
    </div>
  );
}

// 5. Status Bar (Updated)
function StatusBar({ mobile }) {
  return (
    <div className={`flex ${mobile ? 'px-2 justify-between' : 'justify-center gap-6'} mb-6`}>
      <Badge icon={<FiShield />} label="LV1" color="amber" mobile={mobile} />
      <Button icon={<FiUsers />} label="Invite Friends" mobile={mobile} />
      <Badge icon={<FiCheck />} label="Verified" color="emerald" mobile={mobile} />
      <Badge icon={<FiCheck />} label="Premium" color="emerald" mobile={mobile} />
    </div>
  );
}

// 6. Level Progress
function LevelProgress() {
  return (
    <div className="bg-gray-700/50 p-4 rounded-xl mx-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">LV1 Progress</span>
        <span className="text-xs text-gray-400">40% complete</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '40%' }}></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Complete tasks to level up</span>
        <button className="flex items-center text-xs text-amber-400 hover:text-amber-300">
          View All <FiArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}

// 7. Services Grid
function ServicesGrid({ mobile }) {
  const services = [
    { icon: <FiBox />, label: "Lem Order" },
    { icon: <FiDatabase />, label: "Backed Projects" },
    { icon: <FiMusic />, label: "Events" },
    { icon: <FiClock />, label: "Party History" }
  ];

  return (
    <div className={`grid ${mobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3 px-4 pb-6`}>
      {services.map((service, index) => (
        <ServiceCard 
          key={index} 
          icon={service.icon} 
          label={service.label} 
          mobile={mobile} 
        />
      ))}
    </div>
  );
}

// 8. Reusable Components
function Badge({ icon, label, color, mobile = false }) {
  const colorClasses = {
    amber: 'bg-amber-900/50 text-amber-400',
    emerald: 'bg-emerald-900/50 text-emerald-400'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${mobile ? 'p-2' : 'p-3'} rounded-full ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className={`mt-1 ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </div>
  );
}

function Button({ icon, label, mobile = false }) {
  return (
    <button className={`flex flex-col items-center ${mobile ? 'w-full' : 'px-4 py-2'}`}>
      <div className={`${mobile ? 'p-2' : 'p-3'} rounded-full bg-purple-700 hover:bg-purple-600 transition-colors`}>
        {icon}
      </div>
      <span className={`mt-1 ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </button>
  );
}

function ServiceCard({ icon, label, mobile = false }) {
  return (
    <button className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-4 flex flex-col items-center">
      <div className={`${mobile ? 'text-xl' : 'text-2xl'} mb-2 p-3 rounded-full bg-gray-600`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </button>
  );
}

// Animation CSS (add to your global CSS)
// @keyframes slide-up {
//   from { transform: translateY(100%); }
//   to { transform: translateY(0); }
// }
// .animate-slide-up { animation: slide-up 0.3s ease-out; }
/*
import { FiX, FiBox, FiDatabase, FiMusic, FiClock } from 'react-icons/fi';

const ModalItem = ({ icon, label }) => (
  <button className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </button>
);

export default function MoreModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-start md:justify-end bg-black bg-opacity-50">
      {// Desktop: Right-Aligned Panel /}
      <div className="hidden md:block bg-white rounded-lg shadow-xl mt-16 mr-4 w-64">
        <div className="p-4 border-b">
          <h2 className="font-bold">MORE</h2>
        </div>
        <div className="p-2">
          <ModalItem icon={<FiBox />} label="Lem Order" />
          <ModalItem icon={<FiDatabase />} label="Backed Projects" />
          <ModalItem icon={<FiMusic />} label="Events" />
          <ModalItem icon={<FiClock />} label="Party History" />
        </div>
      </div>

      {// Mobile: Full-Width Bottom Sheet /}
      <div className="md:hidden w-full bg-white rounded-t-3xl shadow-t-2xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">MORE</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <ModalItem icon={<FiBox size={20} />} label="Lem Order" />
          <ModalItem icon={<FiDatabase size={20} />} label="Backed Projects" />
          <ModalItem icon={<FiMusic size={20} />} label="Events" />
          <ModalItem icon={<FiClock size={20} />} label="Party History" />
        </div>
      </div>
    </div>
  );
}

*/
