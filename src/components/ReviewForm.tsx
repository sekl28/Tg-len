'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitReview } from '@/lib/strapi';

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    message: '',
    agreedToTerms: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.agreedToTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitReview({
        name: formData.name,
        email: formData.email,
        city: formData.city,
        message: formData.message,
        type: 'review',
      });

      setShowSuccess(true);
      setFormData({
        name: '',
        city: '',
        email: '',
        message: '',
        agreedToTerms: false,
      });
    } catch (error) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <section className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-32 h-32 bg-seagreen rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <div className="text-4xl text-white">✓</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-4">Thanks for sharing your experience!</h3>
        <p className="text-base text-gray-100 font-onest mb-6">
          Your review will appear once approved.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="bg-firebrick-200 text-white font-bold py-3 px-8 rounded-lg hover:bg-firebrick-100 transition-colors"
        >
          Got It
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-300 mb-4">Leave a Review</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Your City *</label>
              <input 
                type="text" 
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Your Email *</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Your Review *</label>
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your experience with our website"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200 resize-none"
              ></textarea>
            </div>
            
            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-1" 
              />
              <label htmlFor="terms" className="text-sm text-gray-100">
                I agree to the <Link href="/terms-conditions" className="text-firebrick-200 underline">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-firebrick-200 underline">Privacy Policy</Link>.
              </label>
            </div>

            {error && (
              <div className="text-firebrick-200 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-firebrick-200 text-white font-bold py-3 rounded-lg hover:bg-firebrick-100 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Leave a Review'}
            </button>
          </form>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <div className="text-4xl">📝</div>
            </div>
            <h4 className="text-xl font-bold text-gray-300 mb-2">Share Your Experience</h4>
            <p className="text-base text-gray-100 font-onest">
              Help other Canadian players by sharing your experience with our casino reviews and recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;
