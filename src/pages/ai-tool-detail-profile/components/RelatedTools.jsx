import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedTools = ({ currentTool }) => {
  const navigate = useNavigate();

  // Mock related tools data
  const relatedTools = [
    {
      id: 2,
      name: "Claude AI",
      shortDescription: "Advanced AI assistant for complex reasoning and analysis",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center",
      rating: 4.7,
      reviewCount: 892,
      pricing: "Freemium",
      categories: ["Writing & Content", "Research"],
      userCount: 125000
    },
    {
      id: 3,
      name: "Jasper AI",
      shortDescription: "AI writing assistant for marketing and content creation",
      logo: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=100&h=100&fit=crop&crop=center",
      rating: 4.5,
      reviewCount: 1456,
      pricing: "Paid",
      categories: ["Writing & Content", "Marketing"],
      userCount: 89000
    },
    {
      id: 4,
      name: "Copy.ai",
      shortDescription: "AI-powered copywriting tool for businesses",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center",
      rating: 4.3,
      reviewCount: 743,
      pricing: "Freemium",
      categories: ["Writing & Content", "Marketing"],
      userCount: 67000
    },
    {
      id: 5,
      name: "Writesonic",
      shortDescription: "AI writing platform for content creation and SEO",
      logo: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=100&h=100&fit=crop&crop=center",
      rating: 4.4,
      reviewCount: 621,
      pricing: "Freemium",
      categories: ["Writing & Content", "SEO"],
      userCount: 54000
    },
    {
      id: 6,
      name: "Grammarly",
      shortDescription: "AI-powered writing assistant and grammar checker",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center",
      rating: 4.6,
      reviewCount: 2341,
      pricing: "Freemium",
      categories: ["Writing & Content", "Productivity"],
      userCount: 234000
    }
  ];

  const handleToolClick = (toolId) => {
    navigate(`/ai-tool-detail-profile?id=${toolId}`);
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
    <div className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:pr-80">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Related Tools</h2>
              <p className="text-text-secondary">
                Discover similar AI tools that might interest you
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/advanced-search-and-filtering')}
              iconName="Search"
              iconPosition="left"
            >
              Browse All
            </Button>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => handleToolClick(tool.id)}
              >
                {/* Tool Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-1 truncate">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Categories and Pricing */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {tool.categories.slice(0, 2).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPricingBadgeColor(tool.pricing)}`}>
                    {tool.pricing}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={12}
                          className={star <= Math.floor(tool.rating) ? 'text-warning fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-text-primary">
                      {tool.rating.toFixed(1)}
                    </span>
                    <span>({tool.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{(tool.userCount / 1000).toFixed(0)}k users</span>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Bookmark tool:', tool.id);
                      }}
                      iconName="Bookmark"
                      className="flex-1"
                    >
                      Save
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToolClick(tool.id);
                      }}
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="flex-1"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/advanced-search-and-filtering')}
              iconName="Plus"
              iconPosition="left"
            >
              View More Related Tools
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTools;