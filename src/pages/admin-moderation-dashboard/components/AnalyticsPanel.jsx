import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AnalyticsPanel = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const submissionTrends = [
    { date: '2025-01-15', submissions: 12, approved: 8, rejected: 4 },
    { date: '2025-01-16', submissions: 15, approved: 11, rejected: 4 },
    { date: '2025-01-17', submissions: 8, approved: 6, rejected: 2 },
    { date: '2025-01-18', submissions: 18, approved: 14, rejected: 4 },
    { date: '2025-01-19', submissions: 22, approved: 16, rejected: 6 },
    { date: '2025-01-20', submissions: 19, approved: 15, rejected: 4 },
    { date: '2025-01-21', submissions: 25, approved: 20, rejected: 5 }
  ];

  const categoryDistribution = [
    { name: 'Writing', value: 35, color: '#1E40AF' },
    { name: 'Image', value: 28, color: '#6366F1' },
    { name: 'Code', value: 18, color: '#F59E0B' },
    { name: 'Data', value: 12, color: '#10B981' },
    { name: 'Voice', value: 7, color: '#EF4444' }
  ];

  const topContributors = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      submissions: 24,
      approved: 22,
      points: 220,
      approvalRate: 92,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'mike.r@email.com',
      submissions: 18,
      approved: 15,
      points: 150,
      approvalRate: 83,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Watson',
      email: 'emily.watson@email.com',
      submissions: 16,
      approved: 14,
      points: 140,
      approvalRate: 88,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      submissions: 12,
      approved: 10,
      points: 100,
      approvalRate: 83,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Lisa Zhang',
      email: 'lisa.zhang@email.com',
      submissions: 10,
      approved: 9,
      points: 90,
      approvalRate: 90,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const stats = [
    {
      title: 'Total Submissions',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText'
    },
    {
      title: 'Approval Rate',
      value: '87.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle'
    },
    {
      title: 'Avg Review Time',
      value: '2.4h',
      change: '-15min',
      changeType: 'positive',
      icon: 'Clock'
    },
    {
      title: 'Active Contributors',
      value: '342',
      change: '+18',
      changeType: 'positive',
      icon: 'Users'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Analytics Overview</h2>
          <p className="text-text-secondary">Monitor platform performance and community engagement</p>
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select time range"
          />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-error'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-text-secondary text-sm ml-1">vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submission Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Submission Trends</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={submissionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#1E40AF" 
                  strokeWidth={2}
                  name="Total Submissions"
                />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Approved"
                />
                <Line 
                  type="monotone" 
                  dataKey="rejected" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Rejected"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Category Distribution</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Top Contributors</h3>
          <Icon name="Trophy" size={20} className="text-warning" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Contributor</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Submissions</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Approved</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Approval Rate</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Points</th>
              </tr>
            </thead>
            <tbody>
              {topContributors.map((contributor, index) => (
                <tr key={contributor.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {index === 0 && <Icon name="Crown" size={16} className="text-warning mr-2" />}
                      <span className="font-medium text-text-primary">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                        <img
                          src={contributor.avatar}
                          alt={contributor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{contributor.name}</div>
                        <div className="text-sm text-text-secondary">{contributor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-primary font-medium">{contributor.submissions}</td>
                  <td className="py-4 px-4 text-success font-medium">{contributor.approved}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className="bg-success h-2 rounded-full"
                          style={{ width: `${contributor.approvalRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {contributor.approvalRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning" />
                      <span className="font-medium text-text-primary">{contributor.points}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;