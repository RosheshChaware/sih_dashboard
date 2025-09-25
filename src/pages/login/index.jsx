import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from './components/AppLogo';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData?.isAuthenticated) {
        // Redirect based on user type
        if (userData?.type === 'athlete') {
          navigate('/athlete-dashboard');
        } else if (userData?.type === 'coach') {
          navigate('/coach-dashboard');
        } else {
          navigate('/athlete-dashboard');
        }
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-warning/3 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-2xl border border-border/50">
          {/* App Logo */}
          <AppLogo />
          
          {/* Login Form */}
          <LoginForm />
          
          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin />
          </div>
          
          {/* Trust Signals */}
          <TrustSignals />
        </div>
        
        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <button 
              onClick={() => alert('Registration would be implemented here')}
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Sign up for free
            </button>
          </p>
        </div>
        
        {/* Demo Credentials Info */}
        <div className="mt-4 p-4 rounded-lg bg-surface/50 border border-border/30">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-text-primary mb-1">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-text-secondary">
                <p><span className="text-primary">Athlete:</span> athlete@sportstalent.ai / athlete123</p>
                <p><span className="text-accent">Coach:</span> coach@sportstalent.ai / coach123</p>
                <p><span className="text-warning">Official:</span> official@sportstalent.ai / official123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-8 left-8 hidden lg:block">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <Icon name="Trophy" size={24} className="text-primary" />
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
          <Icon name="Target" size={24} className="text-accent" />
        </div>
      </div>
      
      <div className="absolute top-1/2 right-8 hidden lg:block">
        <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center animate-pulse">
          <Icon name="Star" size={16} className="text-warning" />
        </div>
      </div>
    </div>
  );
};

export default Login;