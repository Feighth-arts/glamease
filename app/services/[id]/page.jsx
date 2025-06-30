'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import MPESASimulator from '@/app/components/MPESASimulator';
import UserAvatar from '@/app/components/UserAvatar';
import mockProviders from '../../mockProviders';
import ProviderProfile from '../../components/ProviderProfile';

export default function ProviderDetail() {
  const { id } = useParams();
  const provider = mockProviders.find(p => p.id === Number(id));
  if (!provider) return <div className="p-8">Provider not found.</div>;
  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-3xl mx-auto">
        <ProviderProfile provider={provider} />
      </div>
    </div>
  );
} 