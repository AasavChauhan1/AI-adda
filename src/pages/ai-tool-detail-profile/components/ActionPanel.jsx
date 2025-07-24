import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActionPanel = ({ tool, isBookmarked, onBookmark, onAddToCollection, onShare, onRequestUpdate }) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock user collections
  const userCollections = [
    { value: 'favorites', label: 'My Favorites' },
    { value: 'work-tools', label: 'Work Tools' },
    { value: 'ai-writing', label: 'AI Writing Tools' },
    { value: 'research', label: 'Research Tools' }
  ];

  const handleAddToCollection = () => {
    if (selectedCollection) {
      onAddToCollection(selectedCollection);
      setShowCollectionModal(false);
      setSelectedCollection('');
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${tool.name} - ${tool.shortDescription}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-surface border-l border-border p-6 sticky top-24 h-fit">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
          
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="default"
            onClick={onBookmark}
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
            className="w-full"
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark Tool'}
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={() => setShowCollectionModal(true)}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            Add to Collection
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={() => setShowShareModal(true)}
            iconName="Share"
            iconPosition="left"
            className="w-full"
          >
            Share Tool
          </Button>

          <Button
            variant="ghost"
            size="default"
            onClick={onRequestUpdate}
            iconName="Flag"
            iconPosition="left"
            className="w-full"
          >
            Request Update
          </Button>
        </div>

        {/* Tool Stats */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="font-medium text-text-primary mb-4">Tool Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Total Users</span>
              <span className="text-sm font-medium text-text-primary">
                {tool.userCount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Reviews</span>
              <span className="text-sm font-medium text-text-primary">
                {tool.reviewCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Rating</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm font-medium text-text-primary">
                  {tool.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Last Updated</span>
              <span className="text-sm font-medium text-text-primary">
                {tool.lastUpdated || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
        <div className="flex space-x-3">
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="default"
            onClick={onBookmark}
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            className="flex-1"
          >
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>
          
          <Button
            variant="outline"
            size="default"
            onClick={() => setShowCollectionModal(true)}
            iconName="Plus"
            className="flex-1"
          >
            Add
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowShareModal(true)}
            iconName="Share"
          />
        </div>
      </div>

      {/* Collection Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Add to Collection</h3>
              <button
                onClick={() => setShowCollectionModal(false)}
                className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <Select
                label="Choose Collection"
                options={userCollections}
                value={selectedCollection}
                onChange={setSelectedCollection}
                placeholder="Select a collection"
              />
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCollectionModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleAddToCollection}
                  disabled={!selectedCollection}
                  className="flex-1"
                >
                  Add to Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Share Tool</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Icon name="Twitter" size={20} className="text-blue-500" />
                <span className="text-text-primary">Twitter</span>
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Icon name="Linkedin" size={20} className="text-blue-600" />
                <span className="text-text-primary">LinkedIn</span>
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Icon name="Facebook" size={20} className="text-blue-700" />
                <span className="text-text-primary">Facebook</span>
              </button>
              
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Icon name="Copy" size={20} className="text-text-secondary" />
                <span className="text-text-primary">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionPanel;