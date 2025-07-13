// pages/CallbackPage.jsx
   import { useEffect } from 'react';
   import { useNavigate } from 'react-router-dom';

   export default function CallbackPage() {
     const navigate = useNavigate();

     useEffect(() => {
       // This will be caught by SpotifyConnect's useEffect
       navigate('/room'); // Redirect back to your room
     }, [navigate]);

     return <div>Processing Spotify login...</div>;
   }
