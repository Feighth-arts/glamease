'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import UserAvatar from '@/app/components/UserAvatar';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-rose-primary">Glamease</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-dark-blue hover:text-rose-primary transition-colors">
              Services
            </Link>
            <Link href="/providers" className="text-dark-blue hover:text-rose-primary transition-colors">
              Find Providers
            </Link>
            <Link href="/about" className="text-dark-blue hover:text-rose-primary transition-colors">
              About
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {(user.role === 'provider' || user.role === 'client') && (
                  <Link 
                    href={user.role === 'provider' ? '/provider/dashboard' : '/dashboard'} 
                    className="text-dark-blue hover:text-rose-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <UserAvatar user={user} size="sm" />
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gold-light text-dark-blue px-4 py-2 rounded-md hover:bg-gold-dark transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-blue hover:text-rose-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/services" 
              className="block px-3 py-2 text-dark-blue hover:text-rose-primary transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/providers" 
              className="block px-3 py-2 text-dark-blue hover:text-rose-primary transition-colors"
            >
              Find Providers
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-dark-blue hover:text-rose-primary transition-colors"
            >
              About
            </Link>
            
            {user ? (
              <>
                {(user.role === 'provider' || user.role === 'client') && (
                  <Link 
                    href={user.role === 'provider' ? '/provider/dashboard' : '/dashboard'} 
                    className="block px-3 py-2 text-dark-blue hover:text-rose-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="px-3 py-2 text-sm text-gray-600">
                  Hi, {user.name}
                </div>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block px-3 py-2 bg-rose-primary text-white rounded-md hover:bg-rose-dark transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block px-3 py-2 bg-gold-light text-dark-blue rounded-md hover:bg-gold-dark transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 