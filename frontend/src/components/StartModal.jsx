import { FiX, FiEdit, FiCalendar, FiFolder } from 'react-icons/fi';

export default function StartModal ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Desktop: Centered Card */}
      <div className="hidden md:block bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">START</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <ActionButton icon={<FiEdit size={20} />} label="Post" />
          <ActionButton icon={<FiCalendar size={20} />} label="Event" />
          <ActionButton icon={<FiFolder size={20} />} label="Project" />
        </div>
      </div>

      {/* Mobile: Bottom Sheet */}
      <div className="md:hidden absolute bottom-0 w-full bg-white rounded-t-3xl shadow-t-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">START</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <ActionButton icon={<FiEdit size={20} />} label="Post" fullWidth />
          <ActionButton icon={<FiCalendar size={20} />} label="Event" fullWidth />
          <ActionButton icon={<FiFolder size={20} />} label="Project" fullWidth />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, fullWidth = false }) => (
  <button className={`flex flex-col items-center justify-center ${fullWidth ? 'w-full p-4' : 'p-3'} rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors`}>
    <span className="mb-2">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);
