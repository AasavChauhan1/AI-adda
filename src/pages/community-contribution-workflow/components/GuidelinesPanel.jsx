import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GuidelinesPanel = ({ isCollapsed, onToggle, className = '' }) => {
  const [activeSection, setActiveSection] = useState('tips');

  const guidelines = {
    tips: {
      title: 'Submission Tips',
      icon: 'Lightbulb',
      content: [
        'Provide accurate and up-to-date information about the AI tool',
        'Include high-quality screenshots and demo videos when possible',
        'Write clear, concise descriptions that highlight key features',
        'Test all URLs and links before submitting',
        'Use proper categorization to help users discover your tool',
        'Include pricing information and any free trial details'
      ]
    },
    standards: {
      title: 'Quality Standards',
      icon: 'Shield',
      content: [
        'Tool must be actively maintained and functional',
        'No broken links or outdated information',
        'Screenshots should be recent and representative',
        'Descriptions must be original, not copied from other sources',
        'All claims about features must be verifiable',
        'Respect intellectual property and trademark rights'
      ]
    },
    examples: {
      title: 'Good Examples',
      icon: 'Star',
      content: [
        'Clear tool name: "GPT-4 Code Assistant"',
        'Specific category: "Code Generation & Development"',
        'Detailed description: "AI-powered coding assistant that helps developers write, debug, and optimize code in 50+ programming languages"',
        'Comprehensive features: API access, IDE integrations, real-time collaboration',
        'Honest pros/cons: Fast generation speed vs. occasional syntax errors',
        'Use cases: Code completion, bug fixing, documentation generation'
      ]
    }
  };

  const sections = Object.entries(guidelines);

  if (isCollapsed) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 lg:hidden"
        iconName="HelpCircle"
        iconPosition="left"
      >
        Guidelines
      </Button>
    );
  }

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Submission Guidelines</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="X"
            className="lg:hidden"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Section Tabs */}
        <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
          {sections.map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                activeSection === key
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span className="hidden sm:inline">{section.title}</span>
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary flex items-center space-x-2">
            <Icon name={guidelines[activeSection].icon} size={18} />
            <span>{guidelines[activeSection].title}</span>
          </h4>
          <ul className="space-y-2">
            {guidelines[activeSection].content.map((item, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Points Information */}
        <div className="mt-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} className="text-accent" />
            <span className="font-medium text-text-primary">Earn Points</span>
          </div>
          <p className="text-sm text-text-secondary">
            Earn 50-100 points for approved submissions based on quality and completeness. 
            High-quality submissions with detailed information earn bonus points!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPanel;