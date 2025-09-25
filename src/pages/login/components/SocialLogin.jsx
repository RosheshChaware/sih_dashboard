import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-500/10 hover:border-red-500/30',
      textColor: 'hover:text-red-400'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-500/10 hover:border-blue-500/30',
      textColor: 'hover:text-blue-400'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'hover:bg-gray-500/10 hover:border-gray-500/30',
      textColor: 'hover:text-gray-400'
    }
  ];

  const handleSocialLogin = (provider) => {
    alert(`${provider} login would be implemented here. For demo, use the email/password form above.`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-text-secondary">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            size="default"
            onClick={() => handleSocialLogin(provider?.name)}
            className={`transition-all duration-300 border-border/50 ${provider?.color} ${provider?.textColor} group`}
          >
            <Icon 
              name={provider?.icon} 
              size={20} 
              className="transition-colors duration-300" 
            />
            <span className="hidden sm:inline ml-2">{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;