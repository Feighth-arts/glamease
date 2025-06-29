'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProviderOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([{
    name: '',
    description: '',
    price: '',
    pointsCost: '',
    duration: '', // in minutes
  }]);
  const [schedule, setSchedule] = useState([
    { dayOfWeek: 0, startTime: '09:00', endTime: '17:00', enabled: true },
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', enabled: true },
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', enabled: true },
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', enabled: true },
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', enabled: true },
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', enabled: true },
    { dayOfWeek: 6, startTime: '09:00', endTime: '17:00', enabled: true },
  ]);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const handleAddService = () => {
    setServices([...services, {
      name: '',
      description: '',
      price: '',
      pointsCost: '',
      duration: '',
    }]);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleRemoveService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (dayIndex, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save to localStorage for dashboard access
    localStorage.setItem('providerServices', JSON.stringify(services));
    localStorage.setItem('providerSchedule', JSON.stringify(schedule));
    
    // In a real app, this would save to the backend
    console.log({ services, schedule });
    
    // Redirect to provider dashboard
    router.push('/provider/dashboard');
  };

  return (
    <div className="min-h-screen bg-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Services', 'Schedule', 'Preview'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step > index + 1 ? 'bg-rose-primary' : 
                  step === index + 1 ? 'bg-rose-primary' : 'bg-gray-200'
                } text-white`}>
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  step === index + 1 ? 'text-rose-primary' : 'text-gray-500'
                }`}>
                  {stepName}
                </div>
                {index < 2 && (
                  <div className={`w-24 h-1 mx-4 ${
                    step > index + 1 ? 'bg-rose-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Services */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-dark-blue mb-6">Set Up Your Services</h2>
                
                {services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Service {index + 1}</h3>
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveService(index)}
                          className="text-rose-primary hover:text-rose-dark"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Service Name
                        </label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                          placeholder="e.g., Manicure, Pedicure"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          value={service.duration}
                          onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                          placeholder="e.g., 60"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Price (KES)
                        </label>
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                          placeholder="e.g., 1500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Points Cost
                        </label>
                        <input
                          type="number"
                          value={service.pointsCost}
                          onChange={(e) => handleServiceChange(index, 'pointsCost', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                          placeholder="e.g., 50"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                          rows="3"
                          placeholder="Describe your service..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddService}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-light hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-light"
                >
                  Add Another Service
                </button>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-primary hover:bg-rose-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-primary"
                  >
                    Next: Set Schedule
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-dark-blue mb-6">Set Your Availability</h2>
                
                <div className="space-y-4">
                  {schedule.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-32">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={day.enabled}
                            onChange={(e) => handleScheduleChange(index, 'enabled', e.target.checked)}
                            className="rounded border-gray-300 text-rose-primary focus:ring-rose-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {daysOfWeek[index]}
                          </span>
                        </label>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Start Time
                          </label>
                          <input
                            type="time"
                            value={day.startTime}
                            onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                            disabled={!day.enabled}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            End Time
                          </label>
                          <input
                            type="time"
                            value={day.endTime}
                            onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                            disabled={!day.enabled}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary disabled:bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-primary"
                  >
                    Back to Services
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-primary hover:bg-rose-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-primary"
                  >
                    Next: Preview
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preview */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-dark-blue mb-6">Preview Your Profile</h2>

                <div className="space-y-8">
                  {/* Services Preview */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Services</h3>
                    <div className="grid gap-4">
                      {services.map((service, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-medium">{service.name}</h4>
                              <p className="text-gray-600 mt-1">{service.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">KES {service.price}</p>
                              <p className="text-sm text-gray-500">{service.pointsCost} points</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Duration: {service.duration} minutes
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Preview */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Availability</h3>
                    <div className="grid gap-2">
                      {schedule.map((day, index) => (
                        day.enabled && (
                          <div key={index} className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">{daysOfWeek[index]}</span>
                            <span className="text-gray-600">
                              {day.startTime} - {day.endTime}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-primary"
                  >
                    Back to Schedule
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-primary hover:bg-rose-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-primary"
                  >
                    Complete Setup
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 