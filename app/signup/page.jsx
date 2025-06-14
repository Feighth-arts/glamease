'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

export default function SignupPage() {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    
    const result = await signup(formData);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <AuthForm
      type="signup"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
} 