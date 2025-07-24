import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = ({ onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'demo@aitoolshub.com',
    password: 'Demo123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Store authentication data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify({
          name: 'Alex Johnson',
          email: formData.email,
          role: 'user'
        }));

        // Navigate to dashboard
        navigate('/ai-tools-marketplace-dashboard');
      } else {
        setErrors({
          email: 'Invalid credentials. Use demo@aitoolshub.com / Demo123!',
          password: 'Invalid credentials. Use demo@aitoolshub.com / Demo123!'
        });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // Mock social login success
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'user'
    }));
    navigate('/ai-tools-marketplace-dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{errors.general}</p>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Sign In
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          iconName="Chrome"
          iconPosition="left"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('github')}
          iconName="Github"
          iconPosition="left"
        >
          GitHub
        </Button>
      </div>

      <div className="mt-4 p-3 bg-muted rounded-md">
        <p className="text-xs text-text-secondary mb-2">Demo Credentials:</p>
        <p className="text-xs font-mono text-text-primary">Email: {mockCredentials.email}</p>
        <p className="text-xs font-mono text-text-primary">Password: {mockCredentials.password}</p>
      </div>
    </form>
  );
};

export default LoginForm;