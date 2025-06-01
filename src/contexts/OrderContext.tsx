import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Address {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  savedAddresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (address: Address) => void;
  clearAddresses: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
      return [];
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const addresses = localStorage.getItem('savedAddresses');
      return addresses ? JSON.parse(addresses) : [];
    } catch (error) {
      console.error('Error loading addresses from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
    } catch (error) {
      console.error('Error saving addresses to localStorage:', error);
    }
  }, [savedAddresses]);

  const addOrder = (order: Order) => {
    try {
      setOrders(prevOrders => [...prevOrders, order]);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const getOrder = (id: string) => {
    try {
      return orders.find(order => order.id === id);
    } catch (error) {
      console.error('Error getting order:', error);
      return undefined;
    }
  };

  const addAddress = (address: Address) => {
    try {
      setSavedAddresses(prevAddresses => {
        const exists = prevAddresses.some(
          addr => addr.address === address.address && 
                 addr.city === address.city && 
                 addr.zipCode === address.zipCode
        );
        return exists ? prevAddresses : [...prevAddresses, address];
      });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const removeAddress = (address: Address) => {
    try {
      setSavedAddresses(prevAddresses =>
        prevAddresses.filter(
          addr => !(addr.address === address.address && 
                   addr.city === address.city && 
                   addr.zipCode === address.zipCode)
        )
      );
    } catch (error) {
      console.error('Error removing address:', error);
    }
  };

  const clearAddresses = () => {
    try {
      setSavedAddresses([]);
      localStorage.removeItem('savedAddresses');
    } catch (error) {
      console.error('Error clearing addresses:', error);
    }
  };

  const value = {
    orders,
    addOrder,
    getOrder,
    savedAddresses,
    addAddress,
    removeAddress,
    clearAddresses
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};