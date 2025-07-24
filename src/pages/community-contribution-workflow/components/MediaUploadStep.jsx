import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MediaUploadStep = ({ formData, updateFormData, errors }) => {
  const [dragOver, setDragOver] = useState(null);

  const handleFileUpload = (field, files) => {
    const fileArray = Array.from(files);
    const currentFiles = formData[field] || [];
    
    // Mock file upload - in real app, upload to server
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file
    }));

    updateFormData({ [field]: [...currentFiles, ...newFiles] });
  };

  const removeFile = (field, fileId) => {
    const currentFiles = formData[field] || [];
    const updatedFiles = currentFiles.filter(file => file.id !== fileId);
    updateFormData({ [field]: updatedFiles });
  };

  const handleDragOver = (e, field) => {
    e.preventDefault();
    setDragOver(field);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    setDragOver(null);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(field, files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileUploadArea = ({ field, title, description, acceptedTypes, maxSize }) => (
    <div className="space-y-3">
      <div>
        <h4 className="font-medium text-text-primary">{title}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragOver === field
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={(e) => handleDragOver(e, field)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, field)}
      >
        <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-3" />
        <p className="text-text-primary font-medium mb-1">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-sm text-text-secondary mb-3">
          {acceptedTypes} • Max {maxSize}
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={(e) => handleFileUpload(field, e.target.files)}
          className="hidden"
          id={`${field}-upload`}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById(`${field}-upload`).click()}
          iconName="Plus"
          iconPosition="left"
        >
          Choose Files
        </Button>
      </div>

      {/* File Preview */}
      {formData[field] && formData[field].length > 0 && (
        <div className="space-y-2">
          <h5 className="font-medium text-text-primary">Uploaded Files</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData[field].map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="flex-shrink-0">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                      <Icon name="File" size={20} className="text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(field, file.id)}
                  iconName="X"
                  className="text-error hover:text-error"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Media & Assets</h2>
        <p className="text-text-secondary">
          Upload screenshots, logos, and demo videos to showcase the AI tool effectively.
        </p>
      </div>

      <div className="space-y-8">
        <FileUploadArea
          field="screenshots"
          title="Screenshots"
          description="Upload screenshots showing the tool's interface and key features"
          acceptedTypes="image/*"
          maxSize="5MB each"
        />

        <FileUploadArea
          field="logo"
          title="Logo"
          description="Upload the official logo or icon for the AI tool"
          acceptedTypes="image/*"
          maxSize="2MB"
        />

        <FileUploadArea
          field="demoVideos"
          title="Demo Videos"
          description="Upload demonstration videos showing the tool in action (optional)"
          acceptedTypes="video/*"
          maxSize="50MB each"
        />

        <div className="space-y-4">
          <Input
            label="Demo Video URL"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={formData.demoVideoUrl || ''}
            onChange={(e) => updateFormData({ demoVideoUrl: e.target.value })}
            description="Alternatively, provide a link to a demo video on YouTube, Vimeo, etc."
          />

          <Input
            label="Live Demo URL"
            type="url"
            placeholder="https://example.com/demo"
            value={formData.liveDemoUrl || ''}
            onChange={(e) => updateFormData({ liveDemoUrl: e.target.value })}
            description="Link to a live demo or playground where users can try the tool"
          />
        </div>

        {/* Media Guidelines */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-text-primary mb-2">Media Guidelines</h5>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Screenshots should be high-resolution and show the actual interface</li>
                <li>• Include at least 2-3 screenshots highlighting key features</li>
                <li>• Logo should be clear and preferably on a transparent background</li>
                <li>• Demo videos should be under 2 minutes and focus on core functionality</li>
                <li>• Ensure all media accurately represents the current version of the tool</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadStep;