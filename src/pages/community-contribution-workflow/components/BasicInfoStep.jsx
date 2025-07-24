import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicInfoStep = ({ formData, updateFormData, errors }) => {
  const categoryOptions = [
    { value: 'writing', label: 'Writing & Content Creation' },
    { value: 'image', label: 'Image Generation & Editing' },
    { value: 'code', label: 'Code Generation & Development' },
    { value: 'data', label: 'Data Analysis & Visualization' },
    { value: 'voice', label: 'Voice & Audio Processing' },
    { value: 'video', label: 'Video Creation & Editing' },
    { value: 'translation', label: 'Translation & Language' },
    { value: 'chatbot', label: 'Chatbots & Conversational AI' },
    { value: 'automation', label: 'Automation & Workflow' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'design', label: 'Design & Creative Tools' },
    { value: 'productivity', label: 'Productivity & Organization' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const getCharacterCount = (text, maxLength) => {
    const count = text ? text.length : 0;
    return `${count}/${maxLength}`;
  };

  const getCharacterCountColor = (text, maxLength) => {
    const count = text ? text.length : 0;
    if (count > maxLength * 0.9) return 'text-warning';
    if (count > maxLength * 0.8) return 'text-accent';
    return 'text-text-secondary';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Basic Information</h2>
        <p className="text-text-secondary">
          Let's start with the essential details about the AI tool you want to submit.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Tool Name"
          type="text"
          placeholder="e.g., ChatGPT, Midjourney, GitHub Copilot"
          value={formData.toolName || ''}
          onChange={(e) => handleInputChange('toolName', e.target.value)}
          error={errors.toolName}
          required
          description="Enter the official name of the AI tool"
        />

        <Input
          label="Website URL"
          type="url"
          placeholder="https://example.com"
          value={formData.websiteUrl || ''}
          onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
          error={errors.websiteUrl}
          required
          description="Official website or main access point for the tool"
        />

        <Select
          label="Primary Category"
          options={categoryOptions}
          value={formData.category || ''}
          onChange={(value) => handleInputChange('category', value)}
          error={errors.category}
          required
          placeholder="Select the main category"
          description="Choose the category that best describes the tool's primary function"
        />

        <div>
          <Input
            label="Brief Description"
            type="text"
            placeholder="A concise overview of what this AI tool does and its main benefits"
            value={formData.briefDescription || ''}
            onChange={(e) => handleInputChange('briefDescription', e.target.value)}
            error={errors.briefDescription}
            required
            maxLength={200}
            description="Provide a clear, concise description of the tool's purpose and key benefits"
          />
          <div className={`text-xs mt-1 text-right ${getCharacterCountColor(formData.briefDescription, 200)}`}>
            {getCharacterCount(formData.briefDescription, 200)}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Detailed Description
            <span className="text-error ml-1">*</span>
          </label>
          <textarea
            placeholder="Provide a comprehensive description of the tool's features, capabilities, and use cases. Include information about its AI technology, target audience, and what makes it unique."
            value={formData.detailedDescription || ''}
            onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            maxLength={1000}
          />
          {errors.detailedDescription && (
            <p className="text-error text-sm mt-1">{errors.detailedDescription}</p>
          )}
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-text-secondary">
              Provide detailed information about features, use cases, and target audience
            </p>
            <div className={`text-xs ${getCharacterCountColor(formData.detailedDescription, 1000)}`}>
              {getCharacterCount(formData.detailedDescription, 1000)}
            </div>
          </div>
        </div>

        <Input
          label="Company/Developer"
          type="text"
          placeholder="e.g., OpenAI, Anthropic, Google"
          value={formData.company || ''}
          onChange={(e) => handleInputChange('company', e.target.value)}
          error={errors.company}
          description="Name of the company or developer behind the tool"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;