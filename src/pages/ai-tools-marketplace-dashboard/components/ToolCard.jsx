import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolCard = ({ tool, onBookmark }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(tool.isBookmarked || false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(tool.id, !isBookmarked);
  };

  const handleCardClick = () => {
    navigate('/ai-tool-detail-profile', { state: { toolId: tool.id } });
  };

  const getPricingColor = (pricing) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'bg-success text-success-foreground';
      case 'freemium':
        return 'bg-warning text-warning-foreground';
      case 'paid':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'writing': 'bg-blue-100 text-blue-800',
      'image': 'bg-purple-100 text-purple-800',
      'code': 'bg-green-100 text-green-800',
      'data': 'bg-orange-100 text-orange-800',
      'voice': 'bg-pink-100 text-pink-800',
      'video': 'bg-indigo-100 text-indigo-800',
      'translation': 'bg-teal-100 text-teal-800',
      'chatbot': 'bg-cyan-100 text-cyan-800',
      'automation': 'bg-red-100 text-red-800',
      'research': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-card border border-border rounded-lg overflow-hidden ambient-shadow contextual-hover cursor-pointer group"
    >
      {/* Tool Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {tool.isSponsored && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            Sponsored
          </div>
        )}
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-150 micro-interaction"
        >
          <Icon
            name={isBookmarked ? "Heart" : "Heart"}
            size={16}
            className={isBookmarked ? "text-red-500 fill-current" : "text-gray-600"}
          />
        </button>
      </div>

      {/* Tool Content */}
      <div className="p-4 space-y-3">
        {/* Tool Name and Category */}
        <div className="space-y-2">
          <h3 className="font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-colors duration-150">
            {tool.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPricingColor(tool.pricing)}`}>
              {tool.pricing}
            </span>
          </div>
        </div>

        {/* Tool Description */}
        <p className="text-sm text-text-secondary line-clamp-2">
          {tool.description}
        </p>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {renderStars(tool.rating)}
            </div>
            <span className="text-sm text-text-secondary">
              {tool.rating} ({tool.reviewCount})
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{tool.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{tool.users}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
          onClick={(e) => {
            e.stopPropagation();
            window.open(tool.url, '_blank');
          }}
        >
          Try Now
        </Button>
      </div>
    </div>
  );
};

export default ToolCard;