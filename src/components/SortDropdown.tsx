'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  currentSort?: string;
  onSortChange: (sortValue: string) => void;
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  options, 
  currentSort = '', 
  onSortChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = options.find(option => option.value === currentSort) || options[0];

  const handleOptionSelect = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:border-firebrick-200 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200"
      >
        <Image src="/SortAscending.svg" alt="" width={20} height={20} className="opacity-70" />
        <span className="font-semibold text-gray-300 text-sm">{currentOption?.label || 'Sort By'}</span>
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
          <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                  option.value === currentSort
                    ? 'bg-firebrick-200 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;
