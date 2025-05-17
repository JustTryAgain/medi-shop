import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, LogIn, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setSearchQuery('');
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                  onClick={onClose}
                >
                  <Home size={20} className="mr-3" />
                  {t.home}
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                  onClick={onClose}
                >
                  <ShoppingBag size={20} className="mr-3" />
                  {t.products}
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                  onClick={onClose}
                >
                  <Heart size={20} className="mr-3" />
                  {t.favorites}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                  onClick={onClose}
                >
                  <ShoppingBag size={20} className="mr-3" />
                  {t.cart}
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                    onClick={onClose}
                  >
                    <User size={20} className="mr-3" />
                    {t.profile}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                    onClick={onClose}
                  >
                    <LogIn size={20} className="mr-3" />
                    {t.login}
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <Link 
              to="/terms" 
              className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={onClose}
            >
              {t.termsAndPolicy}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;