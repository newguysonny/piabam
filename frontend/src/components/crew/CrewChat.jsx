import { useState, useRef, useEffect } from "react";
import { FiSend, FiShare2, FiShoppingBag, FiX } from "react-icons/fi";
import { useParams, useNavigate } from 'react-router-dom';
import LemDiscoveryPage from "../../pages/lem/LemDiscoveryPage";

export default function CrewChat({ transaction }) {
  // Function to generate placeholder avatar dynamically
  const getPlaceholderAvatar = (username) => {
    const colors = ["7E22CE", "3B82F6", "10B981", "F59E0B"]; // Purple, Blue, Green, Yellow
    const color = colors[username.length % colors.length];
    return `https://placehold.co/100x100/${color}/FFFFFF?text=${username
      .charAt(0)
      .toUpperCase()}&font=roboto`;
  };

  const [comments, setComments] = useState([
    { id: 1, user: "cocoa22", comment: "SEE UU", timestamp: "just now" },
    {
      id: 2,
      user: "benzrain",
      comment: "AHAHAHA THIS SONG HAS MY HEART",
      timestamp: "just now",
    },
    {
      id: 3,
      user: "moranghaever",
      comment: "i remember yeonjun's eyes while recording this",
      timestamp: "just now",
    },
    { id: 4, user: "cocoa22", comment: "SEE UU", timestamp: "just now" },
    {
      id: 5,
      user: "benzrain",
      comment: "AHAHAHA THIS SONG HAS MY HEART",
      timestamp: "just now",
    },
    {
      id: 6,
      user: "moranghaever",
      comment: "i remember yeonjun's eyes while recording this",
      timestamp: "just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: comments.length + 1,
      user: "you",
      comment: input,
      timestamp: "just now",
    };

    setComments((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "lem Crew", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const openStoreModal = () => setIsStoreModalOpen(true);
  const closeStoreModal = () => setIsStoreModalOpen(false);

  return (
    <div className="relative flex flex-col bg-neutral-900 text-white">
      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 pb-[80px] flex flex-col space-y-3"
      >
        {comments.map((c) => (
          <div key={c.id} className="flex items-start space-x-2">
            <img
              src={getPlaceholderAvatar(c.user)}
              alt={c.user}
              className="w-8 h-8 rounded-full border border-yellow-400"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-400">
                  {c.user}
                </span>
                <span className="text-xs text-gray-500">{c.timestamp}</span>
              </div>
              <div className="text-sm text-white">{c.comment}</div>
            </div>
          </div>
        ))}
        <div style={{ height: "15px" }} ref={messagesEndRef} />
      </div>

      {/* Input Bar (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 p-2 z-50 border-t border-neutral-800">
        <div className="flex items-center gap-2 h-[45px]">
          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a message..."
            className="flex-1 h-full bg-gray-800 text-white text-sm px-4 rounded-full placeholder-gray-400 outline-none overflow-hidden truncate min-w-0"
          />

          {/* Send (only when typing) */}
          {input.trim() && (
            <button
              onClick={handleSend}
              className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
              title="Send"
            >
              <FiSend className="text-xl" />
            </button>
          )}

          {/* Share */}
          <button
            onClick={handleShare}
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            title="Share"
          >
            <FiShare2 className="text-xl" />
          </button>

          {/* Store - Now opens modal */}
          <button
            onClick={openStoreModal}
            className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
            title="Store"
          >
            <FiShoppingBag className="text-xl" />
          </button>
        </div>
      </div>

      {/* Store Modal */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-800 rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-700">
              <h2 className="text-lg font-semibold text-white">Store</h2>
              <button
                onClick={closeStoreModal}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="text-gray-800 bg-white text-center py-8">
                <LemDiscoveryPage />
              </div>
              {/* You can add your store items, menu, etc. here */}
              
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-700">
              <button
                onClick={closeStoreModal}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




/*
import { useState, useRef, useEffect } from "react";
import { FiSend, FiShare2, FiShoppingBag } from "react-icons/fi";
import { useParams, useNavigate } from 'react-router-dom';

export default function CrewChat({ transaction }) {
  // Function to generate placeholder avatar dynamically
  const getPlaceholderAvatar = (username) => {
    const colors = ["7E22CE", "3B82F6", "10B981", "F59E0B"]; // Purple, Blue, Green, Yellow
    const color = colors[username.length % colors.length];
    return `https://placehold.co/100x100/${color}/FFFFFF?text=${username
      .charAt(0)
      .toUpperCase()}&font=roboto`;
  };

  const [comments, setComments] = useState([
    { id: 1, user: "cocoa22", comment: "SEE UU", timestamp: "just now" },
    {
      id: 2,
      user: "benzrain",
      comment: "AHAHAHA THIS SONG HAS MY HEART",
      timestamp: "just now",
    },
    {
      id: 3,
      user: "moranghaever",
      comment: "i remember yeonjun's eyes while recording this",
      timestamp: "just now",
    },
    { id: 4, user: "cocoa22", comment: "SEE UU", timestamp: "just now" },
    {
      id: 5,
      user: "benzrain",
      comment: "AHAHAHA THIS SONG HAS MY HEART",
      timestamp: "just now",
    },
    {
      id: 6,
      user: "moranghaever",
      comment: "i remember yeonjun's eyes while recording this",
      timestamp: "just now",
    },
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: comments.length + 1,
      user: "you",
      comment: input,
      timestamp: "just now",
    };

    setComments((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "lem Crew", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative flex flex-col bg-neutral-900 text-white">
      {/* Chat Area /}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 pb-[80px] flex flex-col space-y-3"
      >
        {comments.map((c) => (
          <div key={c.id} className="flex items-start space-x-2">
            <img
              src={getPlaceholderAvatar(c.user)}
              alt={c.user}
              className="w-8 h-8 rounded-full border border-yellow-400"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-400">
                  {c.user}
                </span>
                <span className="text-xs text-gray-500">{c.timestamp}</span>
              </div>
              <div className="text-sm text-white">{c.comment}</div>
            </div>
          </div>
        ))}
        <div style={{ height: "15px" }} ref={messagesEndRef} />
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

          {/* Send (only when typing) /}
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
