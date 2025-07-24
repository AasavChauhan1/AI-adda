import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify({
        name: formData.username,
        email: formData.email,
        role: 'user'
      }));

      // Navigate to dashboard
      navigate('/ai-tools-marketplace-dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Social register with ${provider}`);
    // Mock social registration success
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
        label="Username"
        type="text"
        name="username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleInputChange}
        error={errors.username}
        description="3+ characters, letters, numbers, and underscores only"
        required
      />

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
        placeholder="Create a strong password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        description="8+ characters with uppercase, lowercase, and number"
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
        required
      />

      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="acceptTerms"
        checked={formData.acceptTerms}
        onChange={handleInputChange}
        error={errors.acceptTerms}
        required
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        Create Account
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
          onClick={() => handleSocialRegister('google')}
          iconName="Chrome"
          iconPosition="left"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialRegister('github')}
          iconName="Github"
          iconPosition="left"
        >
          GitHub
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;