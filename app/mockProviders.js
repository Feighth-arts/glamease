// Unified mock provider data for both client and provider views
const mockProviders = [
  {
    id: 1,
    name: 'Jane Smith',
    location: 'Nairobi, Westlands',
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Professional nail technician with over 5 years of experience. Specializing in manicures, pedicures, and nail art. Certified in the latest techniques and trends.',
    specialties: 'Manicure, Pedicure, Nail Art',
    experience: '5 years',
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
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    location: 'Nairobi, Kilimani',
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Experienced beautician specializing in gel polish and spa treatments.',
    specialties: 'Gel Polish, Spa Treatments',
    experience: '7 years',
    services: [
      { id: 1, name: 'Manicure', price: 1800, pointsCost: 60, duration: 60, description: 'Gentle manicure with premium products.' },
      { id: 2, name: 'Pedicure', price: 2200, pointsCost: 80, duration: 90, description: 'Relaxing pedicure with massage.' },
      { id: 3, name: 'Gel Polish', price: 3000, pointsCost: 120, duration: 90, description: 'Long-lasting gel polish application.' },
    ],
    schedule: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00' },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00' },
      { day: 'Friday', startTime: '10:00', endTime: '18:00' },
    ],
    reviews: [
      {
        id: 1,
        clientName: 'Alice Kim',
        rating: 5,
        comment: 'Sarah is the best! My nails have never looked better.',
        date: '2024-03-01',
      },
    ],
  },
];

export default mockProviders; 