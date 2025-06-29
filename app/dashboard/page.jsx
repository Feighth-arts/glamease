'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

// Mock data - will be replaced with real data from API
const MOCK_CLIENT_BOOKINGS = [
  {
    id: 1,
    providerName: 'Jane Smith',
    serviceName: 'Manicure',
    date: '2024-03-15',
    time: '10:00',
    status: 'confirmed',
    paymentMethod: 'money',
    amount: 1500,
  },
  {
    id: 2,
    providerName: 'Sarah Johnson',
    serviceName: 'Pedicure',
    date: '2024-03-20',
    time: '14:00',
    status: 'pending',
    paymentMethod: 'points',
    pointsCost: 75,
  },
];

export default function ClientDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'client')) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'client') return null;

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-dark-blue">My Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                href="/providers"
                className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors"
              >
                Book Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-rose-light">
                <svg className="w-6 h-6 text-rose-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-dark-blue">{MOCK_CLIENT_BOOKINGS.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gold-light">
                <svg className="w-6 h-6 text-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Points Balance</p>
                <p className="text-2xl font-bold text-dark-blue">125</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reviews Given</p>
                <p className="text-2xl font-bold text-dark-blue">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'bookings', name: 'My Bookings' },
                { id: 'points', name: 'Points History' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-rose-primary text-rose-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Bookings */}
                  <div>
                    <h3 className="text-lg font-semibold text-dark-blue mb-4">Recent Bookings</h3>
                    <div className="space-y-3">
                      {MOCK_CLIENT_BOOKINGS.map((booking) => (
                        <div key={booking.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-dark-blue">{booking.providerName}</p>
                              <p className="text-sm text-gray-600">{booking.serviceName}</p>
                              <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-dark-blue mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link
                        href="/providers"
                        className="block w-full bg-rose-primary text-white text-center py-3 rounded-md hover:bg-rose-dark transition-colors"
                      >
                        Book New Service
                      </Link>
                      <button className="block w-full bg-gold-light text-dark-blue text-center py-3 rounded-md hover:bg-gold-dark transition-colors">
                        View Points History
                      </button>
                      <button className="block w-full bg-gray-200 text-gray-700 text-center py-3 rounded-md hover:bg-gray-300 transition-colors">
                        Download Receipts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-lg font-semibold text-dark-blue mb-4">All Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {MOCK_CLIENT_BOOKINGS.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.providerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.serviceName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date} {booking.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.paymentMethod === 'money' 
                              ? `KES ${booking.amount}` 
                              : `${booking.pointsCost} points`
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Points Tab */}
            {activeTab === 'points' && (
              <div>
                <h3 className="text-lg font-semibold text-dark-blue mb-4">Points History</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Points history will be displayed here when you have transactions.</p>
                  <p className="text-sm text-gray-500 mt-2">Earn points by completing bookings and leaving reviews!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 