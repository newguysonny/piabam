import { useState, useEffect } from 'react';
import { FiHeart, FiShare2, FiShoppingCart, FiMessageSquare, FiMusic, FiUser } from 'react-icons/fi';

const RoomPage = () => {
  // Room state
  const [isConnected, setIsConnected] = useState(false);
  const [hasOrdered, setHasOrdered] = useState(false);
  const [likes, setLikes] = useState(1200);
  const [listeners, setListeners] = useState(24);
  const [plays, setPlays] = useState(5800);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'User1', text: 'These tacos slap!', time: '2 min ago' },
    { user: 'User2', text: 'Song 🔥!', time: '1 min ago' }
  ]);
  const [currentSong, setCurrentSong] = useState({
    title: 'Calm Down',
    artist: 'Rema',
    albumCover: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228'
  });

  // Simulate listener count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setListeners(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    setIsConnected(true);
    alert('Connected to Spotify! Syncing playback...');
  };

  const handleOrderFood = () => {
    setHasOrdered(true);
    alert('Opening Taco Bell order menu...');
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { 
        user: 'You', 
        text: comment, 
        time: 'just now' 
      }]);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Room Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
            <FiUser size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Taco Tuesday Beats</h1>
            <p className="text-purple-300 flex items-center gap-1">
              <span>Hosted by</span>
              <span className="font-semibold">@FoodieDJ</span>
              <span className="ml-2 px-2 py-1 bg-pink-600 rounded-full text-xs">Sponsored by Selena Gomez</span>
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <FiUser className="text-purple-300" />
            <span>{listeners} listeners</span>
          </div>
          <div className="flex items-center gap-2">
            <FiHeart className="text-purple-300" />
            <span>{(likes / 1000).toFixed(1)}K likes</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMusic className="text-purple-300" />
            <span>{(plays / 1000).toFixed(1)}K plays</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full flex items-center gap-2 font-medium"
            >
              <FiMusic /> Connect to Spotify
            </button>
          ) : (
            <button
              onClick={handleOrderFood}
              disabled={hasOrdered}
              className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium ${
                hasOrdered 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              <FiShoppingCart /> 
              {hasOrdered ? 'Order placed!' : 'Order from Taco Bell'}
            </button>
          )}
        </div>

        {/* Now Playing */}
        <div className="bg-black bg-opacity-40 rounded-xl p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiMusic className="text-purple-400" /> Now Playing
          </h2>
          <div className="flex items-center gap-4">
            <img 
              src={currentSong.albumCover} 
              alt={currentSong.title} 
              className="w-16 h-16 rounded-lg"
            />
            <div>
              <h3 className="font-bold text-xl">{currentSong.title}</h3>
              <p className="text-purple-300">{currentSong.artist}</p>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiMessageSquare className="text-purple-400" /> Room Chat
          </h2>
          
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {comments.map((msg, i) => (
              <div key={i} className="bg-gray-800 bg-opacity-60 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-purple-300">{msg.user}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="mt-1">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 bg-gray-800 bg-opacity-70 border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleLike}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <FiHeart className="text-pink-500" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <FiShare2 />
              </button>
              <button
                type="button"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              >
                <FiShoppingCart />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
