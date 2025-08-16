'use client';

import React, { useState } from 'react';

interface FilterState {
  casinoType: string;
  withdrawalSpeed: string;
  bonusType: string;
  paymentMethods: string;
  minDeposit: string;
  gameProvider: string;
}

const FilterControls: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    casinoType: 'new-casinos',
    withdrawalSpeed: 'instant',
    bonusType: 'all',
    paymentMethods: '',
    minDeposit: '',
    gameProvider: '',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      casinoType: 'new-casinos',
      withdrawalSpeed: 'instant',
      bonusType: 'all',
      paymentMethods: '',
      minDeposit: '',
      gameProvider: '',
    });
  };

  const applyFilters = () => {
    // Here you would typically update URL params or send filters to parent component
    console.log('Applying filters:', filters);
    // For now, just show a notification or reload the page with new parameters
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });
    
    // Update the URL with new filters
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Advanced Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Casino Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Casino Type</label>
          <select 
            value={filters.casinoType}
            onChange={(e) => handleFilterChange('casinoType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          >
            <option value="new-casinos">New Casinos</option>
            <option value="top-rated">Top Rated</option>
            <option value="crypto-casinos">Crypto Casinos</option>
            <option value="exclusive-casinos">Exclusive Casinos</option>
            <option value="fast-payouts">Fast Payouts</option>
          </select>
        </div>

        {/* Withdrawal Speed Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Withdrawal Speed</label>
          <select 
            value={filters.withdrawalSpeed}
            onChange={(e) => handleFilterChange('withdrawalSpeed', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          >
            <option value="instant">Instant</option>
            <option value="same-day">Same day</option>
            <option value="1-3-days">1-3 days</option>
          </select>
        </div>

        {/* Bonus Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Bonus Type</label>
          <select 
            value={filters.bonusType}
            onChange={(e) => handleFilterChange('bonusType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          >
            <option value="all">All</option>
            <option value="no-deposit">No Deposit Bonus</option>
            <option value="free-spins">Free Spins</option>
            <option value="cashback">Cashback</option>
            <option value="welcome-bonus">Welcome Bonus</option>
            <option value="high-roller">High Roller Bonus</option>
          </select>
        </div>

        {/* License Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">License</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          >
            <option value="all">All</option>
            <option value="curacao">Curacao</option>
            <option value="mga">MGA</option>
            <option value="kahnawake">Kahnawake</option>
          </select>
        </div>
      </div>

      {/* Advanced Options Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Payment Methods</label>
          <select 
            value={filters.paymentMethods}
            onChange={(e) => handleFilterChange('paymentMethods', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          >
            <option value="">Choose payment options</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="interac">Interac</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="skrill">Skrill</option>
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          />
        </div>

        {/* Game Provider */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Game Provider</label>
          <select 
            value={filters.gameProvider}
            onChange={(e) => handleFilterChange('gameProvider', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-firebrick-200"
          >
            <option value="">Choose provider</option>
            <option value="evolution">Evolution Gaming</option>
            <option value="netent">NetEnt</option>
            <option value="microgaming">Microgaming</option>
            <option value="playtech">Playtech</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={resetFilters}
          className="px-8 py-3 border border-gray-300 rounded-lg text-gray-300 font-bold hover:bg-gray-50 transition-colors"
        >
          Reset Filter
        </button>
        <button 
          onClick={applyFilters}
          className="px-8 py-3 bg-firebrick-200 text-white rounded-lg font-bold hover:bg-firebrick-100 transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
