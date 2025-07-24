import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: null,
    role: 'user'
  };

  useEffect(() => {
    // Check authentication status from localStorage or API
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('userData');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate('/user-authentication-login-register');
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsOpen(false);
    navigate('/ai-tools-marketplace-dashboard');
  };

  const menuItems = [
    {
      label: 'Profile',
      icon: 'User',
      action: () => {
        console.log('Navigate to profile');
        setIsOpen(false);
      }
    },
    {
      label: 'My Contributions',
      icon: 'FileText',
      action: () => {
        navigate('/community-contribution-workflow');
        setIsOpen(false);
      }
    },
    {
      label: 'Favorites',
      icon: 'Heart',
      action: () => {
        console.log('Navigate to favorites');
        setIsOpen(false);
      }
    },
    {
      label: 'Settings',
      icon: 'Settings',
      action: () => {
        console.log('Navigate to settings');
        setIsOpen(false);
      }
    }
  ];

  const adminMenuItems = [
    {
      label: 'Admin Dashboard',
      icon: 'Shield',
      action: () => {
        navigate('/admin-moderation-dashboard');
        setIsOpen(false);
      }
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogin}
          className="hidden sm:flex"
        >
          Sign In
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleLogin}
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150 micro-interaction"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-text-primary">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-text-secondary">
            {user?.email || 'user@example.com'}
          </div>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md elevated-shadow z-200 animate-slide-up">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} color="white" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-text-secondary">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}

            {user?.role === 'admin' && (
              <>
                <div className="border-t border-border my-2"></div>
                {adminMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-border py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-150"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;