

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
  export default function CrewRoom() {
  const comments = [
    {
      id: 1,
      user: 'cocoa22',
      avatar: '/avatars/cocoa.png',
      comment: 'SEE UU',
      timestamp: 'just now',
      badge: { icon: '🔥', count: 127 }
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
    },
    {
      id: 4,
      user: 'nxdine3000',
      avatar: '/avatars/nxdine.png',
      comment: 'what is the Status on the MV view count?',
      timestamp: 'just now',
      badge: { icon: '🔥', count: 38, extra: '💖' }
    }
  ];

  return (
    <div className="bg-blue-900 text-white p-4 space-y-3 max-w-md mx-auto h-screen overflow-y-auto">
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
                  {c.badge.extra && <span>{c.badge.extra}</span>}
                </span>
              )}
              <span className="text-xs text-gray-300 ml-1">{c.timestamp}</span>
            </div>
            <div className="text-sm">{c.comment}</div>
          </div>
        </div>
      ))}

      {/* New Comments Pill */}
      <div className="flex justify-center pt-4">
        <button className="bg-white text-black text-sm px-4 py-1 rounded-full shadow">
          ⬇️ New Comments
        </button>
      </div>
    </div>
  );
}
