// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninForm from './pages/SigninForm';
import Signup from './pages/Signup';
import CreateRoom from './pages/CreateRoom';
import FaajeeStart from './pages/faajee/FaajeeStart';
import RoomPage from './pages/RoomPage';
import EscrowFormPage from './pages/EscrowFormPage';
/* import CallbackPage from './pages/CallbackPage'; // for Spotify callback*/
import RoomPage1 from './pages/faajee/RoomPage1';
import SpotifyPlaylistManager from './pages/faajee/SpotifyPlaylistManager';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/escrow" element={<EscrowFormPage />} />
        <Route path="/signin" element={<SigninForm />} />   // Not signin.html!
        <Route path="/signup" element={<Signup />} /> // Not signup.html!
        <Route path="/room/start" element={<CreateRoom />} />
        <Route path="/music" element={<FaajeeStart />} /> // for testing type script 
        <Route path="/room" element={<RoomPage />} />
        <Route path="/try" element={<RoomPage1 />} />
        <Route path="/playlist" element={<SpotifyPlaylistManager />} />
      </Routes>
    </BrowserRouter>
  );
}
