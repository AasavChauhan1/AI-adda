import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolTabs = ({ tool }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'pros-cons', label: 'Pros & Cons', icon: 'Scale' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' }
  ];

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => 
      prev === tool.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => 
      prev === 0 ? tool.screenshots.length - 1 : prev - 1
    );
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">About {tool.name}</h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tool.keyFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={16} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-1">{feature.title}</h4>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Gallery */}
      {tool.screenshots && tool.screenshots.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Screenshots</h3>
          <div className="relative">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src={tool.screenshots[currentScreenshot]}
                alt={`${tool.name} screenshot ${currentScreenshot + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {tool.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevScreenshot}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
                
                <div className="flex justify-center space-x-2 mt-4">
                  {tool.screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentScreenshot ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderProsAndCons = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pros */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
            <Icon name="ThumbsUp" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Pros</h3>
        </div>
        <div className="space-y-3">
          {tool.pros.map((pro, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Plus" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <p className="text-text-secondary">{pro}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cons */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-error rounded-lg flex items-center justify-center">
            <Icon name="ThumbsDown" size={16} color="white" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Cons</h3>
        </div>
        <div className="space-y-3">
          {tool.cons.map((con, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Minus" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-text-secondary">{con}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      {/* Rating Distribution */}
      <div className="bg-muted rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
          <div className="text-center mb-4 sm:mb-0">
            <div className="text-4xl font-bold text-text-primary mb-2">
              {tool.rating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={20}
                  className={star <= Math.floor(tool.rating) ? 'text-warning fill-current' : 'text-muted'}
                />
              ))}
            </div>
            <p className="text-sm text-text-secondary">{tool.reviewCount} reviews</p>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = tool.ratingDistribution[rating] || 0;
              const percentage = tool.reviewCount > 0 ? (count / tool.reviewCount) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3 mb-2">
                  <span className="text-sm text-text-secondary w-8">{rating}★</span>
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text-primary">User Reviews</h3>
        <Button variant="outline" iconName="Edit" iconPosition="left">
          Write Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {tool.reviews.map((review) => (
          <div key={review.id} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary-foreground">
                  {review.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-text-primary">{review.author}</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={14}
                        className={star <= review.rating ? 'text-warning fill-current' : 'text-muted'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">{review.date}</span>
                </div>
                <p className="text-text-secondary leading-relaxed">{review.content}</p>
                
                {review.helpful > 0 && (
                  <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border">
                    <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-text-primary">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpecifications = () => (
    <div className="space-y-8">
      {/* Technical Details */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Technical Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-text-secondary mb-1">Model Type</dt>
              <dd className="text-text-primary">{tool.specifications.modelType}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-secondary mb-1">API Available</dt>
              <dd className="text-text-primary">{tool.specifications.apiAvailable ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-secondary mb-1">Platform</dt>
              <dd className="text-text-primary">{tool.specifications.platform}</dd>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-text-secondary mb-1">Languages</dt>
              <dd className="text-text-primary">{tool.specifications.languages.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-secondary mb-1">Data Privacy</dt>
              <dd className="text-text-primary">{tool.specifications.dataPrivacy}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-text-secondary mb-1">License</dt>
              <dd className="text-text-primary">{tool.specifications.license}</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Integrations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tool.specifications.integrations.map((integration, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <Icon name="Link" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">{integration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Supported Tasks</h3>
        <div className="flex flex-wrap gap-2">
          {tool.specifications.supportedTasks.map((task, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {task}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'pros-cons':
        return renderProsAndCons();
      case 'reviews':
        return renderReviews();
      case 'specifications':
        return renderSpecifications();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ToolTabs;