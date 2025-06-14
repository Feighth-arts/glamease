'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

// Mock data - will be replaced with API data
const MOCK_PROVIDER = {
  id: 1,
  name: 'Jane Smith',
  location: 'Nairobi, Westlands',
  rating: 4.8,
  reviewCount: 124,
  image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  bio: 'Professional nail technician with over 5 years of experience. Specializing in manicures, pedicures, and nail art. Certified in the latest techniques and trends.',
  services: [
    { id: 1, name: 'Manicure', price: 1500, pointsCost: 50, duration: 60, description: 'Classic manicure with cuticle care and polish application.' },
    { id: 2, name: 'Pedicure', price: 2000, pointsCost: 75, duration: 90, description: 'Luxurious pedicure with foot soak, exfoliation, and polish.' },
    { id: 3, name: 'Nail Art', price: 2500, pointsCost: 100, duration: 120, description: 'Creative nail designs with premium polish and accessories.' },
  ],
  schedule: [
    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', startTime: '10:00', endTime: '15:00' },
  ],
  reviews: [
    {
      id: 1,
      clientName: 'Mary Johnson',
      rating: 5,
      comment: 'Amazing service! Jane is very professional and the results were perfect.',
      date: '2024-02-15',
    },
    {
      id: 2,
      clientName: 'Sarah Williams',
      rating: 4,
      comment: 'Great experience overall. The nail art was beautiful.',
      date: '2024-02-10',
    },
  ],
};

export default function ProviderProfile() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('money');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [bookingState, setBookingState] = useState(null);

  // Check if we have a saved booking state in localStorage
  useEffect(() => {
    const savedBooking = localStorage.getItem('pendingBooking');
    if (savedBooking) {
      const { providerId, ...bookingData } = JSON.parse(savedBooking);
      if (providerId === id) {
        setBookingState(bookingData);
        setSelectedService(bookingData.serviceId);
        setSelectedDate(bookingData.date);
        setSelectedTime(bookingData.time);
        setPaymentMethod(bookingData.paymentMethod);
      }
    }
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();

    // If user is not logged in, save state and show login prompt
    if (!user) {
      const bookingData = {
        providerId: id,
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime,
        paymentMethod,
      };
      localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
      setShowLoginPrompt(true);
      return;
    }

    // If user is not a client, show error
    if (user.role !== 'client') {
      alert('Only clients can book services. Please log in with a client account.');
      return;
    }

    // Proceed with booking
    console.log('Booking with:', {
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      paymentMethod,
      userId: user.id,
    });
  };

  const handleLoginClick = () => {
    // Save current URL to redirect back after login
    localStorage.setItem('redirectAfterLogin', `/providers/${id}`);
    router.push('/login');
  };

  // Mock available time slots - will be replaced with real availability check
  const availableTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Provider Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Provider Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={MOCK_PROVIDER.image}
                alt={MOCK_PROVIDER.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Provider Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-dark-blue">{MOCK_PROVIDER.name}</h1>
                  <p className="text-gray-600 flex items-center mt-1">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {MOCK_PROVIDER.location}
                  </p>
                </div>

                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                  <svg className="w-5 h-5 text-gold-dark mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{MOCK_PROVIDER.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({MOCK_PROVIDER.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{MOCK_PROVIDER.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-dark-blue mb-4">Services</h2>
              <div className="space-y-4">
                {MOCK_PROVIDER.services.map(service => (
                  <div
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedService === service.id ? 'border-rose-primary bg-rose-light' : 'hover:border-rose-primary'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-dark-blue">{service.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-dark-blue">KES {service.price}</p>
                        <p className="text-sm text-gray-500">{service.pointsCost} points</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Duration: {service.duration} minutes</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-dark-blue mb-4">Reviews</h2>
              <div className="space-y-6">
                {MOCK_PROVIDER.reviews.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-dark-blue">{review.clientName}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-gold-dark' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-dark-blue mb-4">Book Appointment</h2>
              
              {authLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-primary mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading...</p>
                </div>
              ) : (
                <>
                  {showLoginPrompt && (
                    <div className="mb-6 p-4 bg-rose-light rounded-lg">
                      <p className="text-rose-dark font-medium mb-2">Please log in to book this service</p>
                      <p className="text-sm text-gray-600 mb-4">Your booking details will be saved.</p>
                      <button
                        onClick={handleLoginClick}
                        className="w-full bg-rose-primary text-white py-2 px-4 rounded-md hover:bg-rose-dark transition-colors"
                      >
                        Log In to Continue
                      </button>
                    </div>
                  )}

                  {user && user.role !== 'client' && (
                    <div className="mb-6 p-4 bg-rose-light rounded-lg">
                      <p className="text-rose-dark">
                        Only clients can book services. Please log in with a client account.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleBooking} className="space-y-4">
                    {/* Service Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Service
                      </label>
                      <select
                        value={selectedService || ''}
                        onChange={(e) => setSelectedService(Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                        required
                      >
                        <option value="">Choose a service</option>
                        {MOCK_PROVIDER.services.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - KES {service.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                        required
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Time
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                        required
                      >
                        <option value="">Choose a time</option>
                        {availableTimeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="money"
                            checked={paymentMethod === 'money'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-rose-primary focus:ring-rose-primary"
                          />
                          <span className="ml-2">Pay with Money</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="points"
                            checked={paymentMethod === 'points'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-rose-primary focus:ring-rose-primary"
                          />
                          <span className="ml-2">Pay with Points</span>
                        </label>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      type="submit"
                      className={`w-full py-2 px-4 rounded-md transition-colors ${
                        user && user.role === 'client'
                          ? 'bg-rose-primary text-white hover:bg-rose-dark'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={user && user.role !== 'client'}
                    >
                      {user
                        ? user.role === 'client'
                          ? 'Book Now'
                          : 'Only Clients Can Book'
                        : 'Log In to Book'}
                    </button>
                  </form>

                  {/* Schedule */}
                  <div className="mt-8">
                    <h3 className="font-semibold text-dark-blue mb-3">Availability</h3>
                    <div className="space-y-2">
                      {MOCK_PROVIDER.schedule.map((day, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{day.day}</span>
                          <span className="text-gray-900">{day.startTime} - {day.endTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-dark-blue mb-4">
              Log In to Book This Service
            </h3>
            <p className="text-gray-600 mb-6">
              Your booking details will be saved. Please log in to continue with your booking.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleLoginClick}
                className="w-full bg-rose-primary text-white py-2 px-4 rounded-md hover:bg-rose-dark transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 