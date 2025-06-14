'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - will be replaced with real data from API
const MOCK_PROVIDERS = [
  {
    id: 1,
    name: 'Jane Smith',
    location: 'Nairobi, Westlands',
    rating: 4.8,
    reviewCount: 124,
    services: [
      { name: 'Manicure', price: 1500, duration: 60 },
      { name: 'Pedicure', price: 2000, duration: 90 },
      { name: 'Nail Art', price: 2500, duration: 120 },
    ],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    location: 'Nairobi, Kilimani',
    rating: 4.9,
    reviewCount: 89,
    services: [
      { name: 'Manicure', price: 1800, duration: 60 },
      { name: 'Pedicure', price: 2200, duration: 90 },
      { name: 'Gel Polish', price: 3000, duration: 90 },
    ],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  // Add more mock providers as needed
];

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, price, name

  // Get unique services and locations for filters
  const allServices = [...new Set(MOCK_PROVIDERS.flatMap(p => p.services.map(s => s.name)))];
  const allLocations = [...new Set(MOCK_PROVIDERS.map(p => p.location))];

  // Filter and sort providers
  const filteredProviders = MOCK_PROVIDERS
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          provider.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesService = !selectedService || provider.services.some(s => s.name === selectedService);
      const matchesLocation = !selectedLocation || provider.location === selectedLocation;
      return matchesSearch && matchesService && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return Math.min(...a.services.map(s => s.price)) - Math.min(...b.services.map(s => s.price));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Hero Section */}
      <div className="bg-rose-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-dark-blue text-center mb-6">
            Find Your Perfect Beauty Service Provider
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Discover trusted beauty professionals in your area. Book appointments, earn points, and look your best.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
              />
            </div>

            {/* Service Filter */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
              >
                <option value="">All Services</option>
                {allServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
              >
                <option value="">All Locations</option>
                {allLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex justify-end">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <div key={provider.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Provider Image */}
              <div className="relative h-48">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                  <svg className="w-5 h-5 text-gold-dark mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({provider.reviewCount})</span>
                </div>
              </div>

              {/* Provider Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark-blue mb-2">{provider.name}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {provider.location}
                </p>

                {/* Services List */}
                <div className="space-y-2">
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">{service.name}</span>
                      <div className="flex items-center">
                        <span className="font-semibold text-dark-blue">KES {service.price}</span>
                        <span className="text-gray-500 ml-2">{service.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Profile Button */}
                <Link
                  href={`/providers/${provider.id}`}
                  className="mt-6 block w-full text-center bg-rose-primary text-white py-2 px-4 rounded-md hover:bg-rose-dark transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
} 