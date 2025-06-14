'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthForm({ 
  type, // 'login' or 'signup'
  onSubmit,
  loading,
  error,
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'client', // default role
    location: '', // for providers
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Name validation for signup
    if (type === 'signup' && !formData.name) {
      errors.name = 'Name is required';
    }

    // Location validation for providers
    if (type === 'signup' && formData.role === 'provider' && !formData.location) {
      errors.location = 'Location is required for providers';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-dark-blue">
            {type === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {type === 'login' ? (
              <>
                Or{' '}
                <Link href="/signup" className="font-medium text-rose-primary hover:text-rose-dark">
                  create a new account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-rose-primary hover:text-rose-dark">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="bg-rose-light text-rose-dark p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {type === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.name ? 'border-rose-primary' : 'border-gray-300'
                  } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-rose-primary focus:outline-none focus:ring-1 focus:ring-rose-primary`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-rose-primary">{formErrors.name}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  formErrors.email ? 'border-rose-primary' : 'border-gray-300'
                } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-rose-primary focus:outline-none focus:ring-1 focus:ring-rose-primary`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-rose-primary">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  formErrors.password ? 'border-rose-primary' : 'border-gray-300'
                } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-rose-primary focus:outline-none focus:ring-1 focus:ring-rose-primary`}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-rose-primary">{formErrors.password}</p>
              )}
            </div>

            {type === 'signup' && (
              <>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    I want to
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-rose-primary focus:outline-none focus:ring-1 focus:ring-rose-primary"
                  >
                    <option value="client">Book Beauty Services</option>
                    <option value="provider">Provide Beauty Services</option>
                  </select>
                </div>

                {formData.role === 'provider' && (
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.location ? 'border-rose-primary' : 'border-gray-300'
                      } px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-rose-primary focus:outline-none focus:ring-1 focus:ring-rose-primary`}
                    />
                    {formErrors.location && (
                      <p className="mt-1 text-sm text-rose-primary">{formErrors.location}</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {type === 'login' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-rose-primary focus:ring-rose-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-rose-primary hover:text-rose-dark">
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-primary hover:bg-rose-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-primary ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                type === 'login' ? 'Sign in' : 'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 