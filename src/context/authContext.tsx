import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
  login: (id: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  
  const login = (id: string, userName: string) => {
    setIsAuthenticated(true);
    setUserId(id);
    setUserName(userName);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
