// components/navigation/Navbar.jsx
import { useState } from 'react';
import TopNavbar from './TopNavbar';
import BottomNavbar from './BottomNavbar';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [user, setUser] = useState(null); // Replace or get from context

  return (
    <>
      <TopNavbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}
