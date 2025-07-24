import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AnalysisStep = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleListChange = (field, index, value) => {
    const currentList = formData[field] || [''];
    const newList = [...currentList];
    newList[index] = value;
    updateFormData({ [field]: newList });
  };

  const addListItem = (field) => {
    const currentList = formData[field] || [];
    updateFormData({ [field]: [...currentList, ''] });
  };

  const removeListItem = (field, index) => {
    const currentList = formData[field] || [];
    const newList = currentList.filter((_, i) => i !== index);
    updateFormData({ [field]: newList });
  };

  const ListInput = ({ field, title, placeholder, icon }) => {
    const items = formData[field] || [''];
    
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={18} className="text-text-primary" />
          <h4 className="font-medium text-text-primary">{title}</h4>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={`${placeholder} ${index + 1}`}
                  value={item}
                  onChange={(e) => handleListChange(field, index, e.target.value)}
                />
              </div>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem(field, index)}
                  className="p-2 text-error hover:bg-error/10 rounded-md transition-colors duration-150"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addListItem(field)}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-150"
          >
            <Icon name="Plus" size={16} />
            <span>Add another {title.toLowerCase().slice(0, -1)}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Analysis & Use Cases</h2>
        <p className="text-text-secondary">
          Provide honest analysis and real-world use cases to help users make informed decisions.
        </p>
      </div>

      <div className="space-y-8">
        <ListInput
          field="pros"
          title="Pros"
          placeholder="Advantage or benefit"
          icon="ThumbsUp"
        />

        <ListInput
          field="cons"
          title="Cons"
          placeholder="Limitation or drawback"
          icon="ThumbsDown"
        />

        <ListInput
          field="useCases"
          title="Use Cases"
          placeholder="Specific use case or application"
          icon="Target"
        />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={18} className="text-text-primary" />
            <h4 className="font-medium text-text-primary">Target Audience</h4>
          </div>
          <textarea
            placeholder="Describe who would benefit most from this tool. Include skill levels, industries, job roles, or specific user types."
            value={formData.targetAudience || ''}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            maxLength={500}
          />
          <p className="text-xs text-text-secondary">
            Help users understand if this tool is right for their needs and skill level
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={18} className="text-text-primary" />
            <h4 className="font-medium text-text-primary">Key Differentiators</h4>
          </div>
          <textarea
            placeholder="What makes this tool unique compared to alternatives? Highlight distinctive features, approaches, or capabilities."
            value={formData.differentiators || ''}
            onChange={(e) => handleInputChange('differentiators', e.target.value)}
            className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            maxLength={500}
          />
          <p className="text-xs text-text-secondary">
            Explain what sets this tool apart from similar solutions in the market
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={18} className="text-text-primary" />
            <h4 className="font-medium text-text-primary">Important Notes</h4>
          </div>
          <textarea
            placeholder="Any important information users should know before using this tool. Include limitations, requirements, or considerations."
            value={formData.importantNotes || ''}
            onChange={(e) => handleInputChange('importantNotes', e.target.value)}
            className="w-full min-h-[80px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            maxLength={300}
          />
          <p className="text-xs text-text-secondary">
            Include any caveats, beta status, or special considerations
          </p>
        </div>

        {/* Analysis Tips */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-text-primary mb-2">Analysis Tips</h5>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Be honest and balanced in your pros and cons assessment</li>
                <li>• Include specific, actionable use cases rather than generic descriptions</li>
                <li>• Consider different user types and their varying needs</li>
                <li>• Mention any learning curve or technical requirements</li>
                <li>• Compare with similar tools when relevant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisStep;