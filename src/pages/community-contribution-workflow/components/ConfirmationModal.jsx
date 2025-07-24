import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ isOpen, onClose, submissionData }) => {
  if (!isOpen) return null;

  const handleViewProfile = () => {
    // Navigate to user profile or submissions page
    console.log('Navigate to user profile');
    onClose();
  };

  const handleSubmitAnother = () => {
    // Reset form and start new submission
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-300 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg max-w-md w-full p-6 animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Submission Successful!
          </h2>
          
          <p className="text-text-secondary mb-6">
            Thank you for contributing to our AI tools community. Your submission has been received and will be reviewed by our moderation team.
          </p>

          <div className="bg-muted rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-text-primary mb-3">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground font-medium">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Review Process</p>
                  <p className="text-xs text-text-secondary">Our team will review your submission within 2-3 business days</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground font-medium">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Notification</p>
                  <p className="text-xs text-text-secondary">You'll receive an email update about the review status</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground font-medium">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Points Reward</p>
                  <p className="text-xs text-text-secondary">Earn 50-100 points once your submission is approved</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Award" size={16} className="text-accent" />
              <span className="font-medium text-text-primary">Submission Details</span>
            </div>
            <div className="text-sm text-text-secondary space-y-1">
              <p><strong>Tool:</strong> {submissionData?.toolName || 'N/A'}</p>
              <p><strong>Category:</strong> {submissionData?.category || 'N/A'}</p>
              <p><strong>Submitted:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Reference ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={handleViewProfile}
              iconName="User"
              iconPosition="left"
              className="flex-1"
            >
              View My Profile
            </Button>
            <Button
              variant="outline"
              onClick={handleSubmitAnother}
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              Submit Another
            </Button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;