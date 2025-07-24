import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonModal = ({ tools, onClose, onRemoveTool }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} className="text-accent fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={14} className="text-accent fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-border" />);
    }

    return stars;
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

  const comparisonFeatures = [
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'userCount', label: 'Users', type: 'number' },
    { key: 'pricing', label: 'Pricing', type: 'pricing' },
    { key: 'categories', label: 'Categories', type: 'array' },
    { key: 'modelType', label: 'Model Type', type: 'text' },
    { key: 'taskTypes', label: 'Task Types', type: 'array' },
    { key: 'integrations', label: 'Integrations', type: 'array' },
    { key: 'licensing', label: 'Licensing', type: 'text' },
    { key: 'lastUpdated', label: 'Last Updated', type: 'text' }
  ];

  const renderFeatureValue = (tool, feature) => {
    const value = tool[feature.key];
    
    switch (feature.type) {
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            {renderStars(value)}
            <span className="ml-1 text-sm">{value}</span>
          </div>
        );
      case 'number':
        return <span className="text-sm">{value.toLocaleString()}</span>;
      case 'pricing':
        return (
          <span className={`text-xs px-2 py-1 rounded-full ${getPricingColor(value)}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      case 'array':
        return (
          <div className="flex flex-wrap gap-1">
            {value.slice(0, 3).map((item, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full">
                {item}
              </span>
            ))}
            {value.length > 3 && (
              <span className="text-xs text-text-secondary">+{value.length - 3}</span>
            )}
          </div>
        );
      case 'text':
        return <span className="text-sm capitalize">{value}</span>;
      default:
        return <span className="text-sm">{value}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-400 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">
              Compare AI Tools ({tools.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Tool Headers */}
            <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: `200px repeat(${tools.length}, 1fr)` }}>
              <div></div>
              {tools.map((tool) => (
                <div key={tool.id} className="text-center">
                  <div className="relative mb-4">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      className="w-20 h-20 rounded-lg object-cover mx-auto"
                    />
                    <button
                      onClick={() => onRemoveTool(tool.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs hover:bg-error/80 transition-colors"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{tool.name}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2">{tool.description}</p>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(tool.website, '_blank')}
                      fullWidth
                    >
                      Visit Tool
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="space-y-4">
              {comparisonFeatures.map((feature) => (
                <div
                  key={feature.key}
                  className="grid gap-6 py-4 border-b border-border last:border-b-0"
                  style={{ gridTemplateColumns: `200px repeat(${tools.length}, 1fr)` }}
                >
                  <div className="font-medium text-text-primary">{feature.label}</div>
                  {tools.map((tool) => (
                    <div key={tool.id} className="flex justify-center">
                      {renderFeatureValue(tool, feature)}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Detailed Descriptions */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Detailed Descriptions</h3>
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${tools.length}, 1fr)` }}>
                {tools.map((tool) => (
                  <div key={tool.id} className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-2">{tool.name}</h4>
                    <p className="text-sm text-text-secondary">{tool.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={14} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {tool.userCount.toLocaleString()} users
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} className="text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          Updated {tool.lastUpdated}
                        </span>
                      </div>
                      {tool.isVerified && (
                        <div className="flex items-center space-x-2">
                          <Icon name="BadgeCheck" size={14} className="text-primary" />
                          <span className="text-xs text-primary">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="text-sm text-text-secondary">
            Comparing {tools.length} tools • Last updated {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                const toolNames = tools.map(t => t.name).join(' vs ');
                navigator.clipboard.writeText(`${toolNames} comparison - ${window.location.href}`);
              }}
              iconName="Share"
              iconPosition="left"
            >
              Share Comparison
            </Button>
            <Button variant="default" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;