import mockProviders from '../../../mockProviders';
import Link from 'next/link';
import UserAvatar from '@/app/components/UserAvatar';

export default function ServiceProvidersPage({ params }) {
  const { serviceName } = params;
  const decodedServiceName = decodeURIComponent(serviceName);
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
                    className="bg-gold-light text-dark-blue px-4 py-2 rounded-md font-semibold hover:bg-gold-dark transition-colors flex-1"
                    disabled
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 