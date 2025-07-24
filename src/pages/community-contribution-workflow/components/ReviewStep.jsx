import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewStep = ({ formData, onEdit, onSubmit, isSubmitting }) => {
  const formatList = (items) => {
    if (!items || items.length === 0) return 'Not specified';
    return items.filter(item => item.trim()).join(', ') || 'Not specified';
  };

  const formatFeatures = (features) => {
    if (!features || features.length === 0) return 'None selected';
    const featureLabels = {
      'api': 'API Access',
      'mobile': 'Mobile App',
      'web': 'Web Interface',
      'desktop': 'Desktop App',
      'collaboration': 'Team Collaboration',
      'customization': 'Customizable',
      'integration': 'Integrations',
      'analytics': 'Analytics',
      'support': '24/7 Support',
      'training': 'Custom Training',
      'batch': 'Batch Processing',
      'realtime': 'Real-time Processing'
    };
    return features.map(f => featureLabels[f] || f).join(', ');
  };

  const getCategoryLabel = (value) => {
    const categories = {
      'writing': 'Writing & Content Creation',
      'image': 'Image Generation & Editing',
      'code': 'Code Generation & Development',
      'data': 'Data Analysis & Visualization',
      'voice': 'Voice & Audio Processing',
      'video': 'Video Creation & Editing',
      'translation': 'Translation & Language',
      'chatbot': 'Chatbots & Conversational AI',
      'automation': 'Automation & Workflow',
      'research': 'Research & Analysis',
      'design': 'Design & Creative Tools',
      'productivity': 'Productivity & Organization'
    };
    return categories[value] || value;
  };

  const getPricingLabel = (value) => {
    const pricing = {
      'free': 'Free',
      'freemium': 'Freemium',
      'paid': 'Paid Subscription',
      'one-time': 'One-time Purchase',
      'enterprise': 'Enterprise Pricing',
      'usage-based': 'Usage-based Pricing'
    };
    return pricing[value] || value;
  };

  const ReviewSection = ({ title, icon, onEditClick, children }) => (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditClick}
          iconName="Edit"
          iconPosition="left"
        >
          Edit
        </Button>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Review Submission</h2>
        <p className="text-text-secondary">
          Please review all information before submitting. You can edit any section if needed.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <ReviewSection
          title="Basic Information"
          icon="Info"
          onEditClick={() => onEdit(1)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-1">Tool Name</h4>
              <p className="text-text-secondary">{formData.toolName || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Website URL</h4>
              <p className="text-text-secondary break-all">{formData.websiteUrl || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Category</h4>
              <p className="text-text-secondary">
                {formData.category ? getCategoryLabel(formData.category) : 'Not specified'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Company/Developer</h4>
              <p className="text-text-secondary">{formData.company || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Brief Description</h4>
              <p className="text-text-secondary">{formData.briefDescription || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Detailed Description</h4>
              <p className="text-text-secondary whitespace-pre-wrap">
                {formData.detailedDescription || 'Not specified'}
              </p>
            </div>
          </div>
        </ReviewSection>

        {/* Specifications */}
        <ReviewSection
          title="Technical Specifications"
          icon="Settings"
          onEditClick={() => onEdit(2)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-1">Pricing Model</h4>
              <p className="text-text-secondary">
                {formData.pricingModel ? getPricingLabel(formData.pricingModel) : 'Not specified'}
              </p>
              {formData.pricingDetails && (
                <p className="text-sm text-text-secondary mt-1">{formData.pricingDetails}</p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Key Features</h4>
              <p className="text-text-secondary">{formatFeatures(formData.features)}</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Integrations</h4>
              <p className="text-text-secondary">{formatList(formData.integrations)}</p>
            </div>
            {formData.technicalRequirements && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Technical Requirements</h4>
                <p className="text-text-secondary whitespace-pre-wrap">{formData.technicalRequirements}</p>
              </div>
            )}
            {formData.freeTrial && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Free Trial/Demo</h4>
                <p className="text-text-secondary">{formData.freeTrial}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Media */}
        <ReviewSection
          title="Media & Assets"
          icon="Image"
          onEditClick={() => onEdit(3)}
        >
          <div className="space-y-4">
            {formData.screenshots && formData.screenshots.length > 0 && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Screenshots</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {formData.screenshots.map((screenshot, index) => (
                    <div key={screenshot.id} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={screenshot.url}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {formData.logo && formData.logo.length > 0 && (
              <div>
                <h4 className="font-medium text-text-primary mb-2">Logo</h4>
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={formData.logo[0].url}
                    alt="Tool logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {formData.demoVideoUrl && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Demo Video URL</h4>
                <p className="text-text-secondary break-all">{formData.demoVideoUrl}</p>
              </div>
            )}

            {formData.liveDemoUrl && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Live Demo URL</h4>
                <p className="text-text-secondary break-all">{formData.liveDemoUrl}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Analysis */}
        <ReviewSection
          title="Analysis & Use Cases"
          icon="BarChart"
          onEditClick={() => onEdit(4)}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-1">Pros</h4>
              <ul className="text-text-secondary space-y-1">
                {(formData.pros || []).filter(pro => pro.trim()).map((pro, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Plus" size={14} className="text-success mt-1 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
                {(!formData.pros || formData.pros.filter(pro => pro.trim()).length === 0) && (
                  <li className="text-text-secondary">Not specified</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-1">Cons</h4>
              <ul className="text-text-secondary space-y-1">
                {(formData.cons || []).filter(con => con.trim()).map((con, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Minus" size={14} className="text-error mt-1 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
                {(!formData.cons || formData.cons.filter(con => con.trim()).length === 0) && (
                  <li className="text-text-secondary">Not specified</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-1">Use Cases</h4>
              <ul className="text-text-secondary space-y-1">
                {(formData.useCases || []).filter(useCase => useCase.trim()).map((useCase, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Target" size={14} className="text-primary mt-1 flex-shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
                {(!formData.useCases || formData.useCases.filter(useCase => useCase.trim()).length === 0) && (
                  <li className="text-text-secondary">Not specified</li>
                )}
              </ul>
            </div>

            {formData.targetAudience && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Target Audience</h4>
                <p className="text-text-secondary whitespace-pre-wrap">{formData.targetAudience}</p>
              </div>
            )}

            {formData.differentiators && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Key Differentiators</h4>
                <p className="text-text-secondary whitespace-pre-wrap">{formData.differentiators}</p>
              </div>
            )}

            {formData.importantNotes && (
              <div>
                <h4 className="font-medium text-text-primary mb-1">Important Notes</h4>
                <p className="text-text-secondary whitespace-pre-wrap">{formData.importantNotes}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Submission Actions */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-text-primary mb-2">Before You Submit</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Your submission will be reviewed by our moderation team</li>
                <li>• Review process typically takes 2-3 business days</li>
                <li>• You'll earn 50-100 points for approved submissions</li>
                <li>• You can track submission status in your profile</li>
                <li>• Make sure all information is accurate and up-to-date</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={onSubmit}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
            <Button
              variant="outline"
              onClick={() => onEdit(1)}
              iconName="Edit"
              iconPosition="left"
            >
              Make Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;