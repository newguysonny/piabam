

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

import { FiChevronLeft, FiMoreVertical, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi';
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
      { 
        user: "Mike", 
        text: "Bringing drinks!", 
        time: "just now", 
        likes: 5,
        isHost: false 
      },
      { 
        user: "Sarah", 
        text: "Can we add vegetarian options?", 
        time: "2 min ago", 
        likes: 3,
        isHost: true 
      }
    ]
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b p-4 flex items-center shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 mr-2 text-gray-600"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">{crew.title}</h1>
          <p className="text-xs text-gray-500">{crew.members} members</p>
        </div>
        <button className="p-1 text-gray-600">
          <FiMoreVertical />
        </button>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {/* Event Details - Stationhead-style */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">FC</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">{crew.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Hosted by @{crew.host}</p>
              <div className="flex flex-wrap gap-2">
                {crew.mealItems.map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area - Stationhead-style */}
        <div className="space-y-4">
          {crew.chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isHost ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 ${msg.isHost ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                <div className="flex items-center mb-1">
                  <span className={`font-medium ${msg.isHost ? 'text-white' : 'text-blue-500'}`}>
                    {msg.user}
                  </span>
                  <span className={`text-xs mx-2 ${msg.isHost ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>
                <p>{msg.text}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <button className={`flex items-center text-xs ${msg.isHost ? 'text-blue-200' : 'text-gray-400'}`}>
                    <FiHeart className="mr-1" /> {msg.likes}
                  </button>
                  <button className={`text-xs ${msg.isHost ? 'text-blue-200' : 'text-gray-400'}`}>
                    <FiMessageSquare />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area - Stationhead-style */}
      <div className="bg-white border-t p-3">
        <div className="flex items-center bg-gray-100 rounded-full px-4">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 py-3 bg-transparent focus:outline-none"
          />
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500">
              <FiShare2 size={18} />
            </button>
            <button className="p-2 text-blue-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
