import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';

const TermsPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t.termsAndPolicy}
        </h1>
        
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('terms')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'terms'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'privacy'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              id="privacy"
            >
              {t.privacyPolicy}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'shipping'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              id="shipping"
            >
              {t.shippingPolicy}
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`py-4 px-6 font-medium ${
                activeTab === 'returns'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              id="returns"
            >
              {t.returnsPolicy}
            </button>
          </div>
          
          <div className="p-6">
            {/* Terms of Service */}
            {activeTab === 'terms' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Terms of Service</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. Introduction</h3>
                  <p>Welcome to MediShop. These Terms of Service govern your use of our website and services. By accessing or using MediShop, you agree to be bound by these Terms.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. Definitions</h3>
                  <p>"Service" refers to the MediShop website operated by our company. "User" refers to individuals who access or use the Service. "Products" refers to pharmaceutical and healthcare items available for purchase through the Service.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. Account Registration</h3>
                  <p>To access certain features of the Service, you may be required to register for an account. You must provide accurate and complete information and keep your account information updated. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. Purchases and Payments</h3>
                  <p>All purchases made through the Service are subject to our acceptance. We reserve the right to refuse or cancel any orders placed for Products listed at an incorrect price or containing any other incorrect information or error. Payment must be made using the methods specified on the Service. Prices for Products are subject to change without notice.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. Prescription Medications</h3>
                  <p>Some Products sold through the Service require a valid prescription from a licensed healthcare provider. By placing an order for a prescription medication, you represent and warrant that you have a valid prescription for that medication. We reserve the right to verify prescriptions and to refuse to fill any prescription that we determine, in our sole discretion, may not be valid or appropriate.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">6. Intellectual Property</h3>
                  <p>The Service and its original content, features, and functionality are and will remain the exclusive property of MediShop and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws.</p>
                </div>
              </div>
            )}
            
            {/* Privacy Policy */}
            {activeTab === 'privacy' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy Policy</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. Information We Collect</h3>
                  <p>We collect several types of information from and about users of our Service, including personal information such as name, postal address, email address, telephone number, date of birth, payment information, and prescription information. We also collect non-personal information such as browser type, IP address, device information, and browsing patterns.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. How We Use Your Information</h3>
                  <p>We use information that we collect about you or that you provide to us to present our Service and its contents to you, provide you with information, products, or services that you request from us, fulfill any other purpose for which you provide it, carry out our obligations and enforce our rights, and for any other purpose with your consent.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. Disclosure of Your Information</h3>
                  <p>We may disclose personal information that we collect or you provide as described in this privacy policy to our subsidiaries and affiliates, to contractors, service providers, and other third parties we use to support our business, to a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. Data Security</h3>
                  <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. Your Rights</h3>
                  <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict processing of your personal information, as well as the right to data portability and the right to object to processing.</p>
                </div>
              </div>
            )}
            
            {/* Shipping Policy */}
            {activeTab === 'shipping' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Policy</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. Shipping Methods and Timeframes</h3>
                  <p>We offer several shipping options for your convenience. Standard shipping typically takes 3-5 business days. Expedited shipping is available for an additional fee and typically takes 1-2 business days. Next-day shipping is available for orders placed before 2:00 PM Eastern Time, Monday through Friday, excluding holidays.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. Shipping Costs</h3>
                  <p>Shipping costs are calculated based on the weight of your order, the shipping method you select, and your delivery address. Shipping costs will be displayed during checkout before you complete your order. Orders over $50 qualify for free standard shipping.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. Order Processing</h3>
                  <p>Orders are processed and shipped Monday through Friday, excluding holidays. Orders placed after 2:00 PM Eastern Time may be processed the following business day. Once your order has been shipped, you will receive a shipping confirmation email with tracking information.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. International Shipping</h3>
                  <p>We currently ship only within the United States. International shipping is not available at this time.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. Delivery Issues</h3>
                  <p>If there are any issues with your delivery, such as damaged or missing items, please contact our customer service team within 48 hours of receiving your order. We will work with you to resolve any issues as quickly as possible.</p>
                </div>
              </div>
            )}
            
            {/* Returns Policy */}
            {activeTab === 'returns' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Returns Policy</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. Return Eligibility</h3>
                  <p>We accept returns within 30 days of delivery for most products in new, unused condition with original packaging and receipt. Prescription medications, personal care items, and certain other products cannot be returned for health and safety reasons.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. Return Process</h3>
                  <p>To initiate a return, please contact our customer service team to obtain a Return Authorization (RA) number. Returns without an RA number may be refused. Include your RA number, receipt, and a brief explanation for the return with your return shipment. Return shipping costs are the responsibility of the customer unless the return is due to our error.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. Refunds</h3>
                  <p>Refunds will be issued to the original payment method used for the purchase. Refunds typically take 5-10 business days to process after we receive your return. Shipping charges are non-refundable unless the return is due to our error.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. Damaged or Defective Items</h3>
                  <p>If you receive a damaged or defective item, please contact our customer service team within 48 hours of delivery. We will provide instructions for returning the item and will cover the cost of return shipping. We will replace the item or issue a refund at our discretion.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. Exchanges</h3>
                  <p>We do not offer direct exchanges. If you wish to exchange an item, please return the original item for a refund and place a new order for the desired item.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;