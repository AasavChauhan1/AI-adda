import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    categories: [],
    pricing: [],
    features: [],
    modelTypes: [],
    taskTypes: [],
    integrations: [],
    licensing: [],
    rating: '',
    priceRange: [0, 1000],
    sortBy: 'relevance',
    dateAdded: '',
    tags: []
  });

  const categoryOptions = [
    { value: 'writing', label: 'Writing & Content', count: 245 },
    { value: 'image', label: 'Image Generation', count: 189 },
    { value: 'code', label: 'Code & Development', count: 156 },
    { value: 'data', label: 'Data Analysis', count: 134 },
    { value: 'voice', label: 'Voice & Audio', count: 98 },
    { value: 'video', label: 'Video Creation', count: 87 },
    { value: 'translation', label: 'Translation', count: 76 },
    { value: 'chatbot', label: 'Chatbots', count: 65 },
    { value: 'automation', label: 'Automation', count: 54 },
    { value: 'research', label: 'Research', count: 43 }
  ];

  const pricingOptions = [
    { value: 'free', label: 'Free', count: 312 },
    { value: 'freemium', label: 'Freemium', count: 456 },
    { value: 'paid', label: 'Paid', count: 234 },
    { value: 'enterprise', label: 'Enterprise', count: 89 }
  ];

  const modelTypeOptions = [
    { value: 'llm', label: 'Large Language Model', count: 234 },
    { value: 'vision', label: 'Computer Vision', count: 189 },
    { value: 'audio', label: 'Audio Processing', count: 123 },
    { value: 'multimodal', label: 'Multimodal', count: 98 },
    { value: 'nlp', label: 'Natural Language Processing', count: 167 },
    { value: 'ml', label: 'Machine Learning', count: 145 }
  ];

  const taskTypeOptions = [
    { value: 'generation', label: 'Content Generation', count: 298 },
    { value: 'summarization', label: 'Text Summarization', count: 156 },
    { value: 'translation', label: 'Language Translation', count: 134 },
    { value: 'analysis', label: 'Data Analysis', count: 189 },
    { value: 'classification', label: 'Classification', count: 123 },
    { value: 'extraction', label: 'Information Extraction', count: 98 }
  ];

  const integrationOptions = [
    { value: 'api', label: 'REST API', count: 456 },
    { value: 'webhook', label: 'Webhooks', count: 234 },
    { value: 'zapier', label: 'Zapier', count: 189 },
    { value: 'slack', label: 'Slack', count: 167 },
    { value: 'discord', label: 'Discord', count: 123 },
    { value: 'chrome', label: 'Chrome Extension', count: 98 }
  ];

  const licensingOptions = [
    { value: 'commercial', label: 'Commercial Use', count: 567 },
    { value: 'opensource', label: 'Open Source', count: 234 },
    { value: 'academic', label: 'Academic Use', count: 123 },
    { value: 'personal', label: 'Personal Use Only', count: 89 }
  ];

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

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' }
  ];

  const dateOptions = [
    { value: '', label: 'Any Time' },
    { value: 'day', label: 'Past 24 Hours' },
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: '3months', label: 'Past 3 Months' },
    { value: 'year', label: 'Past Year' }
  ];

  const popularTags = [
    'AI Assistant', 'GPT', 'OpenAI', 'Machine Learning', 'Deep Learning',
    'Neural Network', 'Transformer', 'Computer Vision', 'NLP', 'Automation',
    'Productivity', 'Creative', 'Business', 'Developer Tools', 'API'
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newFilters = { ...filters };

    urlParams.forEach((value, key) => {
      if (['categories', 'pricing', 'features', 'modelTypes', 'taskTypes', 'integrations', 'licensing', 'tags'].includes(key)) {
        newFilters[key] = value.split(',').filter(Boolean);
      } else if (key === 'priceRange') {
        newFilters[key] = value.split(',').map(Number);
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
    const params = new URLSearchParams(location.search);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (key === 'priceRange' && Array.isArray(value)) {
        if (value[0] !== 0 || value[1] !== 1000) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else if (value && !Array.isArray(value)) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleArrayFilterChange = (filterKey, item, checked) => {
    const currentArray = filters[filterKey];
    const newArray = checked
      ? [...currentArray, item]
      : currentArray.filter(i => i !== item);
    updateFilters(filterKey, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      pricing: [],
      features: [],
      modelTypes: [],
      taskTypes: [],
      integrations: [],
      licensing: [],
      rating: '',
      priceRange: [0, 1000],
      sortBy: 'relevance',
      dateAdded: '',
      tags: []
    };
    setFilters(clearedFilters);
    updateURL(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return filters.categories.length + 
           filters.pricing.length + 
           filters.features.length +
           filters.modelTypes.length +
           filters.taskTypes.length +
           filters.integrations.length +
           filters.licensing.length +
           filters.tags.length +
           (filters.rating ? 1 : 0) + 
           (filters.dateAdded ? 1 : 0) +
           (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 ? 1 : 0);
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <div className="border-b border-border pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <h4 className="font-medium text-text-primary">{title}</h4>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && <div className="mt-3">{children}</div>}
      </div>
    );
  };

  const CheckboxList = ({ options, filterKey, maxVisible = 5 }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleOptions = showAll ? options : options.slice(0, maxVisible);

    return (
      <div className="space-y-2">
        {visibleOptions.map((option) => (
          <div key={option.value} className="flex items-center justify-between">
            <Checkbox
              label={option.label}
              checked={filters[filterKey].includes(option.value)}
              onChange={(e) => handleArrayFilterChange(filterKey, option.value, e.target.checked)}
            />
            <span className="text-xs text-text-secondary">({option.count})</span>
          </div>
        ))}
        {options.length > maxVisible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-xs"
          >
            {showAll ? 'Show Less' : `Show ${options.length - maxVisible} More`}
          </Button>
        )}
      </div>
    );
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
      <FilterSection title="Sort By">
        <Select
          options={sortOptions}
          value={filters.sortBy}
          onChange={(value) => updateFilters('sortBy', value)}
          placeholder="Select sorting"
        />
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories">
        <CheckboxList options={categoryOptions} filterKey="categories" />
      </FilterSection>

      {/* Pricing */}
      <FilterSection title="Pricing Model">
        <CheckboxList options={pricingOptions} filterKey="pricing" maxVisible={4} />
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => updateFilters('priceRange', [Number(e.target.value), filters.priceRange[1]])}
              className="w-20"
            />
            <span className="text-text-secondary">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilters('priceRange', [filters.priceRange[0], Number(e.target.value)])}
              className="w-20"
            />
          </div>
          <div className="text-xs text-text-secondary">
            ${filters.priceRange[0]} - ${filters.priceRange[1]} per month
          </div>
        </div>
      </FilterSection>

      {/* Model Types */}
      <FilterSection title="Model Category">
        <CheckboxList options={modelTypeOptions} filterKey="modelTypes" />
      </FilterSection>

      {/* Task Types */}
      <FilterSection title="Task Type">
        <CheckboxList options={taskTypeOptions} filterKey="taskTypes" />
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating">
        <Select
          options={ratingOptions}
          value={filters.rating}
          onChange={(value) => updateFilters('rating', value)}
          placeholder="Any rating"
        />
      </FilterSection>

      {/* Date Added */}
      <FilterSection title="Date Added">
        <Select
          options={dateOptions}
          value={filters.dateAdded}
          onChange={(value) => updateFilters('dateAdded', value)}
          placeholder="Any time"
        />
      </FilterSection>

      {/* Integrations */}
      <FilterSection title="Integrations" defaultOpen={false}>
        <CheckboxList options={integrationOptions} filterKey="integrations" />
      </FilterSection>

      {/* Licensing */}
      <FilterSection title="Licensing" defaultOpen={false}>
        <CheckboxList options={licensingOptions} filterKey="licensing" maxVisible={4} />
      </FilterSection>

      {/* Popular Tags */}
      <FilterSection title="Popular Tags" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const isSelected = filters.tags.includes(tag);
                handleArrayFilterChange('tags', tag, !isSelected);
              }}
              className={`px-3 py-1 text-xs rounded-full border transition-colors duration-150 ${
                filters.tags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-text-secondary border-border hover:border-primary hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  // Desktop sidebar
  if (!onClose) {
    return (
      <div className={`w-80 bg-surface border-r border-border overflow-y-auto ${className}`}>
        <div className="p-6">
          {panelContent}
        </div>
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
        style={{ maxHeight: '85vh' }}
      >
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 4rem)' }}>
          {panelContent}
        </div>
        <div className="p-4 border-t border-border bg-surface">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
          >
            Apply Filters ({getActiveFilterCount()})
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;