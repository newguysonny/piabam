

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
      comment: 'AHAHAHAWHWAHHAHA.. THIS SONG HAS MY HEART',
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

  const [newComment, setNewComment] = useState("");
  const scrollRef = useRef(null);

  const handleSend = () => {
    if (newComment.trim()) {
      setComments(prev => [
        ...prev,
        {
          id: prev.length + 1,
          user: 'you',
          avatar: '/avatars/you.png',
          comment: newComment,
          timestamp: 'just now'
        }
      ]);
      setNewComment("");
    }
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
      {/* Comments Area (Bottom-up) */}
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

      {/* Input Row */}
      <div className="border-t border-blue-700 p-2 bg-blue-900">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Comment"
            className="flex-1 bg-blue-800 text-white px-3 py-1.5 rounded-full text-sm placeholder-gray-300 outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold"
          >
            Send
          </button>
          <a
            href="/store"
            className="text-xl text-white hover:text-yellow-300 transition"
            title="Go to Store"
          >
            🛍️
          </a>
          <button
            onClick={handleShare}
            className="text-xl text-white hover:text-yellow-300 transition"
            title="Share"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
}
