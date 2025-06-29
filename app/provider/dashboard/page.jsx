'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

// Mock data - will be replaced with real data from API
const MOCK_BOOKINGS = [
  {
    id: 1,
    clientName: 'Mary Johnson',
    serviceName: 'Manicure',
    date: '2024-03-15',
    time: '10:00',
    status: 'confirmed',
    paymentMethod: 'money',
    amount: 1500,
  },
  {
    id: 2,
    clientName: 'Sarah Williams',
    serviceName: 'Pedicure',
    date: '2024-03-15',
    time: '14:00',
    status: 'pending',
    paymentMethod: 'points',
    pointsCost: 75,
  },
  {
    id: 3,
    clientName: 'Lisa Brown',
    serviceName: 'Nail Art',
    date: '2024-03-16',
    time: '11:00',
    status: 'completed',
    paymentMethod: 'money',
    amount: 2500,
  },
  {
    id: 4,
    clientName: 'Emma Davis',
    serviceName: 'Manicure',
    date: '2024-03-17',
    time: '09:00',
    status: 'pending',
    paymentMethod: 'money',
    amount: 1500,
  },
  {
    id: 5,
    clientName: 'Grace Wilson',
    serviceName: 'Pedicure',
    date: '2024-03-18',
    time: '15:00',
    status: 'canceled',
    paymentMethod: 'points',
    pointsCost: 75,
  },
  {
    id: 6,
    clientName: 'Sophie Taylor',
    serviceName: 'Nail Art',
    date: '2024-03-19',
    time: '13:00',
    status: 'confirmed',
    paymentMethod: 'money',
    amount: 2500,
  },
];

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Check if user is logged in and is a provider
    if (!loading && (!user || user.role !== 'provider')) {
      router.push('/login');
      return;
    }

    // Load provider data from localStorage (mock)
    const savedServices = localStorage.getItem('providerServices');
    const savedSchedule = localStorage.getItem('providerSchedule');
    
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }

    // Calculate mock earnings and bookings
    const completedBookings = MOCK_BOOKINGS.filter(b => b.status === 'completed');
    const totalEarnings = completedBookings.reduce((sum, booking) => {
      return sum + (booking.paymentMethod === 'money' ? booking.amount : 0);
    }, 0);
    setEarnings(totalEarnings);
    setTotalBookings(MOCK_BOOKINGS.length);
  }, [user, loading, router]);

  const handleStatusUpdate = (bookingId, newStatus) => {
    // In a real app, this would call an API
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
    
    // Show success message
    const statusMessages = {
      'confirmed': 'Booking confirmed successfully!',
      'completed': 'Service completed! Client will receive points.',
      'canceled': 'Booking canceled successfully.'
    };
    
    alert(statusMessages[newStatus] || `Booking status updated to ${newStatus}`);
    
    // In a real app, you would update the booking in the database
    // For now, we'll just show the alert
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

  if (!user || user.role !== 'provider') {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-dark-blue">Provider Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                href="/provider/onboarding"
                className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors"
              >
                Edit Profile
              </Link>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                View Public Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-rose-light">
                <svg className="w-6 h-6 text-rose-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-dark-blue">KES {earnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gold-light">
                <svg className="w-6 h-6 text-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-dark-blue">{totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-dark-blue">{services.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-dark-blue">4.8</p>
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
                { id: 'bookings', name: 'Bookings' },
                { id: 'earnings', name: 'Earnings' },
                { id: 'services', name: 'Services' },
                { id: 'schedule', name: 'Schedule' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-rose-primary text-rose-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
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
                      {MOCK_BOOKINGS.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-dark-blue">{booking.clientName}</p>
                              <p className="text-sm text-gray-600">{booking.serviceName}</p>
                              <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
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
                        href="/provider/onboarding"
                        className="block w-full bg-rose-primary text-white text-center py-3 rounded-md hover:bg-rose-dark transition-colors"
                      >
                        Edit Services & Schedule
                      </Link>
                      <button className="block w-full bg-gold-light text-dark-blue text-center py-3 rounded-md hover:bg-gold-dark transition-colors">
                        View Earnings Report
                      </button>
                      <button className="block w-full bg-gray-200 text-gray-700 text-center py-3 rounded-md hover:bg-gray-300 transition-colors">
                        Download Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-dark-blue">All Bookings</h3>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Canceled</option>
                    </select>
                    <button className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors text-sm">
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {MOCK_BOOKINGS.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                            <div className="text-sm text-gray-500">ID: #{booking.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.serviceName}</div>
                            <div className="text-sm text-gray-500">60 min</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.paymentMethod === 'money' 
                                ? `KES ${booking.amount.toLocaleString()}` 
                                : `${booking.pointsCost} points`
                              }
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.paymentMethod === 'money' ? 'MPESA' : 'Points'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                    className="text-green-600 hover:text-green-800 bg-green-50 px-2 py-1 rounded text-xs"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, 'canceled')}
                                    className="text-red-600 hover:text-red-800 bg-red-50 px-2 py-1 rounded text-xs"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              {booking.status === 'confirmed' && (
                                <>
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                    className="text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded text-xs"
                                  >
                                    Complete
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, 'canceled')}
                                    className="text-red-600 hover:text-red-800 bg-red-50 px-2 py-1 rounded text-xs"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              {booking.status === 'completed' && (
                                <span className="text-gray-500 text-xs">Completed</span>
                              )}
                              {booking.status === 'canceled' && (
                                <span className="text-gray-500 text-xs">Canceled</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Booking Statistics */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-yellow-100">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {MOCK_BOOKINGS.filter(b => b.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Confirmed</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {MOCK_BOOKINGS.filter(b => b.status === 'confirmed').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-100">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {MOCK_BOOKINGS.filter(b => b.status === 'completed').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-red-100">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Canceled</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {MOCK_BOOKINGS.filter(b => b.status === 'canceled').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-dark-blue">Earnings & Payments</h3>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>Last 3 Months</option>
                      <option>This Year</option>
                    </select>
                    <button className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors text-sm">
                      Download Report
                    </button>
                  </div>
                </div>

                {/* Earnings Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                        <p className="text-2xl font-bold text-dark-blue">KES 5,500</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Completed Services</p>
                        <p className="text-2xl font-bold text-dark-blue">3</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                        <p className="text-2xl font-bold text-dark-blue">KES 1,500</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Average per Service</p>
                        <p className="text-2xl font-bold text-dark-blue">KES 1,833</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-lg font-semibold text-dark-blue mb-4">Payment Methods</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm font-medium">MPESA</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">KES 4,000</p>
                          <p className="text-xs text-gray-500">72.7%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gold-light rounded-full mr-3"></div>
                          <span className="text-sm font-medium">Points</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">150 points</p>
                          <p className="text-xs text-gray-500">27.3%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-lg font-semibold text-dark-blue mb-4">Recent Transactions</h4>
                    <div className="space-y-3">
                      {MOCK_BOOKINGS.filter(b => b.status === 'completed' || b.status === 'confirmed').map((booking) => (
                        <div key={booking.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.clientName}</p>
                            <p className="text-xs text-gray-500">{booking.serviceName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {booking.paymentMethod === 'money' 
                                ? `KES ${booking.amount.toLocaleString()}` 
                                : `${booking.pointsCost} points`
                              }
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.paymentMethod === 'money' ? 'MPESA' : 'Points'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MPESA Payment Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-lg font-semibold text-dark-blue mb-4">MPESA Payment Status</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_BOOKINGS.filter(b => b.paymentMethod === 'money').map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.clientName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">KES {booking.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status === 'completed' ? 'Paid' : 
                                 booking.status === 'confirmed' ? 'Processing' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-dark-blue">Your Services</h3>
                  <Link
                    href="/provider/onboarding"
                    className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors"
                  >
                    Edit Services
                  </Link>
                </div>

                {services.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No services</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first service.</p>
                    <div className="mt-6">
                      <Link
                        href="/provider/onboarding"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-primary hover:bg-rose-dark"
                      >
                        Add Service
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-dark-blue mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Price:</span>
                            <span className="text-sm font-medium">KES {service.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Points:</span>
                            <span className="text-sm font-medium">{service.pointsCost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Duration:</span>
                            <span className="text-sm font-medium">{service.duration} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-dark-blue">Your Schedule</h3>
                  <Link
                    href="/provider/onboarding"
                    className="bg-rose-primary text-white px-4 py-2 rounded-md hover:bg-rose-dark transition-colors"
                  >
                    Edit Schedule
                  </Link>
                </div>

                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {daysOfWeek.map((day, index) => {
                      const daySchedule = schedule.find(s => s.dayOfWeek === index);
                      return (
                        <div key={day} className="bg-white p-4">
                          <h4 className="font-medium text-dark-blue text-sm mb-2">{day}</h4>
                          {daySchedule && daySchedule.enabled ? (
                            <div className="text-sm text-gray-600">
                              <p>{daySchedule.startTime} - {daySchedule.endTime}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">Closed</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 