// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateRoom from './pages/CreateRoom';
import FaajeeStart from './pages/faajee/FaajeeStart';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />   // Not login.html!
        <Route path="/signup" element={<Signup />} /> // Not signup.html!
        <Route path="/room/start" element={<CreateRoom />} />
        <Route path="/music" element={<FaajeeStart />} />
      </Routes>
    </BrowserRouter>
  );
}
