import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            <Home className="mr-2" size={18} />
            Go to Homepage
          </Link>
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;