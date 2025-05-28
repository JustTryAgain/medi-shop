import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4">

              <img alt="logo icon" src="/icons/MedPlusLogo.png" className="cursor-pointer w-12 h-12 rounded-full border-2 border-blue-600" />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {t.footerTagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.products}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.favorites}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.cart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.termsAndPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms#privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms#shipping" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.shippingPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms#returns" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  {t.returnsPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 text-gray-600 dark:text-gray-400 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">support@medplus.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 text-gray-600 dark:text-gray-400 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">+38 (096)-932-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MED+. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;