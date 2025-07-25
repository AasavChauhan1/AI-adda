import React, { useState, useEffect } from 'react';
import { admin } from '../../../utils/supabase';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ReviewQueue = ({ activeTab, onTabChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    admin.getPendingSubmissions().then(({ data, error }) => {
      // Map Supabase fields to UI fields
      const mapped = (data || []).map(sub => ({
        id: sub.id,
        toolName: sub.tool_name,
        category: sub.category,
        submittedBy: sub.users?.username || sub.users?.email || sub.submitted_by || 'Unknown',
        submitterEmail: sub.users?.email || '',
        submissionDate: sub.created_at,
        description: sub.description || sub.brief_description || '',
        website: sub.website_url,
        pricing: sub.pricing_type,
        features: sub.features || [],
        screenshots: sub.screenshots || [],
        qualityScore: sub.quality_score || 0,
        status: sub.status,
        autoChecks: {}, // You can add logic for autoChecks if needed
      }));
      setPendingSubmissions(mapped);
      setLoading(false);
    });
  }, []);

  const reportedContent = [
    {
      id: 'report_001',
      toolName: 'AI Image Generator X',
      reportedBy: 'John Doe',
      reportReason: 'Inappropriate content generation',
      reportDate: '2025-01-21T14:20:00Z',
      description: 'Tool generates inappropriate images despite content filters',
      severity: 'high',
      status: 'under_review'
    },
    {
      id: 'report_002',
      toolName: 'Text Summarizer Plus',
      reportedBy: 'Jane Smith',
      reportReason: 'Copyright infringement',
      reportDate: '2025-01-20T11:30:00Z',
      description: 'Tool appears to be copying content from existing summarization service',
      severity: 'medium',
      status: 'pending'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Submissions' },
    { value: 'writing', label: 'Writing Tools' },
    { value: 'image', label: 'Image Tools' },
    { value: 'voice', label: 'Voice Tools' },
    { value: 'data', label: 'Data Tools' },
    { value: 'high_quality', label: 'High Quality (80+)' },
    { value: 'needs_review', label: 'Needs Review' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'quality_high', label: 'Quality Score (High)' },
    { value: 'quality_low', label: 'Quality Score (Low)' },
    { value: 'submitter', label: 'Submitter Name' }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending Submissions', count: pendingSubmissions.length },
    { id: 'reported', label: 'Reported Content', count: reportedContent.length },
    { id: 'users', label: 'User Management', count: 0 }
  ];

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === pendingSubmissions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(pendingSubmissions.map(item => item.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for items:`, selectedItems);
    setSelectedItems([]);
  };

  const handleApprove = (submissionId, points = 10) => {
    console.log(`Approved submission ${submissionId} with ${points} points`);
  };

  const handleReject = (submissionId, reason) => {
    console.log(`Rejected submission ${submissionId} with reason: ${reason}`);
  };

  const getQualityScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={filterOptions}
              value={filterBy}
              onChange={setFilterBy}
              placeholder="Filter by..."
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by..."
            />
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">
              {selectedItems.length} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('approve')}
              iconName="Check"
            >
              Bulk Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleBulkAction('reject')}
              iconName="X"
            >
              Bulk Reject
            </Button>
          </div>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {/* Select All */}
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <input
              type="checkbox"
              checked={selectedItems.length === pendingSubmissions.length}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-text-primary">
              Select All ({pendingSubmissions.length} items)
            </span>
          </div>

          {/* Submissions List */}
          {pendingSubmissions.map((submission) => (
            <div
              key={submission.id}
              className={`bg-card border border-border rounded-lg p-6 transition-all duration-150 ${
                selectedItems.includes(submission.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(submission.id)}
                  onChange={() => handleSelectItem(submission.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-1"
                />

                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {submission.toolName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                        <span>by {submission.submittedBy}</span>
                        <span>•</span>
                        <span>{new Date(submission.submissionDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{submission.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-medium ${getQualityScoreColor(submission.qualityScore)}`}>
                        Quality: {submission.qualityScore}%
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        submission.pricing === 'free' ? 'bg-success/10 text-success' :
                        submission.pricing === 'freemium'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                      }`}>
                        {submission.pricing}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Description</h4>
                        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                          {submission.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Website</h4>
                        <a
                          href={submission.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          {submission.website}
                        </a>
                      </div>

                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {submission.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Screenshots</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {submission.screenshots.map((screenshot, index) => (
                            <div key={index} className="aspect-video bg-muted rounded-md overflow-hidden">
                              <Image
                                src={screenshot}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Auto Checks</h4>
                        <div className="space-y-2">
                          {Object.entries(submission.autoChecks).map(([check, passed]) => (
                            <div key={check} className="flex items-center gap-2">
                              <Icon
                                name={passed ? "CheckCircle" : "XCircle"}
                                size={16}
                                className={passed ? "text-success" : "text-error"}
                              />
                              <span className="text-sm text-text-secondary capitalize">
                                {check.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button
                      variant="success"
                      onClick={() => handleApprove(submission.id)}
                      iconName="Check"
                      className="flex-1 sm:flex-none"
                    >
                      Approve (10 pts)
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(submission.id, 'Quality issues')}
                      iconName="X"
                      className="flex-1 sm:flex-none"
                    >
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => console.log('Request changes')}
                      iconName="MessageCircle"
                      className="flex-1 sm:flex-none"
                    >
                      Request Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reported' && (
        <div className="space-y-4">
          {reportedContent.map((report) => (
            <div key={report.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {report.toolName}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)} bg-current/10`}>
                      {report.severity} priority
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary mb-3">
                    Reported by {report.reportedBy} on {new Date(report.reportDate).toLocaleDateString()}
                  </div>
                  <div className="mb-3">
                    <span className="font-medium text-text-primary">Reason: </span>
                    <span className="text-text-secondary">{report.reportReason}</span>
                  </div>
                  <p className="text-text-secondary text-sm">{report.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" iconName="Eye">
                    Review Tool
                  </Button>
                  <Button variant="destructive" size="sm" iconName="Ban">
                    Take Action
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">User Management</h3>
          <p className="text-text-secondary">User management features will be available here.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;