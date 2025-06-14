'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    
    const { email, password } = formData;
    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
} 