

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
/*
import { FiChevronLeft, FiMoreVertical, FiHeart, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';

export default function CrewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  */
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="flex flex-col h-screen bg-blue-900 text-white">
      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col-reverse p-4 space-y-reverse space-y-3"
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
                <span className="text-sm font-semibold">{c.user}</span>
                <span className="text-xs text-gray-300">{c.timestamp}</span>
              </div>
              <div className="text-sm">{c.comment}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-black">
        <div className="flex items-center gap-2 h-10">
          {/* Comment Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a message..."
            className="flex-1 h-full bg-gray-800 text-white text-sm px-4 rounded-full placeholder-gray-400 outline-none"
          />

          {/* Send Button (↗️) */}
          {input.trim() && (
            <button
              onClick={handleSend}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
              title="Send"
            >
              <FiSend className="text-xl" />
            </button>
          )}

          {/* Share Icon */}
          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            title="Share"
          >
            <FiShare2 className="text-xl" />
          </button>

          {/* Store Icon */}
          <a
            href="/store"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            title="Visit Store"
          >
            <FiShoppingBag className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
