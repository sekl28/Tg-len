'use client';

import React from 'react';
import SortDropdown from './SortDropdown';
import AdvancedFilters from './AdvancedFilters';
import { Category, PaymentMethod } from '@/types/casino';

interface CategoriesFiltersProps {
  categories: Category[];
  paymentMethods?: PaymentMethod[];
  sortOptions: { label: string; value: string }[];
}

const CategoriesFilters: React.FC<CategoriesFiltersProps> = ({ categories, paymentMethods, sortOptions }) => {
  const handleFiltersChange = (filters: any) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value as string);
      }
    });
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('sortBy', value);
    } else {
      params.delete('sortBy');
    }
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="mb-8">
        <AdvancedFilters
          categories={categories}
          paymentMethods={paymentMethods}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-100 font-onest">
          Showing casinos
        </p>
        <SortDropdown
          options={sortOptions}
          onSortChange={handleSortChange}
        />
      </div>
    </>
  );
};

export default CategoriesFilters;
