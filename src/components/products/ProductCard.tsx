import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { language } = useLanguage();
  const t = translations[language];

  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    setIsAdding(true);
    addToCart(product, 1);

    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleFavoriteToggle = (e: MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <div className="card card-hover h-full flex flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={favorite ? t.removeFromFavorites : t.addToFavorites}
          >
            <Heart
              size={18}
              className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Category */}
          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {displayPrice.toFixed(2)}₴
              </span>

              {product.discount && product.discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  {product.price.toFixed(2)}₴
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center mt-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Stock Indicator */}
              {product.stock > 0 ? (
                <span className="ml-auto text-xs font-medium text-green-600 dark:text-green-400">
                  {t.available}
                </span>
              ) : (
                <span className="ml-auto text-xs font-medium text-red-600 dark:text-red-400">
                  {t.outOfStock}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || isAdding}
              className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center transition-all ${
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
                  <Check size={18} className="mr-1"/>
                  {t.addToCart}
                </>
              ) : (
                <>
                  <ShoppingCart size={18} className="mr-1"/>
                  {t.addToCart}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;