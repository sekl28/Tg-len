'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface SimpleFiltersProps {
  options: FilterOption[];
  currentFilter?: string;
  onFilterChange: (filterValue: string) => void;
  className?: string;
  buttonLabel?: string;
}

const SimpleFilters: React.FC<SimpleFiltersProps> = ({ 
  options, 
  currentFilter = '', 
  onFilterChange, 
  className = '',
  buttonLabel = 'Filters'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = options.find(option => option.value === currentFilter);
  const displayLabel = currentOption ? currentOption.label : buttonLabel;

  const handleOptionSelect = (value: string) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:border-firebrick-200 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200"
      >
        <Image src="/Funnel.svg" alt="" width={20} height={20} className="opacity-70" />
        <span className="font-semibold text-gray-300 text-sm">{displayLabel}</span>
        <Image 
          src="/CaretDown.svg" 
          alt="" 
          width={16} 
          height={16} 
          className={`opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden max-h-80 overflow-y-auto">
            <button
              onClick={() => handleOptionSelect('')}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 border-b border-gray-100 ${
                currentFilter === ''
                  ? 'bg-firebrick-200 text-white font-semibold'
                  : 'text-gray-300 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 flex items-center justify-between ${
                  option.value === currentFilter
                    ? 'bg-firebrick-200 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    option.value === currentFilter
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-100'
                  }`}>
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleFilters;
