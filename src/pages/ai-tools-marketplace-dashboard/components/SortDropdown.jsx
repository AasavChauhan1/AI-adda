import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="w-full sm:w-48">
      <Select
        options={sortOptions}
        value={value}
        onChange={onChange}
        placeholder="Sort by"
        className="w-full"
      />
    </div>
  );
};

export default SortDropdown;