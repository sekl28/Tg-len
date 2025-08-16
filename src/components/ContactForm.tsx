'use client';

import React, { useState } from 'react';
import { submitContactForm } from '@/lib/strapi';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        type: 'contact',
      });

      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-32 h-32 bg-seagreen rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <div className="text-4xl text-white">✓</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-4">Message Sent Successfully!</h3>
        <p className="text-base text-gray-100 font-onest mb-6">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="bg-firebrick-200 text-white font-bold py-3 px-8 rounded-lg hover:bg-firebrick-100 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Name *</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
              placeholder="Enter your email"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Subject *</label>
          <input 
            type="text" 
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
            placeholder="Enter subject"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Message *</label>
          <textarea 
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200 resize-none"
            placeholder="Enter your message"
          ></textarea>
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
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
