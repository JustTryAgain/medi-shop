import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, User, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import translations from '../../data/translations';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md dark:bg-gray-800 dark:shadow-gray-700/30' 
          : 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mr-2 text-center">
              <img alt="logo icon" src="/icons/MedPlusLogo.png" className="cursor-pointer w-12 h-12 rounded-full border-2 border-blue-600" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="nav-link">
              {t.products}
            </Link>
            <Link to="/terms" className="nav-link">
              {t.termsAndPolicy}
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md flex-1 mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="icon-button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Language Toggle */}
            <div className="relative group">
              <button className="icon-button" aria-label="Change language">
                <Globe size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('ua')}
                  className={`block w-full text-left px-4 py-2 text-sm ${language === 'ua' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Українська
                </button>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="icon-button relative">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Favorites */}
            <Link to="/favorites" className="icon-button hidden md:flex">
              <Heart size={20} />
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <Link to="/profile" className="icon-button hidden md:flex">
                <User size={20} />
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="hidden md:block px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                {t.login}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)} 
              className="md:hidden icon-button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;