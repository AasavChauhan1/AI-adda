import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Submission Progress</h3>
        <span className="text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  index + 1 < currentStep
                    ? 'bg-success text-success-foreground'
                    : index + 1 === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs mt-1 text-center ${
                index + 1 <= currentStep ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors duration-200 ${
                  index + 1 < currentStep ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;