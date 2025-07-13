import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjView from '../components/room/DjView';
import ListenerView from '../components/room/ListenerView';
import SpotifyConnect from '../components/room/SpotifyConnect';

export default function RoomPage() {
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

  // Handle Spotify auth callback from backend
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setAuthError(`Spotify auth error: ${error}`);
        return;
      }

      if (code) {
        try {
          // Exchange code for token via backend
          const response = await fetch(`/api/auth/callback?code=${encodeURIComponent(code)}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get token');
          }
          
          const data = await response.json();
          
          // Receive token from backend
          setSpotifyToken(data.access_token);
          
          // Clean URL
          window.history.replaceState({}, '', window.location.pathname);
        } catch (err) {
          console.error('Token exchange failed:', err);
          setAuthError(err.message);
        }
      }
    };

    handleCallback();
  }, []);

  const handleAuthComplete = (token, error) => {
    if (error) {
      setAuthError(error);
    } else {
      setSpotifyToken(token);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!spotifyToken ? (
        <div className="p-4">
          {/* Show header only during auth phase */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h1 className="text-xl font-bold">Room: {roomId}</h1>
            <p className="text-gray-600">
              {isHost ? 'You are the host' : 'You are a listener'}
            </p>
          </div>

          {authError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {authError}
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <SpotifyConnect 
              isHost={isHost} 
              onAuthComplete={handleAuthComplete} 
            />
          </div>
        </div>
      ) : isHost ? (
        <DjView spotifyToken={spotifyToken} />
      ) : (
        <ListenerView spotifyToken={spotifyToken} />
      )}
    </div>
  );
}




/*
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjView from '../components/room/DjView';
import ListenerView from '../components/room/ListenerView';
import SpotifyConnect from '../components/room/SpotifyConnect';

export default function RoomPage() {
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

  // Handle Spotify auth callback from backend
   useEffect(() => {
  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Spotify auth error:', error);
      return;
    }

    if (code) {
      try {
        // Exchange code for token via backend
        const response = await fetch(`/api/auth/callback?code=${encodeURIComponent(code)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Receive token from backend
        onAuthComplete(data.access_token);
        
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      } catch (err) {
        console.error('Token exchange failed:', err);
      }
    }
  };

  handleCallback();
}, [onAuthComplete]);

  return (
    <div className="min-h-screen bg-gray-100">
      {!spotifyToken ? (
        <div className="p-4">
          {// Show header only during auth phase }
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h1 className="text-xl font-bold">Room: {roomId}</h1>
            <p className="text-gray-600">
              {isHost ? 'You are the host' : 'You are a listener'}
            </p>
          </div>

          {authError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {authError}
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <SpotifyConnect 
              isHost={isHost} 
              onConnectSuccess={setSpotifyToken} 
            />
          </div>
        </div>
      ) : isHost ? (
        <DjView spotifyToken={spotifyToken} />
      ) : (
        <ListenerView spotifyToken={spotifyToken} />
      )}
    </div>
  );
}
*/
