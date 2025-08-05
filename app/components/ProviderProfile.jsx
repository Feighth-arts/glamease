import UserAvatar from './UserAvatar';

export default function ProviderProfile({ provider }) {
  if (!provider) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Provider Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
          <UserAvatar user={provider} size="2xl" className="w-full h-full" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-dark-blue mb-2">{provider.name}</h2>
          {provider.businessName && (
            <p className="text-gray-700 mb-1 font-medium">{provider.businessName}</p>
          )}
          <p className="text-gray-600 mb-2">{provider.location}</p>
          {provider.phone && (
            <p className="text-gray-500 mb-2">Phone: {provider.phone}</p>
          )}
          <p className="text-gray-700 mb-2">{provider.bio}</p>
          {provider.specialties && (
            <p className="text-gray-500 mb-2">Specialties: {provider.specialties}</p>
          )}
          {provider.experience && (
            <p className="text-gray-500 mb-2">Experience: {provider.experience}</p>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dark-blue mb-2">Services</h3>
        <ul className="space-y-2">
          {provider.services && provider.services.length > 0 ? (
            provider.services.map(service => (
              <li key={service.name} className="flex justify-between items-center border-b py-2">
                <span>{service.name}</span>
                <span>KES {service.price}</span>
                <span>{service.duration} min</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No services listed.</li>
          )}
        </ul>
      </div>

      {/* Schedule */}
      {provider.schedule && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark-blue mb-2">Schedule</h3>
          <ul className="space-y-1">
            {provider.schedule.map((slot, idx) => (
              <li key={idx} className="text-gray-700">
                {slot.day}: {slot.startTime} - {slot.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reviews */}
      {provider.reviews && (
        <div>
          <h3 className="text-lg font-semibold text-dark-blue mb-2">Reviews</h3>
          <ul className="space-y-2">
            {provider.reviews.length > 0 ? (
              provider.reviews.map(review => (
                <li key={review.id} className="border-b py-2">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold mr-2">{review.clientName}</span>
                    <span className="text-gold-dark">{'★'.repeat(review.rating)}</span>
                    <span className="ml-2 text-gray-400 text-xs">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No reviews yet.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 