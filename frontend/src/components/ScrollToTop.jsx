// components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get the current location object from React Router, which includes the pathname
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // This effect depends on the `pathname`

  return null; // This component doesn't render anything visible
};

export default ScrollToTop;
