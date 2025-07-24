import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ tool }) => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/ai-tools-marketplace-dashboard',
      icon: 'Home'
    },
    {
      label: tool.categories[0] || 'Category',
      path: `/advanced-search-and-filtering?categories=${encodeURIComponent(tool.categories[0] || '')}`,
      icon: 'Folder'
    },
    {
      label: tool.name,
      path: null,
      icon: 'Tool'
    }
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-muted transition-colors micro-interaction"
            title="Go back"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>

          {/* Breadcrumb Trail */}
          <nav className="flex items-center space-x-2 overflow-x-auto">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={16} className="text-text-secondary flex-shrink-0" />
                )}
                
                <div className="flex items-center space-x-2 min-w-0">
                  {crumb.path ? (
                    <button
                      onClick={() => handleNavigation(crumb.path)}
                      className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors whitespace-nowrap"
                    >
                      <Icon name={crumb.icon} size={16} className="flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{crumb.label}</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 text-text-primary">
                      <Icon name={crumb.icon} size={16} className="flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{crumb.label}</span>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;