import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, notifications = [], onNotificationClick = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: user?.type === 'coach' ? '/coach-dashboard' : '/athlete-dashboard',
      icon: 'LayoutDashboard',
      active: location?.pathname?.includes('dashboard')
    },
    {
      label: 'Assessments',
      path: '/live-assessment',
      icon: 'Activity',
      active: location?.pathname?.includes('assessment')
    },
    {
      label: 'Athletes',
      path: '/athlete-profile',
      icon: 'Users',
      active: location?.pathname?.includes('athlete')
    },
    {
      label: 'Results',
      path: '/assessment-results',
      icon: 'BarChart3',
      active: location?.pathname?.includes('results')
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.dropdown-container')) {
        setIsProfileDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-navigation bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Icon name="Zap" size={24} className="text-background" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SportsTalent AI
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={item?.active ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                className={`transition-all duration-200 ${
                  item?.active 
                    ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            {user && (
              <div className="relative dropdown-container">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleNotificationDropdown}
                  className="relative text-text-secondary hover:text-text-primary"
                >
                  <Icon name="Bell" size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </Button>

                {/* Notification Dropdown */}
                {isNotificationDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 glass rounded-lg shadow-modal z-dropdown">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications?.length > 0 ? (
                        notifications?.slice(0, 5)?.map((notification, index) => (
                          <div
                            key={index}
                            className={`p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-surface/50 transition-colors ${
                              !notification?.read ? 'bg-primary/5' : ''
                            }`}
                            onClick={() => onNotificationClick(notification)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                !notification?.read ? 'bg-primary' : 'bg-muted'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-primary truncate">
                                  {notification?.title}
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                  {notification?.message}
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                  {notification?.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-text-secondary">
                          <Icon name="Bell" size={24} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile */}
            {user ? (
              <div className="relative dropdown-container">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-background">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="hidden md:block font-medium">{user?.name}</span>
                  <Icon name="ChevronDown" size={16} />
                </Button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass rounded-lg shadow-modal z-dropdown">
                    <div className="p-4 border-b border-border">
                      <p className="font-semibold text-text-primary">{user?.name}</p>
                      <p className="text-sm text-text-secondary">{user?.email}</p>
                      <p className="text-xs text-primary capitalize mt-1">{user?.type} Account</p>
                    </div>
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate('/profile');
                          setIsProfileDropdownOpen(false);
                        }}
                        iconName="User"
                        iconPosition="left"
                        className="w-full justify-start text-text-secondary hover:text-text-primary"
                      >
                        Profile Settings
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigate('/settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        iconName="Settings"
                        iconPosition="left"
                        className="w-full justify-start text-text-secondary hover:text-text-primary"
                      >
                        Settings
                      </Button>
                      <div className="border-t border-border my-2" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        iconName="LogOut"
                        iconPosition="left"
                        className="w-full justify-start text-error hover:text-error hover:bg-error/10"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/login')}
                iconName="LogIn"
                iconPosition="left"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden text-text-secondary hover:text-text-primary"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-menu lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glass border-l border-border">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-text-primary">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigationItems?.map((item) => (
                  <Button
                    key={item?.path}
                    variant={item?.active ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    iconName={item?.icon}
                    iconPosition="left"
                    className={`w-full justify-start transition-all duration-200 ${
                      item?.active 
                        ? 'bg-primary text-primary-foreground shadow-glow-primary' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                  >
                    {item?.label}
                  </Button>
                ))}
              </nav>

              {/* Mobile User Section */}
              {user && (
                <div className="p-4 border-t border-border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-sm font-semibold text-background">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{user?.name}</p>
                      <p className="text-xs text-primary capitalize">{user?.type} Account</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate('/profile');
                        setIsMobileMenuOpen(false);
                      }}
                      iconName="User"
                      iconPosition="left"
                      className="w-full justify-start text-text-secondary hover:text-text-primary"
                    >
                      Profile Settings
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      iconName="LogOut"
                      iconPosition="left"
                      className="w-full justify-start text-error hover:text-error hover:bg-error/10"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;