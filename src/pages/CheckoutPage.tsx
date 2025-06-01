import { useState } from 'react';
import { Link, } from 'react-router-dom';
import { CreditCard, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const { language } = useLanguage();
  const t = translations[language];
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [shippingForm, setShippingForm] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    sameAsBilling: true
  });
  
  const [billingForm, setBillingForm] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: user?.name || '',
    expiryDate: '',
    cvv: ''
  });
  
  // Calculate order summary values
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // If same as billing is checked, update billing as well
    if (shippingForm.sameAsBilling && name !== 'sameAsBilling' && name !== 'phone') {
      setBillingForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleShippingCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setShippingForm(prev => ({ ...prev, sameAsBilling: checked }));
    
    // If checked, update billing info to match shipping
    if (checked) {
      const { phone, sameAsBilling, ...shippingData } = shippingForm;
      setBillingForm(shippingData);
    }
  };
  
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
    }, 2000);
  };
  
  if (orderComplete) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.orderConfirmation}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t.thankYou}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-400">{t.orderNumber}:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{orderNumber}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-400">{t.orderDate}:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-400">{t.orderStatus}:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Processing</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-400">{t.paymentMethod}:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t.total}:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{total.toFixed(2)} UAH</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We've sent a confirmation email to {user?.email}. You can track your order in your account.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <Link 
                  to="/profile" 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Order
                </Link>
                
                <Link 
                  to="/" 
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mr-4">
            <ArrowLeft size={16} className="mr-1" />
            {t.back}
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t.checkout}
          </h1>
        </div>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              1
            </div>
            <div className={`flex-grow h-1 mx-2 ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>
              {t.shippingInformation}
            </span>
            <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>
              {t.paymentInformation}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <form onSubmit={handleContinueToPayment}>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      {t.shippingInformation}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t.fullName}*
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={shippingForm.fullName}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Street Address*
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={shippingForm.address}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingForm.city}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          State/Province*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingForm.state}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          ZIP/Postal Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shippingForm.zipCode}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Country*
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={shippingForm.country}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        >
                          <option value="Ukraine">Україна</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingForm.phone}
                          onChange={handleShippingChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sameAsBilling"
                            name="sameAsBilling"
                            checked={shippingForm.sameAsBilling}
                            onChange={handleShippingCheckboxChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="sameAsBilling" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Billing address same as shipping
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {!shippingForm.sameAsBilling && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-6">
                          {t.billingAddress}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label htmlFor="billingFullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {t.fullName}*
                            </label>
                            <input
                              type="text"
                              id="billingFullName"
                              name="fullName"
                              value={billingForm.fullName}
                              onChange={handleBillingChange}
                              required
                              className="input-field"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Street Address*
                            </label>
                            <input
                              type="text"
                              id="billingAddress"
                              name="address"
                              value={billingForm.address}
                              onChange={handleBillingChange}
                              required
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              City*
                            </label>
                            <input
                              type="text"
                              id="billingCity"
                              name="city"
                              value={billingForm.city}
                              onChange={handleBillingChange}
                              required
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              State/Province*
                            </label>
                            <input
                              type="text"
                              id="billingState"
                              name="state"
                              value={billingForm.state}
                              onChange={handleBillingChange}
                              required
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="billingZipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              ZIP/Postal Code*
                            </label>
                            <input
                              type="text"
                              id="billingZipCode"
                              name="zipCode"
                              value={billingForm.zipCode}
                              onChange={handleBillingChange}
                              required
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Country*
                            </label>
                            <select
                              id="billingCountry"
                              name="country"
                              value={billingForm.country}
                              onChange={handleBillingChange}
                              required
                              className="input-field"
                            >
                              <option value="Ukraine">Україна</option>
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Australia">Australia</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {t.continueToPay}
                    </button>
                  </div>
                </form>
              )}
              
              {/* Step 2: Payment Information */}
              {step === 2 && (
                <form onSubmit={handlePlaceOrder}>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      {t.paymentInformation}
                    </h2>
                    
                    <div className="mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="credit-card"
                            name="payment-method"
                            value="credit-card"
                            checked={paymentMethod === 'credit-card'}
                            onChange={() => setPaymentMethod('credit-card')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="credit-card" className="ml-2 text-gray-700 dark:text-gray-300">
                            Credit/Debit Card
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="paypal"
                            name="payment-method"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="paypal" className="ml-2 text-gray-700 dark:text-gray-300">
                            PayPal
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'credit-card' && (
                      <div>
                        <div className="mb-6">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Card Number*
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentForm.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="0000 0000 0000 0000"
                              required
                              className="input-field pl-10"
                              maxLength={19}
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Cardholder Name*
                          </label>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={paymentForm.cardHolder}
                            onChange={handlePaymentChange}
                            required
                            className="input-field"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Expiry Date (MM/YY)*
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={paymentForm.expiryDate}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              required
                              className="input-field"
                              maxLength={5}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              CVV*
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={paymentForm.cvv}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              required
                              className="input-field"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300">
                          You will be redirected to PayPal to complete your payment after you place your order.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {t.back}
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : t.placeOrder}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.orderSummary}</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cart.map(item => {
                    const itemPrice = item.discount 
                      ? item.price * (1 - item.discount / 100) 
                      : item.price;
                    
                    return (
                      <div key={item.id} className="flex">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {(itemPrice * item.quantity).toFixed(2)} UAH
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Summary */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.subtotal}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{subtotal.toFixed(2)} UAH</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.shipping}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {shipping === 0 ? 'Free' : `${shipping.toFixed(2)} UAH`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.tax}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{tax.toFixed(2)} UAH</span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{t.total}</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{total.toFixed(2)} UAH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;