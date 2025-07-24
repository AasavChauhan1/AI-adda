import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const SpecificationsStep = ({ formData, updateFormData, errors }) => {
  const pricingOptions = [
    { value: 'free', label: 'Free' },
    { value: 'freemium', label: 'Freemium (Free with paid upgrades)' },
    { value: 'paid', label: 'Paid Subscription' },
    { value: 'one-time', label: 'One-time Purchase' },
    { value: 'enterprise', label: 'Enterprise/Custom Pricing' },
    { value: 'usage-based', label: 'Usage-based Pricing' }
  ];

  const featureOptions = [
    { value: 'api', label: 'API Access' },
    { value: 'mobile', label: 'Mobile App Available' },
    { value: 'web', label: 'Web-based Interface' },
    { value: 'desktop', label: 'Desktop Application' },
    { value: 'collaboration', label: 'Team Collaboration' },
    { value: 'customization', label: 'Customizable Outputs' },
    { value: 'integration', label: 'Third-party Integrations' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'support', label: '24/7 Customer Support' },
    { value: 'training', label: 'Custom Model Training' },
    { value: 'batch', label: 'Batch Processing' },
    { value: 'realtime', label: 'Real-time Processing' }
  ];

  const integrationOptions = [
    { value: 'slack', label: 'Slack' },
    { value: 'discord', label: 'Discord' },
    { value: 'zapier', label: 'Zapier' },
    { value: 'google-workspace', label: 'Google Workspace' },
    { value: 'microsoft-365', label: 'Microsoft 365' },
    { value: 'notion', label: 'Notion' },
    { value: 'trello', label: 'Trello' },
    { value: 'asana', label: 'Asana' },
    { value: 'github', label: 'GitHub' },
    { value: 'gitlab', label: 'GitLab' },
    { value: 'figma', label: 'Figma' },
    { value: 'adobe', label: 'Adobe Creative Suite' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleCheckboxChange = (field, value, checked) => {
    const currentValues = formData[field] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);
    updateFormData({ [field]: newValues });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Technical Specifications</h2>
        <p className="text-text-secondary">
          Provide detailed information about pricing, features, and technical requirements.
        </p>
      </div>

      <div className="space-y-6">
        <Select
          label="Pricing Model"
          options={pricingOptions}
          value={formData.pricingModel || ''}
          onChange={(value) => handleInputChange('pricingModel', value)}
          error={errors.pricingModel}
          required
          placeholder="Select pricing model"
          description="Choose the pricing structure that best describes this tool"
        />

        {formData.pricingModel && formData.pricingModel !== 'free' && (
          <Input
            label="Pricing Details"
            type="text"
            placeholder="e.g., $20/month, $0.002 per token, Starting at $99"
            value={formData.pricingDetails || ''}
            onChange={(e) => handleInputChange('pricingDetails', e.target.value)}
            error={errors.pricingDetails}
            description="Provide specific pricing information if available"
          />
        )}

        <div>
          <CheckboxGroup 
            label="Key Features" 
            error={errors.features}
            className="space-y-3"
          >
            <p className="text-sm text-text-secondary mb-3">
              Select all features that apply to this tool
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featureOptions.map((feature) => (
                <Checkbox
                  key={feature.value}
                  label={feature.label}
                  checked={(formData.features || []).includes(feature.value)}
                  onChange={(e) => handleCheckboxChange('features', feature.value, e.target.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        <div>
          <CheckboxGroup 
            label="Supported Integrations" 
            className="space-y-3"
          >
            <p className="text-sm text-text-secondary mb-3">
              Select platforms and tools that integrate with this AI tool
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {integrationOptions.map((integration) => (
                <Checkbox
                  key={integration.value}
                  label={integration.label}
                  checked={(formData.integrations || []).includes(integration.value)}
                  onChange={(e) => handleCheckboxChange('integrations', integration.value, e.target.checked)}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Technical Requirements
          </label>
          <textarea
            placeholder="Describe any technical requirements, system specifications, or prerequisites needed to use this tool effectively."
            value={formData.technicalRequirements || ''}
            onChange={(e) => handleInputChange('technicalRequirements', e.target.value)}
            className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            maxLength={500}
          />
          <p className="text-xs text-text-secondary mt-1">
            Include browser requirements, hardware specs, or software dependencies
          </p>
        </div>

        <Input
          label="Free Trial/Demo Available"
          type="text"
          placeholder="e.g., 14-day free trial, Free tier with 100 requests/month"
          value={formData.freeTrial || ''}
          onChange={(e) => handleInputChange('freeTrial', e.target.value)}
          description="Describe any free trial, demo, or free tier options"
        />
      </div>
    </div>
  );
};

export default SpecificationsStep;