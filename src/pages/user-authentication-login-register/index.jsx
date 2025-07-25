import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import AuthBackground from './components/AuthBackground';
import { useAuth } from '../../utils/AuthContext';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Redirect if user is already authenticated
    if (user) {
      navigate('/ai-tools-marketplace-dashboard');
    }
  }, [navigate, user]);

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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background">
      <AuthBackground />
      <div className="relative z-10 w-full max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center mb-8">
          <Icon name="Sparkles" className="text-primary mr-2" size={32} />
          <h1 className="text-3xl font-bold text-text-primary">AI Tools Hub</h1>
        </div>
        <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="mt-6">
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'register' && <RegisterForm />}
        </div>
        {showForgotPassword && (
          <ForgotPasswordModal onClose={handleCloseForgotPassword} />
        )}
      </div>
    </div>
  );
};

export default UserAuthentication;