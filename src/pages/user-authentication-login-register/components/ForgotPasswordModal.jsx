import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-text-secondary mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                error={error}
                required
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  className="flex-1"
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Check your email
                </h3>
                <p className="text-sm text-text-secondary">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <Button
                variant="default"
                onClick={handleClose}
                fullWidth
              >
                Got it
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;