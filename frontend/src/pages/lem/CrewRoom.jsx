

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
  import { useState } from "react";

export default function CrewRoom {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'cocoa22',
      avatar: '/avatars/cocoa.png',
      comment: 'SEE UU',
      timestamp: 'just now',
      badge: { icon: '🔥', count: 127 }
    }
    // Add more seed comments if needed
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSend = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
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
    const shareText = `Join the stream & comment!`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Live Chat Stream',
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-blue-900 text-white">
      {/* Comment Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start space-x-2">
            <img
              src={c.avatar}
              alt={c.user}
              className="w-8 h-8 rounded-full border border-yellow-400"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold">{c.user}</span>
                {c.badge && (
                  <span className="text-xs bg-blue-800 px-1 rounded-full flex items-center space-x-1">
                    <span>{c.badge.icon}</span>
                    <span>{c.badge.count}</span>
                  </span>
                )}
                <span className="text-xs text-gray-300 ml-1">{c.timestamp}</span>
              </div>
              <div className="text-sm">{c.comment}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input Box */}
      <div className="border-t border-blue-700 p-3 bg-blue-900">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Comment"
            className="flex-1 bg-blue-800 text-white px-4 py-2 rounded-full text-sm placeholder-gray-300 outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-white text-black px-3 py-2 rounded-full font-semibold text-sm"
          >
            Send
          </button>
        </div>

        {/* Icon Bar */}
        <div className="flex justify-between text-xl text-white px-2">
          <a href="/store" className="hover:scale-105 transition">🛍️</a>
          <button onClick={handleShare} className="hover:scale-105 transition">📤</button>
          <button className="hover:scale-105 transition">😊</button>
          <button className="hover:scale-105 transition">GIF</button>
        </div>
      </div>
    </div>
  );
}
