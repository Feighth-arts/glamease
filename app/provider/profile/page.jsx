'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import UserAvatar from '@/app/components/UserAvatar';

export default function ProviderProfile() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    businessName: '',
    experience: '',
    specialties: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'provider')) {
      router.push('/login');
      return;
    }

    if (user) {
      // Load existing user data
      setPersonalDetails({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        businessName: user.businessName || '',
        experience: user.experience || '',
        specialties: user.specialties || '',
      });

      if (user.image) {
        setImagePreview(user.image);
      }
    }
  }, [user, loading, router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setPersonalDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would upload the image and update the profile
      console.log('Updating profile:', { personalDetails, profileImage });

      // Update user in localStorage (mock)
      const updatedUser = {
        ...user,
        ...personalDetails,
        image: imagePreview || user.image
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
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

  if (!user || user.role !== 'provider') return null;

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-dark-blue">Profile Settings</h1>
              <p className="text-gray-600">Manage your personal and business information</p>
            </div>
            <button
              onClick={() => router.push('/provider/dashboard')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'personal', name: 'Personal Details' },
                { id: 'business', name: 'Business Information' },
                { id: 'photo', name: 'Profile Photo' },
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
            {/* Personal Details Tab */}
            {activeTab === 'personal' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold text-dark-blue mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={personalDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={personalDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={personalDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., 254700000000"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={personalDetails.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Nairobi, Westlands"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={personalDetails.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    placeholder="Tell clients about yourself and your experience..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-rose-primary text-white px-6 py-2 rounded-md hover:bg-rose-dark transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* Business Information Tab */}
            {activeTab === 'business' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold text-dark-blue mb-4">Business Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={personalDetails.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="e.g., Jane's Beauty Studio"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={personalDetails.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="e.g., 5"
                      min="0"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialties
                  </label>
                  <textarea
                    value={personalDetails.specialties}
                    onChange={(e) => handleInputChange('specialties', e.target.value)}
                    rows={3}
                    placeholder="e.g., Manicures, Pedicures, Nail Art, Gel Polish"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-primary focus:ring-1 focus:ring-rose-primary"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-rose-primary text-white px-6 py-2 rounded-md hover:bg-rose-dark transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* Profile Photo Tab */}
            {activeTab === 'photo' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-dark-blue mb-4">Profile Photo</h3>
                
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <UserAvatar user={user} size="2xl" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Current Photo</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      {user.image ? 'You have uploaded a profile photo.' : 'No profile photo uploaded yet.'}
                    </p>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload New Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-rose-primary file:text-white hover:file:bg-rose-dark"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Recommended: Square image, at least 200x200 pixels. Max size: 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {imagePreview && (
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Preview</h4>
                    <div className="flex items-center space-x-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm text-gray-600">This is how your profile photo will appear</p>
                        <button
                          onClick={() => {
                            setProfileImage(null);
                            setImagePreview(null);
                          }}
                          className="text-sm text-red-600 hover:text-red-800 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-rose-primary text-white px-6 py-2 rounded-md hover:bg-rose-dark transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Photo'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 