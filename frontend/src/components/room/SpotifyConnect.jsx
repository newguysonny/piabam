import { useEffect } from 'react';

export default function SpotifyConnect({ isHost, onConnectSuccess }) {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const error = params.get('error');

    if (error) {
      console.error('Spotify auth error:', params.toString());
      return;
    }

    if (token) {
      onConnectSuccess(token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onConnectSuccess]);

  const handleConnect = () => {
    const clientId = '618a08287c804a5398da8f3e2b6a95ea'; // Replace with your actual client ID
    const redirectUri = 'https://piabam.vercel.app/callback'; // Must match EXACTLY
    
    const scopes = [
      'streaming',
      'user-read-email',
      ...(isHost ? ['user-modify-playback-state'] : [])
    ].join(' ');

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('scope', scopes);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('show_dialog', 'true');

    console.log('Redirecting to:', authUrl.toString()); // Debug the exact URL
    window.location = authUrl.toString();
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium"
    >
      Connect Spotify
    </button>
  );
}

/*
export default function SpotifyConnect({ isHost, onConnectSuccess }) {
  const handleConnect = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
   
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    
    const scopes = [
      'streaming',
      'user-read-email',
      ...(isHost ? ['user-modify-playback-state'] : [])
    ].join(' ');

    window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirectUri}&show_dialog=true`;
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        Connect Spotify {isHost ? '(Host Mode)' : ''}
      </button>
      <p className="mt-2 text-sm text-gray-500">
        {isHost ? 'Requires playback control permissions' : 'Needs basic streaming access'}
      </p>
    </div>
  );
}
*/
/*

export default function SpotifyConnect({ isHost, onConnectSuccess }) {
  const handleConnect = () => {
    // Simulate Spotify connection (replace with real OAuth)
    const fakeToken = 'spotify_fake_token_123';
    onConnectSuccess(fakeToken);
  };

  return (
    <button onClick={handleConnect}>
      Connect Spotify to Join Room
    </button>
  );
}
*/
