import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Discover',
      path: '/ai-tools-marketplace-dashboard',
      icon: 'Compass',
      tooltip: 'Explore AI tools marketplace'
    },
    {
      label: 'Search',
      path: '/advanced-search-and-filtering',
      icon: 'Search',
      tooltip: 'Advanced search and filtering'
    },
    {
      label: 'Tools',
      path: '/ai-tool-detail-profile',
      icon: 'Wrench',
      tooltip: 'Tool details and profiles'
    },
    {
      label: 'Contribute',
      path: '/community-contribution-workflow',
      icon: 'Plus',
      tooltip: 'Submit new AI tools'
    },
    {
      label: 'Account',
      path: '/user-authentication-login-register',
      icon: 'User',
      tooltip: 'Login or register'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-md transition-colors duration-150 micro-interaction ${
              isActivePath(item.path)
                ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
            title={item.tooltip}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className={isActivePath(item.path) ? 'text-primary' : 'text-current'}
            />
            <span className={`text-xs mt-1 font-medium truncate ${
              isActivePath(item.path) ? 'text-primary' : 'text-current'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTabs;