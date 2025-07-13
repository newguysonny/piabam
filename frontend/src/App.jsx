// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateRoom from './pages/CreateRoom';
import FaajeeStart from './pages/faajee/FaajeeStart';
import RoomPage from './pages/RoomPage';
import RoomPage2 from './pages/faajee/RoomPage2';
import SpotifyPlaylistManager from './pages/faajee/SpotifyPlaylistManager';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />   // Not login.html!
        <Route path="/signup" element={<Signup />} /> // Not signup.html!
        <Route path="/room/start" element={<CreateRoom />} />
        <Route path="/music" element={<FaajeeStart />} /> // for testing type script 
        <Route path="/room" element={<RoomPage />} />
        <Route path="/try" element={<RoomPage2 />} />
        <Route path="/playlist" element={<SpotifyPlaylistManager />} />
      </Routes>
    </BrowserRouter>
  );
}
