'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Category } from '@/types/casino';

interface FilterSidebarProps {
  categories: Category[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedBonusTypes, setSelectedBonusTypes] = useState<string[]>([]);
  const [selectedWithdrawalSpeeds, setSelectedWithdrawalSpeeds] = useState<string[]>([]);
  const [selectedGameProviders, setSelectedGameProviders] = useState<string[]>([]);
  const [minDeposit, setMinDeposit] = useState<string>('');

  const paymentMethods = [
    'Interac',
    'Visa',
    'Mastercard',
    'Skrill',
    'Neteller',
    'Bitcoin',
    'Ethereum',
    'Litecoin'
  ];

  const bonusTypes = [
    'No Deposit Bonus',
    'Welcome Bonus',
    'Free Spins',
    'Cashback',
    'High Roller Bonus'
  ];

  const withdrawalSpeeds = [
    'Instant',
    'Same day',
    '1-3 days'
  ];

  const gameProviders = [
    'NetEnt',
    'Microgaming',
    'Playtech',
    'Evolution Gaming',
    'Pragmatic Play'
  ];

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(c => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethods(prev =>
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleBonusTypeChange = (bonusType: string) => {
    setSelectedBonusTypes(prev =>
      prev.includes(bonusType)
        ? prev.filter(b => b !== bonusType)
        : [...prev, bonusType]
    );
  };

  const handleWithdrawalSpeedChange = (speed: string) => {
    setSelectedWithdrawalSpeeds(prev =>
      prev.includes(speed)
        ? prev.filter(s => s !== speed)
        : [...prev, speed]
    );
  };

  const handleGameProviderChange = (provider: string) => {
    setSelectedGameProviders(prev =>
      prev.includes(provider)
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPaymentMethods([]);
    setSelectedBonusTypes([]);
    setSelectedWithdrawalSpeeds([]);
    setSelectedGameProviders([]);
    setMinDeposit('');
  };

  const applyFilters = () => {
    // This would typically update the URL params and trigger a re-fetch
    const params = new URLSearchParams();
    
    if (selectedCategories.length) {
      selectedCategories.forEach(cat => params.append('category', cat));
    }
    if (selectedPaymentMethods.length) {
      selectedPaymentMethods.forEach(method => params.append('payment', method));
    }
    if (minDeposit) {
      params.set('minDeposit', minDeposit);
    }
    
    // Update URL without page reload
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="space-y-6">
        {/* Casino Categories */}
        <div>
          <h3 className="font-bold text-lg text-gray-300 mb-3">Casino Categories</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes('all')}
                onChange={() => handleCategoryChange('all')}
                className="rounded border-gray-300"
              />
              <span className="text-gray-100">All</span>
            </label>
            {categories?.map((category) => (
              <label key={category.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.attributes.slug)}
                  onChange={() => handleCategoryChange(category.attributes.slug)}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-100">{category.attributes.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Withdrawal Speed */}
        <div>
          <h3 className="font-bold text-lg text-gray-300 mb-3">Withdrawal Speed</h3>
          <div className="space-y-2">
            {withdrawalSpeeds.map((speed) => (
              <label key={speed} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedWithdrawalSpeeds.includes(speed)}
                  onChange={() => handleWithdrawalSpeedChange(speed)}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-100">{speed}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bonus Type */}
        <div>
          <h3 className="font-bold text-lg text-gray-300 mb-3">Bonus Type</h3>
          <div className="space-y-2">
            {bonusTypes.map((bonusType) => (
              <label key={bonusType} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBonusTypes.includes(bonusType)}
                  onChange={() => handleBonusTypeChange(bonusType)}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-100">{bonusType}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="font-bold text-lg text-gray-300 mb-3">Payment Methods</h3>
          <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-100">
            <option>Choose payment options</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Deposit */}
        <div>
          <h3 className="font-bold text-lg text-gray-300 mb-3">Minimum Deposit</h3>
          <input
            type="number"
            placeholder="Enter minimum deposit"
            value={minDeposit}
            onChange={(e) => setMinDeposit(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-100 placeholder-gray-100"
          />
        </div>

        {/* Game Provider */}
        <div>
          <h3 className="font-bold text-lg text-gray-300 mb-3">Game Provider</h3>
          <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-100">
            <option>Choose provider</option>
            {gameProviders.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={resetFilters}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset Filter
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 py-3 px-4 bg-firebrick-200 text-white rounded-lg hover:bg-firebrick-100 transition-colors"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
