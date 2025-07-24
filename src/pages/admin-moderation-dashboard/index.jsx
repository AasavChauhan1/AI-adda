import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import NavigationTabs from '../../components/ui/NavigationTabs';
import ReviewQueue from './components/ReviewQueue';
import AnalyticsPanel from './components/AnalyticsPanel';
import AuditTrail from './components/AuditTrail';
import SystemSettings from './components/SystemSettings';

const AdminModerationDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [activeSection, setActiveSection] = useState('queue');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      console.log('Access restricted to admin users only');
    }
  }, []);

  const sidebarItems = [
    {
      id: 'queue',
      label: 'Review Queue',
      icon: 'FileText',
      description: 'Manage pending submissions and reports'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'Platform performance and metrics'
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: 'History',
      description: 'Complete moderation activity log'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'Settings',
      description: 'Configure platform settings'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'queue':
        return <ReviewQueue activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'audit':
        return <AuditTrail />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <ReviewQueue activeTab={activeTab} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Moderation Dashboard - AI Tools Hub</title>
        <meta name="description" content="Comprehensive admin dashboard for managing AI tools submissions, community moderation, and platform analytics." />
      </Helmet>

      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Admin Panel</h2>
                  <p className="text-sm text-text-secondary">Moderation Dashboard</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-start space-x-3 p-4 rounded-lg text-left transition-colors duration-150 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    className={activeSection === item.id ? 'text-primary-foreground' : 'text-current'}
                  />
                  <div>
                    <div className={`font-medium ${
                      activeSection === item.id ? 'text-primary-foreground' : 'text-text-primary'
                    }`}>
                      {item.label}
                    </div>
                    <div className={`text-sm ${
                      activeSection === item.id ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="p-6 border-t border-border">
              <h3 className="text-sm font-medium text-text-primary mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Pending Reviews</span>
                  <span className="text-sm font-medium text-text-primary">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Today's Approvals</span>
                  <span className="text-sm font-medium text-success">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Active Reports</span>
                  <span className="text-sm font-medium text-warning">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">System Status</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-success">Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-surface border-b border-border p-4 mt-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 text-text-primary"
            >
              <Icon name="Menu" size={20} />
              <span className="font-medium">Admin Panel</span>
            </button>
          </div>

          {/* Content Area */}
          <main className="p-6 lg:p-8 pb-20 lg:pb-8">
            {renderContent()}
          </main>
        </div>
      </div>

      <NavigationTabs />
    </div>
  );
};

export default AdminModerationDashboard;