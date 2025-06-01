import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites();
  const { language } = useLanguage();
  const t = translations[language];

  if (favorites.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-500">
              <Heart size={96} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.emptyFavorites}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{t.emptyFavoritesMessage}</p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.browseProducts}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{t.favorites}</h1>
          {favorites.length > 0 && (
            <button 
              onClick={clearFavorites}
              className="text-red-600 dark:text-red-400 font-medium hover:underline"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;