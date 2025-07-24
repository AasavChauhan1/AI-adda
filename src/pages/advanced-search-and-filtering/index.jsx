import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationTabs from '../../components/ui/NavigationTabs';
import SearchHeader from './components/SearchHeader';
import FilterSidebar from './components/FilterSidebar';
import SearchResults from './components/SearchResults';
import SavedSearches from './components/SavedSearches';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdvancedSearchAndFiltering = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showSavedSearches, setShowSavedSearches] = useState(false);

  useEffect(() => {
    // Load user preferences
    const savedViewMode = localStorage.getItem('searchViewMode');
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('searchViewMode', mode);
  };

  const handleAdvancedToggle = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <>
      <Helmet>
        <title>Advanced Search & Filtering - AI Tools Hub</title>
        <meta name="description" content="Discover AI tools with powerful search and filtering capabilities. Find the perfect AI solution for your needs with advanced filters, comparisons, and detailed insights." />
        <meta name="keywords" content="AI tools search, AI tool finder, artificial intelligence, machine learning tools, AI marketplace" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Search Header */}
        <SearchHeader
          onVoiceSearch={() => {}}
          onAdvancedToggle={handleAdvancedToggle}
          isAdvancedOpen={showAdvancedFilters}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto flex">
          {/* Desktop Filter Sidebar */}
          <div className={`hidden lg:block transition-all duration-300 ${
            showAdvancedFilters ? 'w-80' : 'w-0 overflow-hidden'
          }`}>
            {showAdvancedFilters && (
              <FilterSidebar className="sticky top-0 h-screen" />
            )}
          </div>

          {/* Search Results */}
          <div className="flex-1 min-w-0">
            <SearchResults
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden fixed bottom-20 right-4 z-200">
          <Button
            variant="default"
            size="lg"
            onClick={() => setShowMobileFilters(true)}
            iconName="Filter"
            className="rounded-full shadow-lg"
          >
            Filters
          </Button>
        </div>

        {/* Floating Action Buttons */}
        <div className="hidden lg:block fixed bottom-6 right-6 z-200">
          <div className="flex flex-col space-y-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSavedSearches(true)}
              className="rounded-full shadow-lg bg-surface"
              title="Saved Searches"
            >
              <Icon name="Bookmark" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full shadow-lg bg-surface"
              title="Scroll to Top"
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
        />

        {/* Saved Searches Modal */}
        <SavedSearches
          isOpen={showSavedSearches}
          onClose={() => setShowSavedSearches(false)}
        />

        {/* Mobile Navigation */}
        <NavigationTabs />
      </div>
    </>
  );
};

export default AdvancedSearchAndFiltering;