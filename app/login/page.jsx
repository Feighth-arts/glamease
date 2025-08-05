'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import AuthForm from '@/app/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    const { email, password } = formData;

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // If there's a pending booking, clear it from localStorage
        if (result.pendingBooking) {
          localStorage.removeItem('pendingBooking');
        }
        
        // Redirect to the appropriate page
        router.push(result.redirectPath);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-blue">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/signup" className="font-medium text-rose-primary hover:text-rose-dark">
              create a new account
            </Link>
          </p>
        </div> */}

        <AuthForm
          type="login"
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
} 