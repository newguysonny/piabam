import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import App from './App'; // Note the curly braces
import './App.css';
import "leaflet/dist/leaflet.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
