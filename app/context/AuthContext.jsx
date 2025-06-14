'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock user data - we'll replace this with real data later
const MOCK_USERS = [
  {
    id: 1,
    email: 'client@example.com',
    password: 'password123',
    name: 'John Client',
    role: 'client',
  },
  {
    id: 2,
    email: 'provider@example.com',
    password: 'password123',
    name: 'Jane Provider',
    role: 'provider',
    location: 'New York',
  },
  {
    id: 3,
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
  },
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulate checking for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login validation
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // In a real app, we would validate the password here
      // For mock purposes, we'll just check if it's not empty
      if (!password) {
        throw new Error('Invalid email or password');
      }

      // Set user state and store in localStorage
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));

      // Check for pending booking
      const pendingBooking = localStorage.getItem('pendingBooking');
      const redirectPath = localStorage.getItem('redirectAfterLogin');

      // Clear the stored redirect path
      localStorage.removeItem('redirectAfterLogin');

      // Return success with redirect path
      return {
        success: true,
        redirectPath: redirectPath || (user.role === 'provider' ? '/provider/dashboard' : '/dashboard'),
        pendingBooking: pendingBooking ? JSON.parse(pendingBooking) : null
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (userData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // In a real app, we would create the user in the database
      const newUser = {
        id: MOCK_USERS.length + 1,
        ...userData,
      };

      // Don't store password in user object
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      // Redirect based on role
      if (userData.role === 'provider') {
        router.push('/provider/onboarding');
      } else {
        router.push('/dashboard');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 