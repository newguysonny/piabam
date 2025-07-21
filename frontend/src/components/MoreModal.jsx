
import { 
  FiShield, 
  FiUsers, 
  FiCheck, 
  FiX, 
  FiSettings, 
  FiBox, 
  FiDatabase, 
  FiMusic, 
  FiClock,
  FiUser,
  FiStar,
  FiArrowRight
} from 'react-icons/fi';

// 1. Status Bar Component
function StatusBar() {
  return (
    <div className="bg-gray-900 p-4">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center gap-6">
        <Badge icon={<FiShield />} label="LV1" color="amber" />
        <Button icon={<FiUsers />} label="Invite Friends" />
        <Badge icon={<FiCheck />} label="Verified" color="emerald" />
        <Badge icon={<FiCheck />} label="Premium" color="emerald" />
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-around">
        <Badge icon={<FiShield />} label="LV1" color="amber" mobile />
        <Button icon={<FiUsers />} label="Invite" mobile />
        <Badge icon={<FiCheck />} label="Verified" color="emerald" mobile />
        <Badge icon={<FiCheck />} label="Premium" color="emerald" mobile />
      </div>
    </div>
  );
}

// 2. Profile Section
function ProfileSection() {
  return (
    <div className="bg-gray-800 p-6 text-center">
      <div className="flex justify-end space-x-4 mb-4">
        <FiStar className="text-yellow-400 text-xl" />
        <FiSettings className="text-gray-400 text-xl" />
      </div>
      
      <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full mb-3 flex items-center justify-center">
        <FiUser className="text-4xl text-gray-400" />
      </div>
      
      <h2 className="text-xl font-bold">username</h2>
      <p className="text-gray-400">full name</p>
    </div>
  );
}

// 3. Level Progress
function LevelProgress() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mx-4 my-4 border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">LV1 Progress</span>
        <span className="text-xs text-gray-400">40% complete</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '40%' }}></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Boost your level by completing tasks</span>
        <button className="flex items-center text-xs text-amber-400">
          View All <FiArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}

// 4. Services Grid
function ServicesGrid() {
  const services = [
    { icon: <FiBox />, label: "Lem Order" },
    { icon: <FiDatabase />, label: "Backed Projects" },
    { icon: <FiMusic />, label: "Events" },
    { icon: <FiClock />, label: "Party History" }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900">
      {services.map((service, index) => (
        <ServiceCard key={index} icon={service.icon} label={service.label} />
      ))}
    </div>
  );
}

// 5. Reusable Components
function Badge({ icon, label, color, mobile = false }) {
  const colorClasses = {
    amber: 'bg-amber-900/50 text-amber-400',
    emerald: 'bg-emerald-900/50 text-emerald-400'
  };

  return (
    <div className={`flex flex-col items-center ${mobile ? 'px-1' : ''}`}>
      <div className={`p-2 rounded-full ${colorClasses[color]} ${mobile ? 'text-lg' : 'p-3 text-xl'}`}>
        {icon}
      </div>
      <span className={`mt-1 ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </div>
  );
}

function Button({ icon, label, mobile = false }) {
  return (
    <button className={`flex flex-col items-center bg-purple-700 hover:bg-purple-600 transition-colors rounded-lg 
      ${mobile ? 'px-2' : 'px-4 py-2'}`}>
      <div className={mobile ? 'text-lg' : 'text-xl'}>{icon}</div>
      <span className={`mt-1 ${mobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </button>
  );
}

function ServiceCard({ icon, label }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center hover:bg-gray-700 transition-colors cursor-pointer">
      <div className="bg-gray-700 p-3 rounded-full text-xl mb-2">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

// Main Component
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ProfileSection />
      <StatusBar />
      <LevelProgress />
      <ServicesGrid />
    </div>
  );
}
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
