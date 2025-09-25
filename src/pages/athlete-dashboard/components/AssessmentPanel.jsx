import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentPanel = ({ assessmentTypes }) => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showCameraPreview, setShowCameraPreview] = useState(false);
  const navigate = useNavigate();

  const handleStartAssessment = (assessmentType) => {
    setSelectedAssessment(assessmentType);
    setShowCameraPreview(true);
    // Simulate camera preview for 2 seconds then navigate
    setTimeout(() => {
      navigate('/live-assessment', { state: { assessmentType } });
    }, 2000);
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Quick Assessment</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/assessment-results')}
          iconName="BarChart3"
          iconPosition="left"
        >
          View Results
        </Button>
      </div>
      {showCameraPreview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gray-900 rounded-lg aspect-video mb-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon name="Camera" size={32} className="text-background" />
              </motion.div>
              <p className="text-white font-medium">Initializing Camera...</p>
              <p className="text-gray-400 text-sm mt-1">Starting {selectedAssessment?.name}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 bg-error/20 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
              <span className="text-error text-sm font-medium">LIVE</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {assessmentTypes?.map((assessment, index) => (
            <motion.div
              key={assessment?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleStartAssessment(assessment)}
            >
              <div className="glass rounded-lg p-4 border border-transparent group-hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${assessment?.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={assessment?.icon} size={20} className="text-background" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{assessment?.name}</h4>
                    <p className="text-xs text-gray-400">{assessment?.duration}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3">{assessment?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-medium">{assessment?.difficulty}</span>
                  <Icon name="ChevronRight" size={16} className="text-gray-400 group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <a href="camera.html">
        <Button
          variant="default"
          fullWidth
          onClick={() => navigate('/live-assessment')}
          iconName="Play"
          iconPosition="left"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
        >
          Start New Assessment
        </Button>
        </a>
        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate('/athlete-profile')}
          iconName="User"
          iconPosition="left"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default AssessmentPanel;