import React from 'react';
import { 
  FiX, FiShield, FiUsers, FiCheck, 
  FiBox, FiDatabase, FiMusic, FiClock,
  FiUser, FiStar, FiSettings, FiArrowRight 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  color: 'amber' | 'emerald' | 'yellow';
  mobile?: boolean;
}

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  mobile?: boolean;
  onClick?: () => void;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  label: string;
  bg: string;
  mobile?: boolean;
  onClick?: () => void;
}

export const UserProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          
          {/* Desktop Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="hidden md:block relative z-10 bg-gray-900 rounded-xl w-full max-w-md overflow-hidden border border-gray-800 shadow-2xl"
          >
            <ModalHeader onClose={onClose} />
            <ModalContent />
          </motion.div>

          {/* Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="md:hidden relative z-10 w-full bg-gray-900 rounded-t-3xl border-t border-x border-gray-800 shadow-2xl"
          >
            <ModalHeader onClose={onClose} mobile />
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <ModalContent mobile />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ModalHeader: React.FC<{ onClose: () => void; mobile?: boolean }> = ({ onClose, mobile }) => (
  <div className={`flex justify-between items-center p-4 ${mobile ? 'border-b border-gray-800' : ''}`}>
    <h2 className="text-xl font-bold text-white">User Profile</h2>
    <button 
      onClick={onClose}
      className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Close modal"
    >
      <FiX className="text-xl" />
    </button>
  </div>
);

const ModalContent: React.FC<{ mobile?: boolean }> = ({ mobile }) => (
  <>
    <ProfileSection />
    <StatusBar mobile={mobile} />
    <LevelProgress />
    <ServicesGrid mobile={mobile} />
  </>
);

const ProfileSection: React.FC = () => (
  <div className="p-6 text-center relative">
    <div className="absolute top-4 right-4 flex gap-3">
      <FiStar className="text-yellow-400 text-xl" aria-hidden="true" />
      <FiSettings className="text-gray-400 text-xl hover:text-white transition-colors" aria-hidden="true" />
    </div>
    
    <div className="mx-auto w-20 h-20 bg-gray-800 rounded-full mb-3 flex items-center justify-center">
      <FiUser className="text-3xl text-gray-400" aria-hidden="true" />
    </div>
    
    <h2 className="text-xl font-bold text-white">username</h2>
    <p className="text-gray-300">full name</p>
  </div>
);

const StatusBar: React.FC<{ mobile?: boolean }> = ({ mobile }) => (
  <div className={`flex ${mobile ? 'px-2 justify-between' : 'justify-center gap-4'} mb-6 mx-4`}>
    <Badge icon={<FiShield />} label="LV1" color="amber" mobile={mobile} />
    <Button icon={<FiUsers />} label="Invite Friends" mobile={mobile} />
    <div className={`flex ${mobile ? 'gap-4' : 'gap-4'}`}>
      <Badge icon={<FiCheck />} label="Verified" color="emerald" mobile={mobile} />
      <Badge icon={<FiStar />} label="Premium" color="yellow" mobile={mobile} />
    </div>
  </div>
);

const Badge: React.FC<BadgeProps> = ({ icon, label, color, mobile = false }) => {
  const colorClasses = {
    amber: 'bg-amber-900/30 text-amber-400 border-amber-800',
    emerald: 'bg-emerald-900/30 text-emerald-400 border-emerald-800',
    yellow: 'bg-yellow-900/30 text-yellow-400 border-yellow-800'
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${mobile ? 'p-2' : 'p-3'} rounded-full ${colorClasses[color]} border flex items-center justify-center`}
        aria-label={label}
      >
        {icon}
      </div>
      <span className={`mt-1 text-white ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({ icon, label, mobile = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center ${mobile ? 'w-full' : 'px-4'} focus:outline-none`}
    aria-label={label}
  >
    <div 
      className={`${mobile ? 'p-2' : 'p-3'} rounded-full bg-purple-700 hover:bg-purple-600 transition-colors flex items-center justify-center`}
    >
      {icon}
    </div>
    <span className={`mt-1 text-white ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
  </button>
);

const LevelProgress: React.FC = () => (
  <div className="bg-gray-800/50 p-4 rounded-xl mx-4 mb-6 border border-gray-800">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-white">LV1 Progress</span>
      <span className="text-xs text-gray-400">40% complete</span>
    </div>
    
    <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
      <motion.div 
        className="bg-amber-500 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 0.5 }}
      />
    </div>
    
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400">Complete tasks to level up</span>
      <button 
        className="flex items-center text-xs text-amber-400 hover:text-amber-300 focus:outline-none"
        aria-label="View all levels"
      >
        View All <FiArrowRight className="ml-1" />
      </button>
    </div>
  </div>
);

const ServicesGrid: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const services = [
    { 
      icon: <FiBox className="text-blue-400" />, 
      label: "Lem Order", 
      bg: "bg-blue-900/30",
      onClick: () => console.log('Lem Order clicked')
    },
    { 
      icon: <FiDatabase className="text-purple-400" />, 
      label: "Backed Projects", 
      bg: "bg-purple-900/30",
      onClick: () => console.log('Backed Projects clicked')
    },
    { 
      icon: <FiMusic className="text-pink-400" />, 
      label: "Events", 
      bg: "bg-pink-900/30",
      onClick: () => console.log('Events clicked')
    },
    { 
      icon: <FiClock className="text-amber-400" />, 
      label: "Party History", 
      bg: "bg-amber-900/30",
      onClick: () => console.log('Party History clicked')
    }
  ];

  return (
    <div className={`grid ${mobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3 px-4 pb-6`}>
      {services.map((service, index) => (
        <ServiceCard 
          key={index}
          icon={service.icon}
          label={service.label}
          bg={service.bg}
          mobile={mobile}
          onClick={service.onClick}
        />
      ))}
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, label, bg, mobile = false, onClick }) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`${bg} hover:bg-opacity-50 transition-all rounded-lg p-4 flex flex-col items-center border border-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900`}
    aria-label={label}
  >
    <div className={`${mobile ? 'text-xl' : 'text-2xl'} mb-2 p-3 rounded-full`}>
      {icon}
    </div>
    <span className="text-white text-sm">{label}</span>
  </motion.button>
);
