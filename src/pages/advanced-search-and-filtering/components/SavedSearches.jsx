import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearches = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearchClick = (search) => {
    navigate(`/advanced-search-and-filtering${search.url}`);
    onClose();
  };

  const handleDeleteSearch = (searchId) => {
    const updated = savedSearches.filter(search => search.id !== searchId);
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  };

  const clearAllSearches = () => {
    setSavedSearches([]);
    localStorage.removeItem('savedSearches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">
              Saved Searches ({savedSearches.length})
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {savedSearches.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllSearches}
              >
                Clear All
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(80vh-80px)]">
          {savedSearches.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No saved searches</h3>
              <p className="text-text-secondary mb-4">
                Save your search queries to quickly access them later.
              </p>
              <Button variant="outline" onClick={onClose}>
                Start Searching
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer group"
                  onClick={() => handleSearchClick(search)}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                      {search.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                      <span>{search.resultCount} results</span>
                      <span>•</span>
                      <span>Saved {new Date(search.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSearch(search.id);
                      }}
                      iconName="Trash2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;