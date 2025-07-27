import MealCrewLayout from "../../components/lem/MealCrewLayout"
import RoomChat from "../../components/lem/RoomChat";


import { useLocation } from 'react-router-dom';

const CrewRoom = () => {
  const { state } = useLocation();
  const transaction = state?.transactionData;

  return (
      <>
     
  <MealCrewLayout />
  
    <RoomChat />
  

      </>
  );
};

export default CrewRoom;









/*
import { useState } from "react"; import { Link } from "react-router-dom"; import { FiChevronLeft, FiMoreVertical, FiHeart } from "react-icons/fi";

export default function MealCrewLayout() { const [showMenu, setShowMenu] = useState(false); const [showMealModal, setShowMealModal] = useState(false);

const closeMenu = () => setShowMenu(false); const closeMealModal = () => setShowMealModal(false);

return ( <div className="bg-neutral-900 text-gray-200 min-h-screen flex justify-center py-4"> <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-lg overflow-hidden relative">

{/* Header /}
    <div className="flex items-center justify-between px-4 h-[50px] border-b border-neutral-800">
      <div className="flex items-center gap-2">
        <Link to="/escrow-dashboard">
          <FiChevronLeft className="text-xl cursor-pointer" />
        </Link>
        <div>
          <div className="font-bold text-sm">Lem Crew</div>
          <div className="text-xs text-gray-400">Nneka and Friends Meal Crew...</div>
        </div>
      </div>
      <FiMoreVertical
        className="text-xl cursor-pointer"
        onClick={() => setShowMenu(true)}
      />
    </div>

    {/* Host /}
    <div className="flex flex-col items-center py-4">
      <div className="relative">
        <img
          src="/avatars/anna256.png"
          alt="Host Avatar"
          className="w-14 h-14 rounded-full border-4 border-blue-400 shadow-lg"
        />
        <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-white">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      <div className="mt-2 font-medium">Anna256</div>
      <div className="mt-1 flex gap-4 text-[10px] text-gray-400">
        <div className="flex flex-col items-center">
          <span>👥</span>
          <span>5.1K</span>
          <span className="text-[9px]">Participants</span>
        </div>
        <div className="flex flex-col items-center">
          <span>🌐</span>
          <span>50</span>
          <span className="text-[9px]">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span>🍽️</span>
          <span>26K</span>
          <span className="text-[9px]">Meals Sold</span>
        </div>
        <div className="flex flex-col items-center">
          <span>⭐</span>
          <span>3.5</span>
          <span className="text-[9px]">Rating</span>
        </div>
      </div>
    </div>

    {/* Meal Card /}
    <div className="mx-4 mb-4 p-3 bg-neutral-800 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/restaurants/sample.jpg"
          alt="Restaurant Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center gap-3">
          <img
            src="/meals/sample-meal.jpg"
            alt="Meal"
            className="w-14 h-14 rounded-md"
          />
          <button
            onClick={() => setShowMealModal(true)}
            className="bg-neutral-700 text-white text-xs px-3 py-1 rounded-full border border-white"
          >
            View Meal
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <FiHeart className="text-pink-400 text-lg" />
        <span className="text-sm">5.52K</span>
      </div>
    </div>

    {/* Bottom Status /}
    <div className="bg-neutral-950 text-white flex items-center justify-between px-4 h-[40px] border-t border-neutral-800">
      <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">READY FOR PICKUP</div>
    </div>

    {/* Overflow Menu Modal /}
    {showMenu && (
      <div
        onClick={closeMenu}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white text-black rounded-lg p-6 w-80 space-y-4"
        >
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Search</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Report</button>
          <button
            onClick={closeMenu}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-600"
          >
            Exit
          </button>
        </div>
      </div>
    )}

    {/* Meal Modal /}
    {showMealModal && (
      <div
        onClick={closeMealModal}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-neutral-800 text-white p-6 rounded-lg w-80"
        >
          <h3 className="text-lg font-semibold mb-4">Meal Details</h3>
          <p className="text-sm">More details about the meal can go here...</p>
          <button
            onClick={closeMealModal}
            className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
</div>

); }

*/


/*
<div className="p-4">
      <h1 className="text-2xl font-bold">{transaction?.title}</h1>
      <p className="text-gray-600">Host: {transaction?.host}</p>
      {/* Add your crew room UI here /}
    </div>
*/







/*
import { FiChevronLeft, FiMoreVertical, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';

export default function CrewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  */

/*
  // Mock data
  import { useState, useRef, useEffect } from "react";
import { FiSend, FiShare2, FiShoppingBag } from "react-icons/fi";

export default function CrewRoom() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'cocoa22',
      avatar: '/avatars/cocoa.png',
      comment: 'SEE UU',
      timestamp: 'just now'
    },
    {
      id: 2,
      user: 'benzrain',
      avatar: '/avatars/benz.png',
      comment: 'AHAHAHA THIS SONG HAS MY HEART',
      timestamp: 'just now'
    },
    {
      id: 3,
      user: 'moranghaever',
      avatar: '/avatars/morang.png',
      comment: "i remember yeonjun's eyes while recording this",
      timestamp: 'just now'
    }
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: prev.length + 1,
        user: 'you',
        avatar: '/avatars/you.png',
        comment: input,
        timestamp: 'just now'
      }
    ]);
    setInput("");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Live Comments", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  // Auto-scroll to bottom (top of reversed list)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [comments]);

  return (
    <div className="relative flex flex-col h-screen bg-neutral-900 text-white">
      {/* Chat Area /}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 pb-[80px] flex flex-col-reverse space-y-reverse space-y-3"
      >
        {[...comments].reverse().map((c) => (
          <div key={c.id} className="flex items-start space-x-2">
            <img
              src={c.avatar}
              alt={c.user}
              className="w-8 h-8 rounded-full border border-yellow-400"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-400">{c.user}</span>
                <span className="text-xs text-gray-500">{c.timestamp}</span>
              </div>
              <div className="text-sm text-white">{c.comment}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar (Fixed at bottom) /}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 p-2 z-50 border-t border-neutral-800">
        <div className="flex items-center gap-2 h-[45px]">
          {/* Input /}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a message..."
            className="flex-1 h-full bg-gray-800 text-white text-sm px-4 rounded-full placeholder-gray-400 outline-none overflow-hidden truncate min-w-0"
          />

          {/* Send (only when typing, no spacing reserved) /}
          {input.trim() && (
            <button
              onClick={handleSend}
              className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
              title="Send"
            >
              <FiSend className="text-xl" />
            </button>
          )}

          {/* Share /}
          <button
            onClick={handleShare}
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            title="Share"
          >
            <FiShare2 className="text-xl" />
          </button>

          {/* Store /}
          <a
            href="/store"
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            title="Store"
          >
            <FiShoppingBag className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
*/
