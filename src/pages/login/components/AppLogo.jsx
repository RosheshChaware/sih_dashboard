import React from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-warning flex items-center justify-center shadow-glow-primary">
            <Icon name="Zap" size={32} className="text-background" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <Icon name="Sparkles" size={14} className="text-background" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent mb-2">
        SportsTalent AI
      </h1>
      
      <p className="text-text-secondary text-sm">
        AI-Powered Sports Talent Assessment Platform
      </p>
      
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} className="text-primary" />
          <span>Athletes</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-border"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Target" size={14} className="text-accent" />
          <span>Coaches</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-border"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Building" size={14} className="text-warning" />
          <span>Organizations</span>
        </div>
      </div>
    </div>
  );
};

export default AppLogo;