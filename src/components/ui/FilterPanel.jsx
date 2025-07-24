import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';
import { Checkbox } from './Checkbox';


const FilterPanel = ({ isOpen, onClose, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    categories: [],
    pricing: [],
    features: [],
    rating: '',
    sortBy: 'relevance',
    dateAdded: '',
    searchQuery: ''
  });

  const categoryOptions = [
    { value: 'writing', label: 'Writing & Content' },
    { value: 'image', label: 'Image Generation' },
    { value: 'code', label: 'Code & Development' },
    { value: 'data', label: 'Data Analysis' },
    { value: 'voice', label: 'Voice & Audio' },
    { value: 'video', label: 'Video Creation' },
    { value: 'translation', label: 'Translation' },
    { value: 'chatbot', label: 'Chatbots' },
    { value: 'automation', label: 'Automation' },
    { value: 'research', label: 'Research' }
  ];

  const pricingOptions = [
    { value: 'free', label: 'Free' },
    { value: 'freemium', label: 'Freemium' },
    { value: 'paid', label: 'Paid' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const featureOptions = [
    { value: 'api', label: 'API Available' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'integration', label: 'Third-party Integrations' },
    { value: 'collaboration', label: 'Team Collaboration' },
    { value: 'customization', label: 'Customizable' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'support', label: '24/7 Support' },
    { value: 'opensource', label: 'Open Source' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' }
  ];

  const dateOptions = [
    { value: '', label: 'Any Time' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: '3months', label: 'Past 3 Months' },
    { value: 'year', label: 'Past Year' }
  ];

  useEffect(() => {
    // Parse URL parameters on component mount
    const urlParams = new URLSearchParams(location.search);
    const newFilters = { ...filters };

    urlParams.forEach((value, key) => {
      if (key === 'categories' || key === 'pricing' || key === 'features') {
        newFilters[key] = value.split(',').filter(Boolean);
      } else {
        newFilters[key] = value;
      }
    });

    setFilters(newFilters);
  }, [location.search]);

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (value && !Array.isArray(value)) {
        params.set(key, value);
      }
    });

    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL, { replace: true });
  };

  const handleCategoryChange = (category, checked) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    updateFilters('categories', newCategories);
  };

  const handlePricingChange = (pricing, checked) => {
    const newPricing = checked
      ? [...filters.pricing, pricing]
      : filters.pricing.filter(p => p !== pricing);
    updateFilters('pricing', newPricing);
  };

  const handleFeatureChange = (feature, checked) => {
    const newFeatures = checked
      ? [...filters.features, feature]
      : filters.features.filter(f => f !== feature);
    updateFilters('features', newFeatures);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      pricing: [],
      features: [],
      rating: '',
      sortBy: 'relevance',
      dateAdded: '',
      searchQuery: filters.searchQuery // Keep search query
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return filters.categories.length + 
           filters.pricing.length + 
           filters.features.length + 
           (filters.rating ? 1 : 0) + 
           (filters.dateAdded ? 1 : 0);
  };

  const panelContent = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            disabled={getActiveFilterCount() === 0}
          >
            Clear All
          </Button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Sort By</h4>
        <Select
          options={sortOptions}
          value={filters.sortBy}
          onChange={(value) => updateFilters('sortBy', value)}
          placeholder="Select sorting"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Categories</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categoryOptions.map((category) => (
            <Checkbox
              key={category.value}
              label={category.label}
              checked={filters.categories.includes(category.value)}
              onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Pricing</h4>
        <div className="space-y-2">
          {pricingOptions.map((pricing) => (
            <Checkbox
              key={pricing.value}
              label={pricing.label}
              checked={filters.pricing.includes(pricing.value)}
              onChange={(e) => handlePricingChange(pricing.value, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Minimum Rating</h4>
        <Select
          options={ratingOptions}
          value={filters.rating}
          onChange={(value) => updateFilters('rating', value)}
          placeholder="Any rating"
        />
      </div>

      {/* Date Added */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Date Added</h4>
        <Select
          options={dateOptions}
          value={filters.dateAdded}
          onChange={(value) => updateFilters('dateAdded', value)}
          placeholder="Any time"
        />
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h4 className="font-medium text-text-primary">Features</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {featureOptions.map((feature) => (
            <Checkbox
              key={feature.value}
              label={feature.label}
              checked={filters.features.includes(feature.value)}
              onChange={(e) => handleFeatureChange(feature.value, e.target.checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Desktop sidebar
  if (!onClose) {
    return (
      <div className={`w-80 bg-surface border-r border-border p-6 overflow-y-auto ${className}`}>
        {panelContent}
      </div>
    );
  }

  // Mobile modal
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-300 lg:hidden" onClick={onClose} />
      )}
      <div
        className={`fixed inset-x-0 bottom-0 bg-surface border-t border-border rounded-t-lg z-300 lg:hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 2rem)' }}>
          {panelContent}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;