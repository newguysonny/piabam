

/*
import { useLocation } from 'react-router-dom';

const CrewRoom = () => {
  const { state } = useLocation();
  const transaction = state?.transactionData;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{transaction?.title}</h1>
      <p className="text-gray-600">Host: {transaction?.host}</p>
      {/* Add your crew room UI here /}
    </div>
  );
};

export default CrewRoom;

*/

import { FiChevronLeft, FiMoreVertical, FiSearch, FiSend, FiPaperclip, FiMic } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';

export default function CrewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data
  const crew = {
    title: "Friday BBQ Crew",
    host: "Anna456",
    status: "Active",
    members: 24,
    mealItems: ["Jollof Rice", "Grilled Chicken", "Plantain"],
    chatMessages: [
      { user: "Mike", text: "Bringing drinks!", time: "12:30 PM" },
      { user: "Sarah", text: "Can we add vegetarian options?", time: "12:45 PM" }
    ]
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header (Telegram-style) */}
      <header className="bg-blue-500 text-white p-3 flex items-center shadow-md">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 mr-2"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold">{crew.title}</h1>
          <p className="text-xs opacity-80">{crew.members} members</p>
        </div>
        <button className="p-1">
          <FiMoreVertical />
        </button>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#e6ebee]">
        {/* Event Details Card */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-500 font-bold">FC</span>
            </div>
            <div>
              <h2 className="font-bold">{crew.title}</h2>
              <p className="text-sm text-gray-500">Hosted by @{crew.host}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="w-24 text-gray-500">Status</span>
              <span className={`px-2 py-1 rounded text-xs ${
                crew.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
              }`}>
                {crew.status}
              </span>
            </div>
            
            <div className="flex items-start text-sm">
              <span className="w-24 text-gray-500">Menu</span>
              <ul className="list-disc pl-5">
                {crew.mealItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="space-y-3">
          {crew.chatMessages.map((msg, i) => (
            <div key={i} className="bg-white p-3 rounded-lg shadow max-w-[80%]">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-blue-500">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area (Telegram-style) */}
      <div className="bg-white p-3 flex items-center border-t">
        <button className="p-2 text-gray-500">
          <FiPaperclip />
        </button>
        <input
          type="text"
          placeholder="Message"
          className="flex-1 mx-2 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
        />
        <button className="p-2 text-blue-500">
          <FiMic />
        </button>
        <button className="p-2 bg-blue-500 text-white rounded-full ml-2">
          <FiSend />
        </button>
      </div>
    </div>
  );
 }
