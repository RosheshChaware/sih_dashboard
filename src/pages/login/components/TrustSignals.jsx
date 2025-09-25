import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'Award',
      text: 'Sports Certified',
      description: 'IOC Approved'
    },
    {
      icon: 'Lock',
      text: 'Privacy Protected',
      description: 'GDPR Compliant'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border/30">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge, index) => (
          <div 
            key={index}
            className="flex items-center space-x-2 text-center sm:text-left justify-center sm:justify-start"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon 
                name={badge?.icon} 
                size={16} 
                className="text-primary" 
              />
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">
                {badge?.text}
              </p>
              <p className="text-xs text-text-secondary">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          Trusted by 10,000+ athletes and 500+ sports organizations worldwide
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;