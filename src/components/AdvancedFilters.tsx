'use client';

import React, { useState } from 'react';
import { Category, PaymentMethod } from '@/types/casino';
import { FilterOption } from './SimpleFilters';

interface FilterState {
  category: string;
  withdrawalSpeed: string;
  bonusType: string;
  paymentMethod: string;
  minDeposit: string;
  gameProvider: string;
  license: string;
}

interface AdvancedFiltersProps {
  categories: Category[];
  paymentMethods?: PaymentMethod[];
  onFiltersChange: (filters: Partial<FilterState>) => void;
  className?: string;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  categories, 
  paymentMethods = [], 
  onFiltersChange, 
  className = '' 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    withdrawalSpeed: '',
    bonusType: '',
    paymentMethod: '',
    minDeposit: '',
    gameProvider: '',
    license: '',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters: FilterState = {
      category: '',
      withdrawalSpeed: '',
      bonusType: '',
      paymentMethod: '',
      minDeposit: '',
      gameProvider: '',
      license: '',
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  const withdrawalSpeedOptions = [
    { label: 'Instant', value: 'instant' },
    { label: 'Same day', value: 'same-day' },
    { label: '1-3 days', value: '1-3-days' },
  ];

  const bonusTypeOptions = [
    { label: 'All', value: '' },
    { label: 'No Deposit Bonus', value: 'no-deposit' },
    { label: 'Free Spins', value: 'free-spins' },
    { label: 'Cashback', value: 'cashback' },
    { label: 'Welcome Bonus', value: 'welcome-bonus' },
    { label: 'High Roller Bonus', value: 'high-roller' },
  ];

  const gameProviderOptions = [
    { label: 'Choose provider', value: '' },
    { label: 'Evolution Gaming', value: 'evolution' },
    { label: 'NetEnt', value: 'netent' },
    { label: 'Microgaming', value: 'microgaming' },
    { label: 'Playtech', value: 'playtech' },
    { label: 'Pragmatic Play', value: 'pragmatic' },
  ];

  const licenseOptions = [
    { label: 'All', value: '' },
    { label: 'Curacao', value: 'curacao' },
    { label: 'MGA', value: 'mga' },
    { label: 'Kahnawake', value: 'kahnawake' },
    { label: 'UK Gambling Commission', value: 'ukgc' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.attributes.slug}>
                {category.attributes.name}
              </option>
            ))}
          </select>
        </div>

        {/* Withdrawal Speed Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Withdrawal Speed</label>
          <select 
            value={filters.withdrawalSpeed}
            onChange={(e) => handleFilterChange('withdrawalSpeed', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          >
            <option value="">Any Speed</option>
            {withdrawalSpeedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bonus Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Bonus Type</label>
          <select 
            value={filters.bonusType}
            onChange={(e) => handleFilterChange('bonusType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          >
            {bonusTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* License Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">License</label>
          <select 
            value={filters.license}
            onChange={(e) => handleFilterChange('license', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          >
            {licenseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Options Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Payment Methods</label>
          <select 
            value={filters.paymentMethod}
            onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          >
            <option value="">Choose payment options</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.attributes.name.toLowerCase()}>
                {method.attributes.name}
              </option>
            ))}
            {paymentMethods.length === 0 && (
              <>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="interac">Interac</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="skrill">Skrill</option>
              </>
            )}
          </select>
        </div>

        {/* Minimum Deposit */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Minimum Deposit</label>
          <input
            type="text"
            value={filters.minDeposit}
            onChange={(e) => handleFilterChange('minDeposit', e.target.value)}
            placeholder="Enter minimum deposit"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          />
        </div>

        {/* Game Provider */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Game Provider</label>
          <select 
            value={filters.gameProvider}
            onChange={(e) => handleFilterChange('gameProvider', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 bg-white hover:border-gray-400 transition-colors duration-200"
          >
            {gameProviderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={resetFilters}
          className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-300 font-bold hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200"
        >
          Reset Filter
        </button>
        <button 
          onClick={applyFilters}
          className="px-8 py-3 bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transform transition-all duration-200"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
