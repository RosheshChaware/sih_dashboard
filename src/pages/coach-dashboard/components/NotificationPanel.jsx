import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'test_submission':
        return 'FileCheck';
      case 'performance_alert':
        return 'AlertTriangle';
      case 'milestone':
        return 'Trophy';
      case 'message':
        return 'MessageCircle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    switch (type) {
      case 'test_submission':
        return 'text-primary';
      case 'performance_alert':
        return 'text-warning';
      case 'milestone':
        return 'text-accent';
      case 'message':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'high') return notification?.priority === 'high';
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="glass rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-error text-error-foreground rounded-full text-xs font-medium">
              {unreadCount} new
            </span>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          <Button
            variant={filter === 'high' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('high')}
          >
            Priority
          </Button>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
            className="w-full mt-3"
          >
            Mark All as Read
          </Button>
        )}
      </div>
      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          <div className="space-y-1">
            {filteredNotifications?.map((notification, index) => (
              <div
                key={index}
                className={`p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-surface/30 transition-colors ${
                  !notification?.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => onMarkAsRead(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getNotificationColor(notification?.type, notification?.priority)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-text-primary truncate">
                        {notification?.title}
                      </h4>
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                      {notification?.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-text-secondary">
                        {notification?.timestamp}
                      </span>
                      {notification?.priority === 'high' && (
                        <span className="px-2 py-1 bg-error/20 text-error rounded-full text-xs font-medium">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mb-4" />
            <p className="text-text-secondary text-center">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'high' ? 'No high priority notifications' : 
               'No notifications'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;