import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import getProducts, { Product } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { language } = useLanguage();
  const t = translations[language];
  const products = getProducts(t);

  // Fetch product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Reset quantity when product changes
      setQuantity(1);
    } else {
      // Product not found, redirect to products page
      navigate('/products');
    }
  }, [id, navigate]);

  // Get related products
  useEffect(() => {
    if (product) {
      const related = products
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);

  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      addToCart(product, quantity);

      // Reset button state after animation
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };

  const handleFavoriteToggle = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const favorite = isFavorite(product.id);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Back Link */}
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft size={16} className="mr-1"/>
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-8">
              <div className="mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {displayPrice.toFixed(2)}₴
                  </span>

                  {product.discount && (
                    <span className="ml-3 text-lg text-gray-500 dark:text-gray-400 line-through">
                      {product.price.toFixed(2)}₴
                    </span>
                  )}
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center mb-6">
                <span className="mr-2 text-gray-700 dark:text-gray-300">{t.quantity}:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600 dark:text-green-400">
                    {t.available}: {product.stock}
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">
                    {t.outOfStock}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center mb-6">
                  <span className="mr-3 text-gray-700 dark:text-gray-300">{t.quantity}:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="py-1 px-3 text-gray-600 dark:text-gray-400 disabled:opacity-50"
                    >
                      <Minus size={16}/>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-x border-gray-300 dark:border-gray-600 py-1 bg-transparent text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="py-1 px-3 text-gray-600 dark:text-gray-400 disabled:opacity-50"
                    >
                      <Plus size={16}/>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0 || isAdding}
                  className={`flex-1 py-3 px-4 rounded-md font-medium flex items-center justify-center transition-all ${
                    product.stock <= 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                      : isAdding
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {product.stock <= 0 ? (
                    t.outOfStock
                  ) : isAdding ? (
                    <>
                      <Check size={20} className="mr-2"/>
                      {t.addToCart}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2"/>
                      {t.addToCart}
                    </>
                  )}
                </button>

                <button
                  onClick={handleFavoriteToggle}
                  className={`px-4 py-3 rounded-md font-medium flex items-center justify-center border ${
                    favorite
                      ? 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  aria-label={favorite ? t.removeFromFavorites : t.addToFavorites}
                >
                  <Heart
                    size={20}
                    className={favorite ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-2 px-4 font-medium ${
                      activeTab === 'description'
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {t.description}
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-4 font-medium ${
                      activeTab === 'details'
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Details
                  </button>
                </div>

                {activeTab === 'description' && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-3">
                    {product.dosage && (
                      <div className="flex">
                        <span className="w-1/3 text-gray-600 dark:text-gray-400 font-medium">Dosage:</span>
                        <span className="w-2/3 text-gray-800 dark:text-gray-200">{product.dosage}</span>
                      </div>
                    )}
                    <div className="flex">
                      <span className="w-1/3 text-gray-600 dark:text-gray-400 font-medium">Manufacturer:</span>
                      <span className="w-2/3 text-gray-800 dark:text-gray-200">{product.manufacturer}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-600 dark:text-gray-400 font-medium">Prescription:</span>
                      <span
                        className="w-2/3 text-gray-800 dark:text-gray-200">{product.isRx ? 'Required' : 'Not Required'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-600 dark:text-gray-400 font-medium">Tags:</span>
                      <div className="w-2/3 flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t.relatedProducts}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;