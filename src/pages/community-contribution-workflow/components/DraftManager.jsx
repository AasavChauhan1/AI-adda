import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DraftManager = ({ formData, onLoadDraft, onSaveDraft, onDeleteDraft }) => {
  const [drafts, setDrafts] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Load drafts from localStorage
    const savedDrafts = localStorage.getItem('contributionDrafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  useEffect(() => {
    // Auto-save every 30 seconds if there's data
    const autoSaveInterval = setInterval(() => {
      if (formData && (formData.toolName || formData.websiteUrl || formData.briefDescription)) {
        handleSaveDraft(true);
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  const handleSaveDraft = (isAutoSave = false) => {
    if (!formData.toolName && !formData.websiteUrl && !formData.briefDescription) {
      return;
    }

    const draftId = `draft_${Date.now()}`;
    const draft = {
      id: draftId,
      name: formData.toolName || 'Untitled Draft',
      data: formData,
      savedAt: new Date().toISOString(),
      isAutoSave
    };

    const updatedDrafts = [draft, ...drafts.slice(0, 9)]; // Keep only 10 drafts
    setDrafts(updatedDrafts);
    localStorage.setItem('contributionDrafts', JSON.stringify(updatedDrafts));
    setLastSaved(new Date());

    if (onSaveDraft) {
      onSaveDraft(draft);
    }
  };

  const handleLoadDraft = (draft) => {
    if (onLoadDraft) {
      onLoadDraft(draft.data);
    }
    setShowDrafts(false);
  };

  const handleDeleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('contributionDrafts', JSON.stringify(updatedDrafts));

    if (onDeleteDraft) {
      onDeleteDraft(draftId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSaveDraft(false)}
          iconName="Save"
          iconPosition="left"
        >
          Save Draft
        </Button>
        
        {drafts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDrafts(!showDrafts)}
            iconName="FileText"
            iconPosition="left"
          >
            Drafts ({drafts.length})
          </Button>
        )}

        {lastSaved && (
          <span className="text-xs text-text-secondary">
            Last saved: {formatDate(lastSaved.toISOString())}
          </span>
        )}
      </div>

      {showDrafts && drafts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg elevated-shadow z-200 max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-text-primary">Saved Drafts</h4>
              <button
                onClick={() => setShowDrafts(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between p-3 hover:bg-muted transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-text-primary truncate">
                      {draft.name}
                    </h5>
                    {draft.isAutoSave && (
                      <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                        Auto-saved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">
                    Saved {formatDate(draft.savedAt)}
                  </p>
                  {draft.data.category && (
                    <p className="text-xs text-text-secondary">
                      Category: {draft.data.category}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadDraft(draft)}
                    iconName="Upload"
                    title="Load draft"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDraft(draft.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                    title="Delete draft"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border">
            <p className="text-xs text-text-secondary">
              Drafts are automatically saved every 30 seconds while you work.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftManager;