import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolCard = ({ tool, viewMode = 'grid', isSelected, onSelect, onCompare }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(tool.isBookmarked || false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // In real app, this would make an API call
  };

  const handleCardClick = () => {
    navigate(`/ai-tool-detail-profile?id=${tool.id}`);
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    onCompare(tool.id);
  };

  const getPricingColor = (pricing) => {
    switch (pricing) {
      case 'free': return 'bg-success text-success-foreground';
      case 'freemium': return 'bg-accent text-accent-foreground';
      case 'paid': return 'bg-primary text-primary-foreground';
      case 'enterprise': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={12} className="text-accent fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={12} className="text-accent fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-border" />);
    }

    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
        onClick={handleCardClick}
      >
        <div className="flex items-start space-x-4">
          {/* Selection Checkbox */}
          <div className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(tool.id);
              }}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
          </div>

          {/* Tool Image */}
          <div className="flex-shrink-0">
            <Image
              src={tool.image}
              alt={tool.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  {tool.isVerified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                  {tool.isNew && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>

                <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(tool.rating)}
                    <span className="ml-1">{tool.rating}</span>
                    <span>({tool.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{tool.userCount.toLocaleString()} users</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{tool.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPricingColor(tool.pricing)}`}>
                    {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                  </span>
                  {tool.categories.slice(0, 2).map((category) => (
                    <span key={category} className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full">
                      {category}
                    </span>
                  ))}
                  {tool.categories.length > 2 && (
                    <span className="text-xs text-text-secondary">
                      +{tool.categories.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon 
                    name={isBookmarked ? "Heart" : "Heart"} 
                    size={16} 
                    className={isBookmarked ? "text-error fill-current" : "text-text-secondary"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCompareToggle}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="GitCompare" size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(tool.website, '_blank');
                  }}
                >
                  Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(tool.id);
          }}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
        />
      </div>

      {/* Tool Image */}
      <div className="relative">
        <Image
          src={tool.image}
          alt={tool.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          {tool.isNew && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          <button
            onClick={handleBookmark}
            className="p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon 
              name={isBookmarked ? "Heart" : "Heart"} 
              size={16} 
              className={isBookmarked ? "text-error fill-current" : "text-text-secondary"}
            />
          </button>
        </div>
      </div>

      {/* Tool Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
              {tool.name}
            </h3>
            {tool.isVerified && (
              <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
            )}
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex items-center space-x-1 mb-3">
          {renderStars(tool.rating)}
          <span className="text-sm text-text-secondary ml-1">
            {tool.rating} ({tool.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{tool.userCount.toLocaleString()}</span>
          </div>
          <span>{tool.lastUpdated}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-2 py-1 rounded-full ${getPricingColor(tool.pricing)}`}>
            {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
          </span>
          <div className="flex items-center space-x-1">
            {tool.categories.slice(0, 1).map((category) => (
              <span key={category} className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full">
                {category}
              </span>
            ))}
            {tool.categories.length > 1 && (
              <span className="text-xs text-text-secondary">
                +{tool.categories.length - 1}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              window.open(tool.website, '_blank');
            }}
          >
            Visit Tool
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCompareToggle}
            className="flex-shrink-0"
          >
            <Icon name="GitCompare" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;