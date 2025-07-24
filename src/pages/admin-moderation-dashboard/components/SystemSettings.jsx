import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // Moderation Settings
    autoApprovalThreshold: '85',
    reviewTimeLimit: '24',
    maxSubmissionsPerDay: '5',
    requireScreenshots: true,
    enableDuplicateCheck: true,
    
    // Point System
    approvalPoints: '10',
    rejectionPenalty: '2',
    bonusPointsThreshold: '90',
    bonusPoints: '5',
    
    // Content Policies
    minDescriptionLength: '100',
    maxDescriptionLength: '1000',
    allowedFileTypes: 'jpg,png,gif,webp',
    maxFileSize: '5',
    
    // Notification Settings
    emailNotifications: true,
    slackIntegration: false,
    webhookUrl: '',
    
    // Security Settings
    enableRateLimit: true,
    maxLoginAttempts: '5',
    sessionTimeout: '24',
    requireTwoFactor: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Implementation for saving settings
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      autoApprovalThreshold: '85',
      reviewTimeLimit: '24',
      maxSubmissionsPerDay: '5',
      requireScreenshots: true,
      enableDuplicateCheck: true,
      approvalPoints: '10',
      rejectionPenalty: '2',
      bonusPointsThreshold: '90',
      bonusPoints: '5',
      minDescriptionLength: '100',
      maxDescriptionLength: '1000',
      allowedFileTypes: 'jpg,png,gif,webp',
      maxFileSize: '5',
      emailNotifications: true,
      slackIntegration: false,
      webhookUrl: '',
      enableRateLimit: true,
      maxLoginAttempts: '5',
      sessionTimeout: '24',
      requireTwoFactor: false
    });
    setHasChanges(false);
  };

  const timeoutOptions = [
    { value: '1', label: '1 hour' },
    { value: '6', label: '6 hours' },
    { value: '12', label: '12 hours' },
    { value: '24', label: '24 hours' },
    { value: '48', label: '48 hours' },
    { value: '168', label: '1 week' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">System Settings</h2>
          <p className="text-text-secondary">Configure platform moderation and operational settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges}
            iconName="Save"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <span className="text-warning font-medium">You have unsaved changes</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Moderation Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Shield" size={20} className="mr-2" />
            Moderation Settings
          </h3>
          <div className="space-y-4">
            <Input
              label="Auto-approval Threshold (%)"
              type="number"
              value={settings.autoApprovalThreshold}
              onChange={(e) => handleInputChange('autoApprovalThreshold', e.target.value)}
              description="Submissions with quality scores above this threshold will be auto-approved"
              min="0"
              max="100"
            />
            
            <Select
              label="Review Time Limit"
              options={timeoutOptions}
              value={settings.reviewTimeLimit}
              onChange={(value) => handleInputChange('reviewTimeLimit', value)}
              description="Maximum time allowed for reviewing submissions"
            />
            
            <Input
              label="Max Submissions Per Day (Per User)"
              type="number"
              value={settings.maxSubmissionsPerDay}
              onChange={(e) => handleInputChange('maxSubmissionsPerDay', e.target.value)}
              description="Limit the number of submissions a user can make per day"
              min="1"
              max="50"
            />
            
            <div className="space-y-3">
              <Checkbox
                label="Require Screenshots"
                checked={settings.requireScreenshots}
                onChange={(e) => handleInputChange('requireScreenshots', e.target.checked)}
                description="Make screenshots mandatory for all submissions"
              />
              
              <Checkbox
                label="Enable Duplicate Check"
                checked={settings.enableDuplicateCheck}
                onChange={(e) => handleInputChange('enableDuplicateCheck', e.target.checked)}
                description="Automatically check for duplicate tool submissions"
              />
            </div>
          </div>
        </div>

        {/* Point System */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Star" size={20} className="mr-2" />
            Point System
          </h3>
          <div className="space-y-4">
            <Input
              label="Points for Approved Submission"
              type="number"
              value={settings.approvalPoints}
              onChange={(e) => handleInputChange('approvalPoints', e.target.value)}
              description="Points awarded when a submission is approved"
              min="1"
              max="100"
            />
            
            <Input
              label="Penalty for Rejected Submission"
              type="number"
              value={settings.rejectionPenalty}
              onChange={(e) => handleInputChange('rejectionPenalty', e.target.value)}
              description="Points deducted when a submission is rejected"
              min="0"
              max="50"
            />
            
            <Input
              label="Bonus Points Threshold (%)"
              type="number"
              value={settings.bonusPointsThreshold}
              onChange={(e) => handleInputChange('bonusPointsThreshold', e.target.value)}
              description="Quality score threshold for bonus points"
              min="80"
              max="100"
            />
            
            <Input
              label="Bonus Points Amount"
              type="number"
              value={settings.bonusPoints}
              onChange={(e) => handleInputChange('bonusPoints', e.target.value)}
              description="Additional points for high-quality submissions"
              min="1"
              max="50"
            />
          </div>
        </div>

        {/* Content Policies */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="FileText" size={20} className="mr-2" />
            Content Policies
          </h3>
          <div className="space-y-4">
            <Input
              label="Minimum Description Length (characters)"
              type="number"
              value={settings.minDescriptionLength}
              onChange={(e) => handleInputChange('minDescriptionLength', e.target.value)}
              description="Minimum required length for tool descriptions"
              min="50"
              max="500"
            />
            
            <Input
              label="Maximum Description Length (characters)"
              type="number"
              value={settings.maxDescriptionLength}
              onChange={(e) => handleInputChange('maxDescriptionLength', e.target.value)}
              description="Maximum allowed length for tool descriptions"
              min="500"
              max="5000"
            />
            
            <Input
              label="Allowed File Types"
              type="text"
              value={settings.allowedFileTypes}
              onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
              description="Comma-separated list of allowed file extensions"
            />
            
            <Input
              label="Maximum File Size (MB)"
              type="number"
              value={settings.maxFileSize}
              onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
              description="Maximum file size for uploaded screenshots"
              min="1"
              max="50"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Bell" size={20} className="mr-2" />
            Notification Settings
          </h3>
          <div className="space-y-4">
            <Checkbox
              label="Email Notifications"
              checked={settings.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
              description="Send email notifications for moderation events"
            />
            
            <Checkbox
              label="Slack Integration"
              checked={settings.slackIntegration}
              onChange={(e) => handleInputChange('slackIntegration', e.target.checked)}
              description="Send notifications to Slack channel"
            />
            
            <Input
              label="Webhook URL"
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
              description="URL for webhook notifications"
              disabled={!settings.slackIntegration}
            />
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Lock" size={20} className="mr-2" />
            Security Settings
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Checkbox
              label="Enable Rate Limiting"
              checked={settings.enableRateLimit}
              onChange={(e) => handleInputChange('enableRateLimit', e.target.checked)}
              description="Limit API requests per user"
            />
            
            <Input
              label="Max Login Attempts"
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
              description="Maximum failed login attempts before lockout"
              min="3"
              max="10"
            />
            
            <Select
              label="Session Timeout"
              options={timeoutOptions}
              value={settings.sessionTimeout}
              onChange={(value) => handleInputChange('sessionTimeout', value)}
              description="Automatic logout after inactivity"
            />
            
            <Checkbox
              label="Require Two-Factor Authentication"
              checked={settings.requireTwoFactor}
              onChange={(e) => handleInputChange('requireTwoFactor', e.target.checked)}
              description="Require 2FA for admin accounts"
            />
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          System Status
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div className="text-sm font-medium text-text-primary">Database</div>
            <div className="text-xs text-success">Operational</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div className="text-sm font-medium text-text-primary">API Services</div>
            <div className="text-xs text-success">Operational</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
            </div>
            <div className="text-sm font-medium text-text-primary">Email Service</div>
            <div className="text-xs text-warning">Degraded</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;