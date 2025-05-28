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
              {t.TermsOfService}
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4"> {t.TermsOfService}</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. {t.Introduction}</h3>
                  <p>{t.IntroductionText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. {t.Definitions}</h3>
                  <p>{t.DefinitionsText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. {t.AccountRegistration}</h3>
                  <p>{t.AccountRegistrationText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. {t.PurchasesAndPayments}</h3>
                  <p>{t.PurchasesAndPaymentsText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. {t.PrescriptionMedications}</h3>
                  <p>{t.PrescriptionMedicationsText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">6. {t.IntellectualProperty}</h3>
                  <p>{t.IntellectualPropertyText}</p>
                </div>
              </div>
            )}
            
            {/* Privacy Policy */}
            {activeTab === 'privacy' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.privacyPolicy}</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1.{t.InformationWeCollect}</h3>
                  <p>{t.InformationWeCollectText}</p>

                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. {t.HowWeUseYourInformation}</h3>
                  <p>{t.HowWeUseYourInformationText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. {t.DisclosureOfYourInformation}</h3>
                  <p>{t.HowWeUseYourInformationText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. {t.DataSecurity}y</h3>
                  <p>{t.DataSecurityText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. {t.YourRights}</h3>
                  <p>{t.YourRightsText}</p>
                </div>
              </div>
            )}
            
            {/* Shipping Policy */}
            {activeTab === 'shipping' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.shippingPolicy}</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. {t.shippingMethod}</h3>
                  <p>{t.shippingMethodText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. {t.shippingCosts}</h3>
                  <p>{t.shippingCostsText}</p>

                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. {t.orderProcessing}</h3>
                  <p>{t.orderProcessingText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. {t.internationalShipping}</h3>
                  <p>{t.internationalShippingText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. {t.deliveryIssues}</h3>
                  <p>{t.deliveryIssuesText}</p>
                </div>
              </div>
            )}
            
            {/* Returns Policy */}
            {activeTab === 'returns' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.returnsPolicy}</h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">1. {t.returnEligibility}</h3>
                  <p>2. {t.returnEligibilityText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">2. {t.returnProcess}</h3>
                  <p>{t.returnProcessText}.</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">3. {t.refunds}</h3>
                  <p>{t.refundsText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">4. {t.damagedItems}</h3>
                  <p>{t.damagedItemsText}</p>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">5. {t.exchanges}</h3>
                  <p>{t.exchangesText}</p>
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