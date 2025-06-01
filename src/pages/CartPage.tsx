import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login page with a redirect back to checkout
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  const handleApplyCoupon = () => {
    // Simple coupon code logic
    if (couponCode.toUpperCase() === 'FIRST10') {
      setCouponApplied(true);
      setCouponDiscount(getCartTotal() * 0.1); // 10% discount
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
    }
  };

  // Calculate order summary values
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - couponDiscount;

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-500">
              <ShoppingBag size={96} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.emptyCart}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{t.emptyCartMessage}</p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.continueShopping}
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">{t.cart}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => {
                    const itemPrice = item.discount 
                      ? item.price * (1 - item.discount / 100) 
                      : item.price;
                    
                    return (
                      <li key={item.id} className="py-6 first:pt-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="sm:ml-6 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  <Link to={`/products/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {item.category}
                                </p>
                              </div>
                              <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {(itemPrice * item.quantity).toFixed(2)} UAH
                              </p>
                            </div>
                            
                            <div className="mt-4 flex items-center justify-between">
                              {/* Quantity Control */}
                              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="px-4 py-1 text-gray-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock}
                                  className={`p-2 ${
                                    item.quantity >= item.stock 
                                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                  }`}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              
                              {/* Remove Button */}
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <Link 
                  to="/products" 
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {t.continueShopping}
                </Link>
                <button 
                  onClick={() => clearCart()}
                  className="text-red-600 dark:text-red-400 font-medium hover:underline"
                >
                  {t.clearCart}
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.orderSummary}</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.subtotal}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{subtotal.toFixed(2)} UAH</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.shipping}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {shipping === 0 ? 'Безкоштовно' : `${shipping.toFixed(2)} UAH`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.tax}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{tax.toFixed(2)} UAH</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount (FIRST10)</span>
                      <span>-{couponDiscount.toFixed(2)} UAH</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{t.total}</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{total.toFixed(2)} UAH</span>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mt-6 space-y-2">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.applyCouponCode}
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    <input 
                      type="text" 
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t.enterCode}
                      className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                      {t.apply}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-sm text-green-600 dark:text-green-400">Coupon applied successfully!</p>
                  )}
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  {t.checkout}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;