import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import AuthBackground from './components/AuthBackground';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/ai-tools-marketplace-dashboard');
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AuthBackground />
      
      {/* Header */}
      <header className="relative z-10 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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

            {/* Back to Dashboard */}
            <button
              onClick={() => navigate('/ai-tools-marketplace-dashboard')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-150"
            >
              <Icon name="ArrowLeft" size={16} />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-surface/90 backdrop-blur-sm rounded-xl shadow-xl border border-border p-8">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {activeTab === 'login' ? 'Welcome back!' : 'Join AI Tools Hub'}
              </h1>
              <p className="text-text-secondary">
                {activeTab === 'login' ?'Sign in to discover amazing AI tools' :'Create your account to get started'
                }
              </p>
            </div>

            {/* Auth Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Auth Forms */}
            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm onForgotPassword={handleForgotPassword} />
              ) : (
                <RegisterForm />
              )}
            </div>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-text-secondary">
                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {activeTab === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-text-secondary">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={handleCloseForgotPassword}
      />
    </div>
  );
};

export default UserAuthentication;