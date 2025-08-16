'use client';

import React from 'react';
import SortDropdown from './SortDropdown';
import SimpleFilters, { FilterOption } from './SimpleFilters';

interface BlogFiltersProps {
  categoryOptions: FilterOption[];
  sortOptions: { label: string; value: string }[];
}

const BlogFilters: React.FC<BlogFiltersProps> = ({ categoryOptions, sortOptions }) => {
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
    <div className="flex gap-4">
      <SimpleFilters
        options={categoryOptions}
        onFilterChange={handleFilterChange}
        buttonLabel="Article Category"
      />
      <SortDropdown
        options={sortOptions}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default BlogFilters;
