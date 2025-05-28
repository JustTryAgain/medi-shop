import { useState } from 'react';
import { LogOut, User, MapPin, ShoppingBag, Heart, Edit, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-1234',
      date: '2024-04-10',
      status: 'Delivered',
      total: 75.99,
      items: 3
    },
    {
      id: 'ORD-5678',
      date: '2024-03-25',
      status: 'Processing',
      total: 145.50,
      items: 5
    }
  ];

  // Mock address data
  const addresses = [
    {
      id: 1,
      type: 'Shipping',
      name: user?.name,
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+38 (096)-932-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'Billing',
      name: user?.name,
      address: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'United States',
      phone: '+38 (096)-932-4567',
      isDefault: true
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* User Info */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center px-4 py-3 rounded-md ${
                        activeTab === 'profile'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <User size={18} className="mr-3" />
                      {t.profileInformation}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-3 rounded-md ${
                        activeTab === 'orders'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ShoppingBag size={18} className="mr-3" />
                      {t.myOrders}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('addresses')}
                      className={`w-full flex items-center px-4 py-3 rounded-md ${
                        activeTab === 'addresses'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <MapPin size={18} className="mr-3" />
                      {t.myAddress}
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/favorites"
                      className="w-full flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Heart size={18} className="mr-3" />
                      {t.myFavorite}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      <LogOut size={18} className="mr-3" />
                      {t.logOut}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t.profileInformation}
                    </h2>
                    <button className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <Edit size={16} className="mr-1" />
                      {t.editProfile}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {t.fullName}
                      </label>
                      <p className="text-gray-900 dark:text-white">{user?.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {t.email}
                      </label>
                      <p className="text-gray-900 dark:text-white">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t.security}
                      </h3>
                      <button className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                        <Key size={16} className="mr-1" />
                        {t.changePass}
                      </button>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {t.changeLastPass}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Orders */}
              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {t.myOrders}
                  </h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">You haven't placed any orders yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              {t.orderId}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              {t.orderDate}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              {t.orderStatus}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              {t.totalI}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              {t.items}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              {t.action}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                {new Date(order.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                                {order.items} {order.items === 1 ? 'item' : 'items'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="text-blue-600 dark:text-blue-400 hover:underline">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses */}
              {activeTab === 'addresses' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      My Addresses
                    </h2>
                    <button className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <Edit size={16} className="mr-1" />
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(address => (
                      <div 
                        key={address.id} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs font-medium text-blue-700 dark:text-blue-300">
                            Default {address.type}
                          </span>
                        )}
                        
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {address.type} Address
                        </h3>
                        
                        <div className="text-gray-600 dark:text-gray-300 space-y-1">
                          <p>{address.name}</p>
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                          <p>{address.phone}</p>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                            Edit
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:underline text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;