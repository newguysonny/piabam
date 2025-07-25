import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjView from '.../components/room/DjView';
import ListenerView from '.../components/room/ListenerView';
import SpotifyConnect from '.../components/room/SpotifyConnect';

export default function RoomPage2() {
  const { roomId } = useParams();
  
  // Mock data - replace with real API calls
  const [room, setRoom] = useState({ 
    id: roomId, 
    host_id: 'dj456',  // From database
    is_live: true 
  });
  const currentUserId = 'user123'; // From auth context
  
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Check if current user is the host
  const isHost = currentUserId === room.host_id;

  // Handle Spotify auth callback from URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const error = params.get('error');

    if (error) {
      setAuthError(`Spotify connection failed: ${error}`);
      return;
    }

    if (token) {
      setSpotifyToken(token);
      // Clean URL after getting token
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Room Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h1 className="text-xl font-bold">Room: {roomId}</h1>
        <p className="text-gray-600">
          {isHost ? 'You are the host' : 'You are a listener'}
        </p>
      </div>

      {/* Auth Status */}
      {authError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {authError}
        </div>
      )}

      {/* Main Content */}
      {!spotifyToken ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <SpotifyConnect 
            isHost={isHost} 
            onConnectSuccess={setSpotifyToken} 
          />
        </div>
      ) : isHost ? (
        <DjView spotifyToken={spotifyToken} />
      ) : (
        <ListenerView spotifyToken={spotifyToken} />
      )}
    </div>
  );
}
