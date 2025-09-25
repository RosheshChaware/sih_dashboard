import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const ActionButtons = ({ onSaveResults, onScheduleAssessment, onShareResults, onExportData, onReturnToDashboard }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareOptions, setShareOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleShare = async (platform) => {
    setIsSharing(true);
    try {
      // Mock sharing functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      onShareResults(platform);
      setShareOptions(false);
    } catch (error) {
      console.error('Sharing failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleExport = () => {
    onExportData(exportFormat);
  };

  const socialPlatforms = [
    { id: 'twitter', name: 'Twitter', icon: 'Twitter', color: 'bg-blue-500' },
    { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', color: 'bg-blue-700' }
  ];

  const exportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: 'FileText' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: 'Sheet' },
    { id: 'json', name: 'JSON Data', icon: 'Code' }
  ];

  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Next Steps</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Save Results */}
        <Button
          variant="default"
          onClick={onSaveResults}
          iconName="Save"
          iconPosition="left"
          className="h-auto p-4 flex-col gap-2"
        >
          <span className="font-semibold">Save Results</span>
          <span className="text-xs opacity-80">Store to your profile</span>
        </Button>

        {/* Schedule Assessment */}
        <Button
          variant="outline"
          onClick={onScheduleAssessment}
          iconName="Calendar"
          iconPosition="left"
          className="h-auto p-4 flex-col gap-2"
        >
          <span className="font-semibold">Schedule Next</span>
          <span className="text-xs opacity-80">Book follow-up test</span>
        </Button>

        {/* Share Results */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShareOptions(!shareOptions)}
            iconName="Share2"
            iconPosition="left"
            loading={isSharing}
            className="w-full h-auto p-4 flex-col gap-2"
          >
            <span className="font-semibold">Share Results</span>
            <span className="text-xs opacity-80">Post achievements</span>
          </Button>

          {shareOptions && (
            <div className="absolute top-full left-0 right-0 mt-2 glass rounded-lg p-4 z-10">
              <h4 className="font-semibold text-text-primary mb-3">Share on</h4>
              <div className="grid grid-cols-2 gap-2">
                {socialPlatforms?.map((platform) => (
                  <Button
                    key={platform?.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(platform?.id)}
                    iconName={platform?.icon}
                    iconPosition="left"
                    className="justify-start"
                  >
                    {platform?.name}
                  </Button>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  iconName="Copy"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Copy Link
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Return to Dashboard */}
        <Button
          variant="secondary"
          onClick={onReturnToDashboard}
          iconName="Home"
          iconPosition="left"
          className="h-auto p-4 flex-col gap-2"
        >
          <span className="font-semibold">Dashboard</span>
          <span className="text-xs opacity-80">Return to main</span>
        </Button>
      </div>
      {/* Export Section */}
      <div className="border-t border-border pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-text-primary mb-1">Export Data</h3>
            <p className="text-sm text-text-secondary">Download your assessment data for offline analysis</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e?.target?.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {exportFormats?.map((format) => (
                <option key={format?.id} value={format?.id}>
                  {format?.name}
                </option>
              ))}
            </select>
            
            <Button
              variant="outline"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Repeat"
            iconPosition="left"
          >
            Retake Assessment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Users"
            iconPosition="left"
          >
            Compare with Friends
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Get Coach Feedback
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
          >
            Training Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;