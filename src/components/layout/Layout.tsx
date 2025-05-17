import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;