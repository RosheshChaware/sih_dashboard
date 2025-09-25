import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceNotifications = ({ notifications, onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (notifications?.length > 0) {
      const newNotification = notifications?.[notifications?.length - 1];
      setVisibleNotifications(prev => [...prev, { ...newNotification, id: Date.now() }]);

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setVisibleNotifications(prev => prev?.filter(n => n?.id !== newNotification?.id));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/90 border-success text-success-foreground';
      case 'warning':
        return 'bg-warning/90 border-warning text-warning-foreground';
      case 'error':
        return 'bg-error/90 border-error text-error-foreground';
      case 'info':
      default:
        return 'bg-primary/90 border-primary text-primary-foreground';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const handleDismiss = (notificationId) => {
    setVisibleNotifications(prev => prev?.filter(n => n?.id !== notificationId));
    if (onDismiss) {
      onDismiss(notificationId);
    }
  };

  if (visibleNotifications?.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {visibleNotifications?.map((notification) => (
        <div
          key={notification?.id}
          className={`
            ${getNotificationStyles(notification?.type)}
            backdrop-blur-sm rounded-lg border p-4 shadow-modal
            animate-in slide-in-from-right-full duration-300
          `}
        >
          <div className="flex items-start space-x-3">
            <Icon 
              name={getNotificationIcon(notification?.type)} 
              size={20} 
              className="flex-shrink-0 mt-0.5" 
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">{notification?.title}</h4>
              <p className="text-sm opacity-90">{notification?.message}</p>
              {notification?.suggestion && (
                <p className="text-xs mt-2 opacity-75 italic">
                  💡 {notification?.suggestion}
                </p>
              )}
            </div>
            <button
              onClick={() => handleDismiss(notification?.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceNotifications;