import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    'ChatGPT alternatives',
    'Image generation tools',
    'Code completion AI',
    'Writing assistants',
    'Data analysis tools',
    'Voice synthesis',
    'Translation services',
    'Content creation'
  ];

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Handle clicks outside search component
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (query = searchQuery) => {
    if (query.trim()) {
      // Add to search history
      const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      // Navigate to search page with query
      navigate(`/advanced-search-and-filtering?q=${encodeURIComponent(query)}`);
      setIsExpanded(false);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearchSubmit(suggestion);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const isSearchPage = location.pathname === '/advanced-search-and-filtering';

  return (
    <div ref={searchRef} className="relative">
      {/* Desktop Search */}
      <div className="hidden md:block">
        {!isExpanded ? (
          <button
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150 micro-interaction"
            title="Search AI tools"
          >
            <Icon name="Search" size={20} />
          </button>
        ) : (
          <div className="w-80 animate-fade-in">
            <div className="relative">
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                className="pl-10 pr-10"
              />
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {(showSuggestions || (searchQuery === '' && searchHistory.length > 0)) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md elevated-shadow z-200 animate-slide-up">
                {searchQuery === '' && searchHistory.length > 0 && (
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">Recent searches</span>
                      <button
                        onClick={clearSearchHistory}
                        className="text-xs text-text-secondary hover:text-text-primary"
                      >
                        Clear
                      </button>
                    </div>
                    {searchHistory.slice(0, 5).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                        className="w-full flex items-center space-x-2 px-2 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded transition-colors duration-150"
                      >
                        <Icon name="Clock" size={14} />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div className="p-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center space-x-2 px-2 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded transition-colors duration-150"
                      >
                        <Icon name="Search" size={14} />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-2 border-t border-border">
                  <button
                    onClick={() => navigate('/advanced-search-and-filtering')}
                    className="w-full flex items-center space-x-2 px-2 py-2 text-sm text-primary hover:bg-muted rounded transition-colors duration-150"
                  >
                    <Icon name="Settings" size={14} />
                    <span>Advanced search</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        <button
          onClick={() => navigate('/advanced-search-and-filtering')}
          className={`p-2 rounded-md transition-colors duration-150 micro-interaction ${
            isSearchPage
              ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
          }`}
          title="Search AI tools"
        >
          <Icon name="Search" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;