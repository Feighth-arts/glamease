'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserAvatar from '@/app/components/UserAvatar';
import mockProviders from '../mockProviders';

// Get all unique services and map them to providers
const serviceMap = {};
mockProviders.forEach(provider => {
  provider.services.forEach(service => {
    if (!serviceMap[service.name]) {
      serviceMap[service.name] = { providers: [], prices: [] };
    }
    serviceMap[service.name].providers.push(provider);
    serviceMap[service.name].prices.push(service.price);
  });
});
const uniqueServices = Object.keys(serviceMap);

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, price, name

  // Get unique services and locations for filters
  const allServices = [...new Set(mockProviders.flatMap(p => p.services.map(s => s.name)))];
  const allLocations = [...new Set(mockProviders.map(p => p.location))];

  // Filter and sort providers
  const filteredProviders = mockProviders
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
    <div className="min-h-screen bg-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-blue mb-8 text-center">Available Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uniqueServices.map(serviceName => {
            const prices = serviceMap[serviceName].prices;
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            return (
              <div key={serviceName} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-rose-primary mb-2">{serviceName}</h2>
                  <p className="text-gray-700 mb-2">
                    Price: KES {minPrice}{minPrice !== maxPrice && ` - ${maxPrice}`}
                  </p>
                  <p className="text-gray-500 mb-4">
                    {serviceMap[serviceName].providers.length} provider(s) available
                  </p>
                </div>
                <Link
                  href={`/services/service/${encodeURIComponent(serviceName)}`}
                  className="mt-4 inline-block bg-rose-primary text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-rose-dark transition-colors text-center"
                >
                  View Providers
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 