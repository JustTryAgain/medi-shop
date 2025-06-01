import React, { createContext, useContext, useState, useEffect } from 'react';

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
}

interface OrderContextType {
  orders: Order[];
  addresses: Address[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: number) => void;
  updateAddress: (id: number, address: Partial<Address>) => void;
  getDefaultAddress: (type: string) => Address | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    const savedAddresses = localStorage.getItem('addresses');

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addressData,
      id: Date.now(),
    };
    setAddresses(prevAddresses => [...prevAddresses, newAddress]);
  };

  const removeAddress = (id: number) => {
    setAddresses(prevAddresses => prevAddresses.filter(addr => addr.id !== id));
  };

  const updateAddress = (id: number, addressData: Partial<Address>) => {
    setAddresses(prevAddresses =>
      prevAddresses.map(addr =>
        addr.id === id ? { ...addr, ...addressData } : addr
      )
    );
  };

  const getDefaultAddress = (type: string) => {
    return addresses.find(addr => addr.type === type && addr.isDefault);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addresses,
        addOrder,
        addAddress,
        removeAddress,
        updateAddress,
        getDefaultAddress,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}; 