import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const secondaryItems = [
    {
      label: 'Admin',
      path: '/admin-moderation-dashboard',
      icon: 'Shield',
      tooltip: 'Admin moderation dashboard'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border ambient-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/ai-tools-marketplace-dashboard')}
              className="flex items-center space-x-3 micro-interaction"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">
                AI Tools Hub
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 micro-interaction ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
                title={item.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150 micro-interaction">
                <div className="flex items-center space-x-2">
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                </div>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md elevated-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {secondaryItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 first:rounded-t-md last:rounded-b-md ${
                      isActivePath(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    title={item.tooltip}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            <UserMenu />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[...navigationItems, ...secondaryItems].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;