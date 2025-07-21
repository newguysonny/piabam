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

// 1. Main Modal Component
export default function UserProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-end md:items-center md:justify-center">
      {/* Desktop Modal */}
      <div className="hidden md:block bg-gray-900 rounded-xl w-full max-w-md overflow-hidden border border-gray-800 shadow-xl">
        <ModalHeader onClose={onClose} />
        <ModalContent />
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden w-full bg-gray-900 rounded-t-3xl border-t border-x border-gray-800 shadow-xl">
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
    <div className={`flex justify-between items-center p-4 ${mobile ? 'border-b border-gray-800' : ''}`}>
      <h2 className="text-xl font-bold text-white">User Profile</h2>
      <button 
        onClick={onClose}
        className="p-1 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
        aria-label="Close modal"
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
      <div className="absolute top-4 right-4 flex gap-3">
        <FiStar className="text-yellow-400 text-xl" />
        <FiSettings className="text-gray-400 text-xl hover:text-white transition-colors" />
      </div>
      
      <div className="mx-auto w-20 h-20 bg-gray-800 rounded-full mb-3 flex items-center justify-center">
        <FiUser className="text-3xl text-gray-400" />
      </div>
      
      <h2 className="text-xl font-bold text-white">username</h2>
      <p className="text-gray-300">full name</p>
    </div>
  );
}

// 5. Status Bar
function StatusBar({ mobile = false }) {
  return (
    <div className={`flex ${mobile ? 'px-2 justify-between' : 'justify-center gap-4'} mb-6 mx-4`}>
      <Badge icon={<FiShield />} label="LV1" color="amber" mobile={mobile} />
      <Button icon={<FiUsers />} label="Invite Friends" mobile={mobile} />
      <div className={`flex ${mobile ? 'gap-4' : 'gap-4'}`}>
        <Badge icon={<FiCheck />} label="Verified" color="emerald" mobile={mobile} />
        <Badge icon={<FiStar />} label="Premium" color="yellow" mobile={mobile} />
      </div>
    </div>
  );
}

// 6. Level Progress
function LevelProgress() {
  return (
    <div className="bg-gray-800/50 p-4 rounded-xl mx-4 mb-6 border border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">LV1 Progress</span>
        <span className="text-xs text-gray-400">40% complete</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
        <div 
          className="bg-amber-500 h-2 rounded-full" 
          style={{ width: '40%' }}
        />
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
function ServicesGrid({ mobile = false }) {
  const services = [
    { icon: <FiBox className="text-blue-400" />, label: "Lem Order", bg: "bg-blue-900/30" },
    { icon: <FiDatabase className="text-purple-400" />, label: "Backed Projects", bg: "bg-purple-900/30" },
    { icon: <FiMusic className="text-pink-400" />, label: "Events", bg: "bg-pink-900/30" },
    { icon: <FiClock className="text-amber-400" />, label: "Party History", bg: "bg-amber-900/30" }
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
        />
      ))}
    </div>
  );
}

// 8. Reusable Components
function Badge({ icon, label, color, mobile = false }) {
  const colorClasses = {
    amber: 'bg-amber-900/30 text-amber-400 border-amber-800',
    emerald: 'bg-emerald-900/30 text-emerald-400 border-emerald-800',
    yellow: 'bg-yellow-900/30 text-yellow-400 border-yellow-800'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${mobile ? 'p-2' : 'p-3'} rounded-full ${colorClasses[color]} border flex items-center justify-center`}>
        {icon}
      </div>
      <span className={`mt-1 text-white ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </div>
  );
}

function Button({ icon, label, mobile = false }) {
  return (
    <button className={`flex flex-col items-center ${mobile ? 'w-full' : 'px-4'}`}>
      <div className={`${mobile ? 'p-2' : 'p-3'} rounded-full bg-purple-700 hover:bg-purple-600 transition-colors flex items-center justify-center`}>
        {icon}
      </div>
      <span className={`mt-1 text-white ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </button>
  );
}

function ServiceCard({ icon, label, bg, mobile = false }) {
  return (
    <button className={`${bg} hover:bg-opacity-50 transition-all rounded-lg p-4 flex flex-col items-center border border-gray-800`}>
      <div className={`${mobile ? 'text-xl' : 'text-2xl'} mb-2 p-3 rounded-full`}>
        {icon}
      </div>
      <span className="text-white text-sm">{label}</span>
    </button>
  );
}
