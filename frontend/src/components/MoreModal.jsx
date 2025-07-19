import { FiX, FiBox, FiDatabase, FiMusic, FiClock } from 'react-icons/fi';

export default function ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-start md:justify-end bg-black bg-opacity-50">
      {/* Desktop: Right-Aligned Panel */}
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

      {/* Mobile: Full-Width Bottom Sheet */}
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
};

const ModalItem = ({ icon, label }) => (
  <button className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </button>
);
