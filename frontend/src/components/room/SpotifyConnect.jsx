/*

export default function SpotifyConnect({ isHost, onConnectSuccess }) {
  const handleConnect = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent(window.location.href);
    
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
