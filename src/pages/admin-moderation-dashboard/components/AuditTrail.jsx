import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const AuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const auditLogs = [
    {
      id: 'audit_001',
      timestamp: '2025-01-23T15:30:00Z',
      action: 'approved',
      moderator: 'Admin User',
      moderatorEmail: 'admin@aitoolshub.com',
      target: 'AI Content Writer Pro',
      targetType: 'submission',
      targetId: 'sub_001',
      details: 'Approved submission with 10 points awarded to contributor',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'audit_002',
      timestamp: '2025-01-23T14:15:00Z',
      action: 'rejected',
      moderator: 'Admin User',
      moderatorEmail: 'admin@aitoolshub.com',
      target: 'DataViz Generator',
      targetType: 'submission',
      targetId: 'sub_003',
      details: 'Rejected due to quality issues: Website inaccessible, description too short',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'audit_003',
      timestamp: '2025-01-23T13:45:00Z',
      action: 'user_warned',
      moderator: 'Admin User',
      moderatorEmail: 'admin@aitoolshub.com',
      target: 'john.doe@email.com',
      targetType: 'user',
      targetId: 'user_123',
      details: 'Warning issued for submitting inappropriate content reports',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'audit_004',
      timestamp: '2025-01-23T12:20:00Z',
      action: 'content_removed',
      moderator: 'Admin User',
      moderatorEmail: 'admin@aitoolshub.com',
      target: 'AI Image Generator X',
      targetType: 'tool',
      targetId: 'tool_456',
      details: 'Tool removed from platform due to policy violations',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'audit_005',
      timestamp: '2025-01-23T11:30:00Z',
      action: 'bulk_approved',
      moderator: 'Admin User',
      moderatorEmail: 'admin@aitoolshub.com',
      target: '5 submissions',
      targetType: 'bulk_action',
      targetId: 'bulk_001',
      details: 'Bulk approved 5 submissions from writing category',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'audit_006',
      timestamp: '2025-01-23T10:15:00Z',
      action: 'settings_updated',
      moderator: 'Admin User',
      moderatorEmail: 'admin@aitoolshub.com',
      target: 'Platform Settings',
      targetType: 'system',
      targetId: 'settings_001',
      details: 'Updated submission review threshold from 75% to 80%',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'approved', label: 'Approvals' },
    { value: 'rejected', label: 'Rejections' },
    { value: 'user_warned', label: 'User Warnings' },
    { value: 'content_removed', label: 'Content Removals' },
    { value: 'bulk_approved', label: 'Bulk Actions' },
    { value: 'settings_updated', label: 'Settings Changes' }
  ];

  const dateRangeOptions = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' }
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'user_warned': return 'AlertTriangle';
      case 'content_removed': return 'Trash2';
      case 'bulk_approved': return 'CheckSquare';
      case 'settings_updated': return 'Settings';
      default: return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approved': return 'text-success';
      case 'rejected': return 'text-error';
      case 'user_warned': return 'text-warning';
      case 'content_removed': return 'text-error';
      case 'bulk_approved': return 'text-success';
      case 'settings_updated': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getActionLabel = (action) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const exportAuditLog = () => {
    console.log('Exporting audit log...');
    // Implementation for exporting audit log
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.moderator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || log.action === filterBy;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Audit Trail</h2>
          <p className="text-text-secondary">Complete log of all moderation activities</p>
        </div>
        <Button
          variant="outline"
          onClick={exportAuditLog}
          iconName="Download"
        >
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search audit logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-48">
          <Select
            options={filterOptions}
            value={filterBy}
            onChange={setFilterBy}
            placeholder="Filter by action"
          />
        </div>
        <div className="w-full lg:w-48">
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Date range"
          />
        </div>
      </div>

      {/* Audit Log List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-text-secondary">Timestamp</th>
                <th className="text-left py-4 px-6 font-medium text-text-secondary">Action</th>
                <th className="text-left py-4 px-6 font-medium text-text-secondary">Moderator</th>
                <th className="text-left py-4 px-6 font-medium text-text-secondary">Target</th>
                <th className="text-left py-4 px-6 font-medium text-text-secondary">Details</th>
                <th className="text-left py-4 px-6 font-medium text-text-secondary">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={log.id} className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}>
                  <td className="py-4 px-6">
                    <div className="text-sm text-text-primary font-medium">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={getActionIcon(log.action)}
                        size={16}
                        className={getActionColor(log.action)}
                      />
                      <span className={`text-sm font-medium ${getActionColor(log.action)}`}>
                        {getActionLabel(log.action)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-text-primary font-medium">
                      {log.moderator}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {log.moderatorEmail}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-text-primary font-medium">
                      {log.target}
                    </div>
                    <div className="text-xs text-text-secondary capitalize">
                      {log.targetType.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-text-secondary max-w-xs truncate" title={log.details}>
                      {log.details}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-text-secondary font-mono">
                      {log.ipAddress}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No audit logs found</h3>
            <p className="text-text-secondary">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {filteredLogs.length} of {auditLogs.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <Icon name="ChevronLeft" size={16} />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 rounded-md bg-primary text-primary-foreground text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 rounded-md hover:bg-muted text-sm font-medium text-text-secondary">
                2
              </button>
              <button className="w-8 h-8 rounded-md hover:bg-muted text-sm font-medium text-text-secondary">
                3
              </button>
            </div>
            <Button variant="outline" size="sm">
              Next
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTrail;