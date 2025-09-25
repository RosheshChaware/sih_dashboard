import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    athlete: { email: 'athlete@sportstalent.ai', password: 'athlete123' },
    coach: { email: 'coach@sportstalent.ai', password: 'coach123' },
    official: { email: 'official@sportstalent.ai', password: 'official123' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const { email, password } = formData;
      
      // Check credentials and determine user type
      let userType = null;
      let isValidCredentials = false;
      
      Object.entries(mockCredentials)?.forEach(([type, creds]) => {
        if (email === creds?.email && password === creds?.password) {
          userType = type;
          isValidCredentials = true;
        }
      });
      
      if (isValidCredentials) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          email,
          type: userType,
          name: userType === 'athlete' ? 'Alex Johnson' : 
                userType === 'coach' ? 'Sarah Williams' : 'Mike Thompson',
          isAuthenticated: true
        }));
        
        // Navigate based on user type
        if (userType === 'athlete') {
          navigate('/athlete-dashboard');
        } else if (userType === 'coach') {
          navigate('/coach-dashboard');
        } else {
          navigate('/athlete-dashboard'); // Default for officials
        }
      } else {
        setErrors({
          general: `Invalid credentials. Use: athlete@sportstalent.ai / athlete123, coach@sportstalent.ai / coach123, or official@sportstalent.ai / official123`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo, use the provided mock credentials.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {errors?.general}
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="transition-all duration-300"
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="transition-all duration-300"
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          className="text-sm"
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-primary"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;