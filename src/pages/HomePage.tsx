import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import products from '../data/products';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useLanguage();
  const t = translations[language];
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  // Get featured products (with discount)
  useEffect(() => {
    const featured = products
      .filter(product => product.discount)
      .slice(0, 4);
      
    setFeaturedProducts(featured);
  }, []);

  // Get popular products (highest rated)
  useEffect(() => {
    const popular = products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
      
    setPopularProducts(popular);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Group products by category
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t.welcome}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              {t.footerTagline}
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full py-3 px-5 pr-12 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-white text-gray-800 text-lg"
              />
              <button 
                type="submit" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t.featured}
            </h2>
            <Link 
              to="/products" 
              className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {t.shopNow}
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <div className="mb-6 md:mb-0 md:mr-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t.discountBanner}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Subscribe to our newsletter for exclusive offers and health tips.
              </p>
              <form className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  {t.subscribe}
                </button>
              </form>
            </div>
            <img 
              src="https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Offer" 
              className="w-full md:w-56 h-40 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t.popularProducts}
            </h2>
            <Link 
              to="/products" 
              className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {t.shopNow}
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {t.categories}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link 
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category}
                </h3>
                <ArrowRight size={20} className="text-blue-600 dark:text-blue-400 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;