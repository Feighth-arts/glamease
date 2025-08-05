'use client';

import { useState } from 'react';
import mockProviders from '../../../mockProviders';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/app/components/UserAvatar';
import MPESASimulator from '@/app/components/MPESASimulator';

export default function ServiceProvidersPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const { serviceName } = params;
  const decodedServiceName = decodeURIComponent(serviceName);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Find all providers offering this service
  const providers = mockProviders.filter(provider =>
    provider.services.some(service => service.name === decodedServiceName)
  );

  return (
    <div className="min-h-screen bg-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-blue mb-8 text-center">
          Providers offering: <span className="text-rose-primary">{decodedServiceName}</span>
        </h1>
        {providers.length === 0 ? (
          <div className="text-center text-gray-500">No providers found for this service.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map(provider => (
              <div key={provider.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <UserAvatar user={provider} size="xl" className="w-full h-full" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-dark-blue">{provider.name}</h2>
                    <p className="text-gray-500">{provider.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-1">Service Details:</p>
                  {provider.services.filter(s => s.name === decodedServiceName).map(service => (
                    <div key={service.id} className="text-sm text-gray-600 mb-1">
                      Price: KES {service.price} | Duration: {service.duration} min
                      <br />
                      {service.description}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/services/${provider.id}`}
                    className="bg-rose-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-rose-dark transition-colors text-center flex-1"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      if (!user) {
                        router.push('/login');
                        return;
                      }
                      setSelectedProvider(provider);
                    }}
                    className="bg-gold-light text-dark-blue px-4 py-2 rounded-md font-semibold hover:bg-gold-dark transition-colors flex-1"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-dark-blue">Book with {selectedProvider.name}</h2>
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Service Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Details
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-dark-blue">{decodedServiceName}</p>
                  {selectedProvider.services
                    .filter(s => s.name === decodedServiceName)
                    .map(service => (
                      <div key={service.id} className="mt-2 text-sm text-gray-600">
                        <p>Price: KES {service.price}</p>
                        <p>Duration: {service.duration} minutes</p>
                        <p>{service.description}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                >
                  <option value="">Choose a time...</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              {/* Booking Button */}
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={!selectedDate || !selectedTime || isLoading}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  !selectedDate || !selectedTime || isLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-rose-primary hover:bg-rose-dark'
                }`}
              >
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedProvider && (
        <MPESASimulator
          amount={selectedProvider.services.find(s => s.name === decodedServiceName).price}
          onClose={() => setShowPaymentModal(false)}
          onComplete={() => {
            setShowPaymentModal(false);
            setSelectedProvider(null);
            // In real implementation, this would make an API call to create the booking
            alert('Booking confirmed! You will receive a confirmation email shortly.');
          }}
        />
      )}
    </div>
  );
} 