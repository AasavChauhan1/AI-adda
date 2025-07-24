import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Category filters
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      activeFilters.categories.forEach(category => {
        chips.push({
          id: `category-${category}`,
          label: category.charAt(0).toUpperCase() + category.slice(1),
          type: 'categories',
          value: category
        });
      });
    }

    // Pricing filters
    if (activeFilters.pricing && activeFilters.pricing.length > 0) {
      activeFilters.pricing.forEach(pricing => {
        chips.push({
          id: `pricing-${pricing}`,
          label: pricing.charAt(0).toUpperCase() + pricing.slice(1),
          type: 'pricing',
          value: pricing
        });
      });
    }

    // Features filters
    if (activeFilters.features && activeFilters.features.length > 0) {
      activeFilters.features.forEach(feature => {
        const featureLabels = {
          'api': 'API Available',
          'mobile': 'Mobile App',
          'integration': 'Integrations',
          'collaboration': 'Team Collaboration',
          'customization': 'Customizable',
          'analytics': 'Analytics',
          'support': '24/7 Support',
          'opensource': 'Open Source'
        };
        chips.push({
          id: `feature-${feature}`,
          label: featureLabels[feature] || feature,
          type: 'features',
          value: feature
        });
      });
    }

    // Rating filter
    if (activeFilters.rating) {
      chips.push({
        id: 'rating',
        label: `${activeFilters.rating}+ Stars`,
        type: 'rating',
        value: activeFilters.rating
      });
    }

    // Date filter
    if (activeFilters.dateAdded) {
      const dateLabels = {
        'week': 'Past Week',
        'month': 'Past Month',
        '3months': 'Past 3 Months',
        'year': 'Past Year'
      };
      chips.push({
        id: 'dateAdded',
        label: dateLabels[activeFilters.dateAdded] || activeFilters.dateAdded,
        type: 'dateAdded',
        value: activeFilters.dateAdded
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  const handleRemoveChip = (chip) => {
    onRemoveFilter(chip.type, chip.value);
  };

  return (
    <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
      <div className="flex items-center space-x-2 min-w-max">
        <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
          Active filters:
        </span>
        
        {chips.map((chip) => (
          <div
            key={chip.id}
            className="flex items-center space-x-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-medium"
          >
            <span className="whitespace-nowrap">{chip.label}</span>
            <button
              onClick={() => handleRemoveChip(chip)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-150"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}

        {chips.length > 1 && (
          <button
            onClick={onClearAll}
            className="flex items-center space-x-1 text-text-secondary hover:text-text-primary text-sm font-medium whitespace-nowrap ml-2 px-2 py-1 rounded-md hover:bg-muted transition-colors duration-150"
          >
            <Icon name="X" size={14} />
            <span>Clear all</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;