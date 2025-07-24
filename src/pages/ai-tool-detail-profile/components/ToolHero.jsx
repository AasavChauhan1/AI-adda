import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolHero = ({ tool, onBookmark, onAddToCollection, onShare, isBookmarked }) => {
  const handleExternalAccess = () => {
    window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer');
  };

  const getPricingBadgeColor = (pricing) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'bg-success text-success-foreground';
      case 'freemium':
        return 'bg-warning text-warning-foreground';
      case 'paid':
        return 'bg-primary text-primary-foreground';
      case 'enterprise':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Tool Logo and Basic Info */}
          <div className="flex items-start space-x-4 mb-6 lg:mb-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                {tool.name}
              </h1>
              <p className="text-text-secondary mb-3 line-clamp-2">
                {tool.shortDescription}
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {tool.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-text-secondary text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPricingBadgeColor(tool.pricing)}`}>
                  {tool.pricing}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-0 lg:space-y-3 lg:w-48 flex-shrink-0">
            <Button
              variant="default"
              size="lg"
              onClick={handleExternalAccess}
              iconName="ExternalLink"
              iconPosition="right"
              className="w-full"
            >
              Try {tool.name}
            </Button>
            
            <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
              <Button
                variant="outline"
                size="default"
                onClick={onBookmark}
                iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                className="flex-1 sm:w-full"
              >
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                size="default"
                onClick={onAddToCollection}
                iconName="Plus"
                className="flex-1 sm:w-full"
              >
                Add
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onShare}
                iconName="Share"
                className="flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Tool Stats */}
        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={16}
                  className={star <= Math.floor(tool.rating) ? 'text-warning fill-current' : 'text-muted'}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {tool.rating.toFixed(1)}
            </span>
            <span className="text-sm text-text-secondary">
              ({tool.reviewCount} reviews)
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Users" size={16} />
            <span>{tool.userCount.toLocaleString()} users</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Calendar" size={16} />
            <span>Added {tool.dateAdded}</span>
          </div>
          
          {tool.lastUpdated && (
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="RefreshCw" size={16} />
              <span>Updated {tool.lastUpdated}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolHero;