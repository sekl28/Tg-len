'use client';

import React from 'react';
import SortDropdown from './SortDropdown';
import SimpleFilters, { FilterOption } from './SimpleFilters';
import { Category } from '@/types/casino';

interface HomePageFiltersProps {
  categoryOptions: FilterOption[];
  sortOptions: { label: string; value: string }[];
}

const HomePageFilters: React.FC<HomePageFiltersProps> = ({ categoryOptions, sortOptions }) => {
  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <SimpleFilters
        options={categoryOptions}
        onFilterChange={handleFilterChange}
        buttonLabel="Casino Categories"
      />
      <SortDropdown
        options={sortOptions}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default HomePageFilters;
