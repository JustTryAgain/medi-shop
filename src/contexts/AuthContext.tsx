import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// WARNING: For demo purposes only.
// Do NOT store plain passwords or sensitive data in localStorage in production.

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  isCurrent: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial auth check on mount only
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        const parsedUsers: User[] = JSON.parse(storedUsers);
        const currentUser = parsedUsers.find((user: User) => user.isCurrent);
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('users');
        console.error(e);
      }
    }
  }, []); // Intentionally empty dependency array

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUsers = localStorage.getItem('users');
        const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const loginUser = parsedUsers.find(
          (user: User) => user.email === email && user.password === password
        );

        if (loginUser) {
          const updatedUsers = parsedUsers.map(u => ({
            ...u,
            isCurrent: u.email === loginUser.email
          }));
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          setUser(loginUser);
          setIsAuthenticated(true);
          resolve(true);
        } else {
          setError('Invalid email or password');
          resolve(false);
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUsers = localStorage.getItem('users');
        const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const existingUser = parsedUsers.find(u => u.email === email);
        if (existingUser) {
          setError('Email already in use');
          resolve(false);
          return;
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          name,
          email,
          avatar: undefined,
          password,
          isCurrent: true
        };

        const updatedUsers = [
          ...parsedUsers.map(u => ({ ...u, isCurrent: false })),
          newUser
        ];

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUser(newUser);
        setIsAuthenticated(true);
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);

    const storedUsers = localStorage.getItem('users');
    const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = parsedUsers.map(u => ({
      ...u,
      isCurrent: false
    }));

    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
