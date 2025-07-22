// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninForm from './pages/SigninForm';
import SignupForm from './pages/SignupForm';
import CreateRoom from './pages/CreateRoom';
import FaajeeStart from './pages/faajee/FaajeeStart';
import RoomPage from './pages/RoomPage';
import EscrowFormPage from './pages/EscrowFormPage';
import CrewForm from './pages/CrewForm';
import LemDiscoveryPage from './pages/LemDiscoveryPage';
import StreamingDiscoveryPage from './pages/StreamingDiscoveryPage';
import CrowdfundingDiscoveryPage from './pages/projects/CrowdfundingDiscoveryPage';
import MomentumDiscoveryPage from './pages/projects/MomentumDiscoveryPage';
/* import CallbackPage from './pages/CallbackPage'; // for the Spotify callback*/
import RoomPage1 from './pages/faajee/RoomPage1';
import SpotifyPlaylistManager from './pages/faajee/SpotifyPlaylistManager';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/escrow" element={<EscrowFormPage />} />
        <Route path="/signin" element={<SigninForm />} />   // Not signin.html!
        <Route path="/signup" element={<SignupForm />} /> // Not signup.html!
        <Route path="/room/start" element={<CreateRoom />} />
        <Route path="/music" element={<FaajeeStart />} /> // for testing type script 
        <Route path="/room" element={<RoomPage />} />
        <Route path="/crew" element={<CrewForm />} />
        <Route path="/lem" element={<LemDiscoveryPage />} />
        <Route path="/party" element={<StreamingDiscoveryPage />} />
        <Route path="/projects" element={<CrowdfundingDiscoveryPage  />} />
        <Route path="/funding" element={<MomentumDiscoveryPage  />} />
        <Route path="/try" element={<RoomPage1 />} />
        <Route path="/playlist" element={<SpotifyPlaylistManager />} />
      </Routes>
    </BrowserRouter>
  );
}
