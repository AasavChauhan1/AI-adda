import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationTabs from '../../components/ui/NavigationTabs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import GuidelinesPanel from './components/GuidelinesPanel';
import BasicInfoStep from './components/BasicInfoStep';
import SpecificationsStep from './components/SpecificationsStep';
import MediaUploadStep from './components/MediaUploadStep';
import AnalysisStep from './components/AnalysisStep';
import ReviewStep from './components/ReviewStep';
import ConfirmationModal from './components/ConfirmationModal';
import DraftManager from './components/DraftManager';
import { aiTools } from '../../utils/supabase';
import { useAuth } from '../../utils/AuthContext';

const CommunityContributionWorkflow = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [guidelinesCollapsed, setGuidelinesCollapsed] = useState(true);

  const steps = [
    { id: 1, title: 'Basic Info', component: BasicInfoStep },
    { id: 2, title: 'Specifications', component: SpecificationsStep },
    { id: 3, title: 'Media', component: MediaUploadStep },
    { id: 4, title: 'Analysis', component: AnalysisStep },
    { id: 5, title: 'Review', component: ReviewStep }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/user-authentication-login-register');
    }
  }, [navigate]);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear related errors when data is updated
    const updatedErrors = { ...errors };
    Object.keys(newData).forEach(key => {
      if (updatedErrors[key]) {
        delete updatedErrors[key];
      }
    });
    setErrors(updatedErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.toolName?.trim()) newErrors.toolName = 'Tool name is required';
        if (!formData.websiteUrl?.trim()) newErrors.websiteUrl = 'Website URL is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.briefDescription?.trim()) newErrors.briefDescription = 'Brief description is required';
        if (!formData.detailedDescription?.trim()) newErrors.detailedDescription = 'Detailed description is required';
        break;
      case 2:
        if (!formData.pricingModel) newErrors.pricingModel = 'Pricing model is required';
        break;
      case 3:
        // Media is optional, no validation required
        break;
      case 4:
        // Analysis is optional, no validation required
        break;
      case 5:
        // Review step, no additional validation
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleEdit = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      setCurrentStep(1);
      return;
    }
    setIsSubmitting(true);
    try {
      // Prepare the data for Supabase
      const submission = {
        tool_name: formData.toolName,
        website_url: formData.websiteUrl,
        category: formData.category,
        description: formData.detailedDescription,
        pricing_type: formData.pricingModel,
        features: formData.features || [],
        screenshots: (formData.screenshots || []).map(f => f.url),
        status: 'pending',
        submitter_id: user?.id,
        pricing_details: formData.pricingDetails,
        pros: formData.pros,
        use_cases: formData.useCases,
        target_audience: formData.targetAudience,
        logo: (formData.logo && formData.logo[0]?.url) || null,
        demo_video_url: formData.demoVideoUrl,
        live_demo_url: formData.liveDemoUrl,
      };
      const { data, error } = await aiTools.submitTool(submission);
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setFormData({});
      setShowConfirmation(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadDraft = (draftData) => {
    setFormData(draftData);
    setErrors({});
  };

  const handleSaveDraft = (draft) => {
    console.log('Draft saved:', draft.name);
  };

  const handleDeleteDraft = (draftId) => {
    console.log('Draft deleted:', draftId);
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
          <button
            onClick={() => navigate('/ai-tools-marketplace-dashboard')}
            className="hover:text-text-primary transition-colors duration-150"
          >
            Dashboard
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-text-primary font-medium">Contribute</span>
          <Icon name="ChevronRight" size={16} />
          <span className="text-text-primary font-medium">Submit Tool</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-surface border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
                    Submit AI Tool
                  </h1>
                  <p className="text-text-secondary">
                    Help grow our community by sharing amazing AI tools with fellow enthusiasts.
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Award" size={16} className="text-accent" />
                  <span>Earn 50-100 points</span>
                </div>
              </div>
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={steps.length}
                steps={steps}
              />
              <DraftManager
                formData={formData}
                onLoadDraft={handleLoadDraft}
                onSaveDraft={handleSaveDraft}
                onDeleteDraft={handleDeleteDraft}
              />
            </div>
            {/* Step Content */}
            <div className="bg-surface border border-border rounded-lg p-6">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                  onEdit={handleEdit}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
              {/* Navigation Buttons */}
              {currentStep < steps.length && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center space-x-2">
                    {steps.slice(0, -1).map((step) => (
                      <button
                        key={step.id}
                        onClick={() => handleStepClick(step.id)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          step.id === currentStep
                            ? 'bg-primary'
                            : step.id < currentStep
                            ? 'bg-success' :'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="default"
                    onClick={handleNext}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Guidelines Panel */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              <GuidelinesPanel
                isCollapsed={guidelinesCollapsed}
                onToggle={() => setGuidelinesCollapsed(!guidelinesCollapsed)}
                className="hidden lg:block"
              />
            </div>
          </div>
        </div>
        {/* Mobile Guidelines */}
        <GuidelinesPanel
          isCollapsed={guidelinesCollapsed}
          onToggle={() => setGuidelinesCollapsed(!guidelinesCollapsed)}
          className="lg:hidden"
        />
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        submissionData={formData}
      />
      <NavigationTabs />
    </div>
  );
};

export default CommunityContributionWorkflow;