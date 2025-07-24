import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onVoiceSearch, onAdvancedToggle, isAdvancedOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const searchRef = useRef(null);

  const mockSuggestions = [
    "ChatGPT alternatives",
    "Image generation tools",
    "Code completion AI",
    "Writing assistants",
    "Data analysis tools",
    "Voice synthesis",
    "Translation services",
    "Content creation",
    "Video editing AI",
    "Research tools"
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query);

    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (query = searchQuery) => {
    if (query.trim()) {
      const newRecentSearches = [query, ...recentSearches.filter(item => item !== query)].slice(0, 10);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

      const params = new URLSearchParams(location.search);
      params.set('q', query);
      navigate(`${location.pathname}?${params.toString()}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearchSubmit(suggestion);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearchSubmit(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div ref={searchRef} className="relative">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search AI tools, categories, features..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowSuggestions(true)}
                className="pl-12 pr-24 text-lg h-14"
              />
              <Icon
                name="Search"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                  className="p-2"
                >
                  <Icon 
                    name={isListening ? "MicOff" : "Mic"} 
                    size={16} 
                    className={isListening ? "text-error animate-pulse" : "text-text-secondary"}
                  />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleSearchSubmit()}
                  className="px-4"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg elevated-shadow z-200 max-h-96 overflow-y-auto">
                {searchQuery === '' && recentSearches.length > 0 && (
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-text-primary">Recent searches</span>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={clearRecentSearches}
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.slice(0, 5).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-150"
                        >
                          <Icon name="Clock" size={14} />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-medium text-text-secondary px-3 py-2 mb-1">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-150"
                      >
                        <Icon name="Search" size={14} />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-2 border-t border-border">
                  <button
                    onClick={onAdvancedToggle}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors duration-150"
                  >
                    <Icon name="Settings" size={14} />
                    <span>{isAdvancedOpen ? 'Hide' : 'Show'} advanced filters</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={isAdvancedOpen ? "default" : "outline"}
              size="sm"
              onClick={onAdvancedToggle}
              iconName="Filter"
              iconPosition="left"
            >
              Advanced Filters
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>Quick filters:</span>
              <button
                onClick={() => handleSuggestionClick('free tools')}
                className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-text-primary transition-colors duration-150"
              >
                Free
              </button>
              <button
                onClick={() => handleSuggestionClick('popular tools')}
                className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-text-primary transition-colors duration-150"
              >
                Popular
              </button>
              <button
                onClick={() => handleSuggestionClick('new tools')}
                className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-text-primary transition-colors duration-150"
              >
                New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;