import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import products, { Product } from '../data/products';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';
  const initialCategory = queryParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  // Extract all categories from products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter and sort products when dependencies change
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.description.toLowerCase().includes(query) ||
             p.category.toLowerCase().includes(query) ||
             p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // Filter by price range
    result = result.filter(p => {
      const price = p.discount 
        ? p.price * (1 - p.discount / 100) 
        : p.price;
      return price >= priceRange.min && price <= priceRange.max;
    });
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        // In a real app, you would sort by date
        // Here we're just randomizing
        result.sort(() => Math.random() - 0.5);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, activeCategory, sortOption, priceRange]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (activeCategory && activeCategory !== 'All') params.set('category', activeCategory);
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [searchQuery, activeCategory, location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the effect
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSortOption('popular');
    setPriceRange({ min: 0, max: 100 });
  };

  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {activeCategory && activeCategory !== 'All' 
              ? activeCategory 
              : searchQuery 
                ? `Search: "${searchQuery}"` 
                : t.products}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full flex items-center justify-center py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-300"
          >
            <Filter size={18} className="mr-2" />
            Filter Products
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Search
                </h3>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.categories}
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        activeCategory === category
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Price Range
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange.min.toFixed(2)}</span>
                    <span>${priceRange.max.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden ${
              mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div 
              className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white dark:bg-gray-800 p-4 shadow-xl transition-transform transform ${
                mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filters
                </h3>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Search
                </h3>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Mobile Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {t.categories}
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setMobileFiltersOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        activeCategory === category
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Price Range
                </h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange.min.toFixed(2)}</span>
                    <span>${priceRange.max.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors mb-3"
              >
                Apply Filters
              </button>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  clearFilters();
                  setMobileFiltersOpen(false);
                }}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="flex-grow">
            {/* Sort Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 flex flex-wrap justify-between items-center">
              <div className="mb-2 sm:mb-0">
                <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="py-1 px-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
              </span>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;