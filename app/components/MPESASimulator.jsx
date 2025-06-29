'use client';

import { useState } from 'react';

export default function MPESASimulator({ 
  isOpen, 
  onClose, 
  amount, 
  bookingId, 
  onPaymentSuccess, 
  onPaymentFailed 
}) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mpesaPin, setMpesaPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Simulate MPESA STK push
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate success (90% success rate for demo)
      if (Math.random() > 0.1) {
        setStep(3); // Success
        onPaymentSuccess && onPaymentSuccess({
          bookingId,
          amount,
          phoneNumber,
          transactionId: `MPESA${Date.now()}`,
          timestamp: new Date().toISOString()
        });
      } else {
        setError('Payment failed. Please try again.');
      }
    }, 3000);
  };

  const handleRetry = () => {
    setStep(1);
    setPhoneNumber('');
    setMpesaPin('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold text-sm">M</span>
              </div>
              <div>
                <h3 className="font-semibold">MPESA Payment</h3>
                <p className="text-sm opacity-90">Booking #{bookingId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Phone Number */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Enter Phone Number</h4>
                <p className="text-gray-600">We'll send an STK push to your phone</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MPESA Registered Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., 254700000000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <span className="font-semibold text-lg">KES {amount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
            </form>
          )}

          {/* Step 2: Processing */}
          {step === 2 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                ) : (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {isProcessing ? 'Processing Payment...' : 'Payment Complete!'}
              </h4>
              
              <p className="text-gray-600 mb-6">
                {isProcessing 
                  ? 'Please check your phone for the MPESA STK push and enter your PIN'
                  : 'Your payment has been processed successfully'
                }
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!isProcessing && !error && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-600 text-sm">Payment successful!</p>
                  </div>
                </div>
              )}

              {!isProcessing && (
                <button
                  onClick={onClose}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {error ? 'Close' : 'Done'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 