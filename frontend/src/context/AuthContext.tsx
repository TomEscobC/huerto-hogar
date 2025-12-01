import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Tipo de usuario
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
  isAdmin: boolean;
}

// Tipo del contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario de localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, message: 'Login exitoso' };
      }

      return { success: false, message: response.data.message || 'Error de autenticación' };
    } catch (error: any) {
      if (error.response?.status === 401) {
        return { success: false, message: 'Email o contraseña incorrectos' };
      }
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    loading,
    login,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
