import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraPreview = ({ 
  isRecording, 
  onStartRecording, 
  onStopRecording, 
  repCount, 
  formScore,
  exerciseName,
  isLoading 
}) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    initializeCamera();
    return () => {
      if (stream) {
        stream?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, []);

  const initializeCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);
    
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      setCameraError('Camera access denied. Please enable camera permissions.');
      console.error('Camera initialization error:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const getFormScoreColor = () => {
    if (formScore >= 85) return 'text-success';
    if (formScore >= 70) return 'text-warning';
    return 'text-error';
  };

  const getFormScoreLabel = () => {
    if (formScore >= 85) return 'Excellent';
    if (formScore >= 70) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="relative w-full h-full bg-surface rounded-xl overflow-hidden glass">
      {/* Camera Feed */}
      <div className="relative w-full h-full">
        {cameraError ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Icon name="CameraOff" size={64} className="text-error mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Camera Not Available</h3>
            <p className="text-text-secondary mb-6">{cameraError}</p>
            <Button
              variant="outline"
              onClick={initializeCamera}
              iconName="RefreshCw"
              iconPosition="left"
              loading={isInitializing}
            >
              Retry Camera Access
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-error/90 backdrop-blur-sm rounded-full px-3 py-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">REC</span>
              </div>
            )}

            {/* Exercise Name */}
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-text-primary font-medium">{exerciseName}</span>
            </div>

            {/* Rep Counter Overlay */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary/90 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-foreground">{repCount}</div>
                  <div className="text-xs text-primary-foreground/80">REPS</div>
                </div>
              </div>
            </div>

            {/* Form Analysis Indicator */}
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={20} className={getFormScoreColor()} />
                <div>
                  <div className={`text-sm font-semibold ${getFormScoreColor()}`}>
                    {formScore}%
                  </div>
                  <div className="text-xs text-text-secondary">
                    {getFormScoreLabel()}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Indicators */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 space-y-2">
              <div className="bg-accent/20 backdrop-blur-sm rounded-lg p-2 border border-accent/30">
                <Icon name="Eye" size={16} className="text-accent" />
              </div>
              <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-2 border border-primary/30">
                <Icon name="Activity" size={16} className="text-primary" />
              </div>
              <div className="bg-warning/20 backdrop-blur-sm rounded-lg p-2 border border-warning/30">
                <Icon name="Zap" size={16} className="text-warning" />
              </div>
            </div>

            {/* Loading Overlay */}
            {(isLoading || isInitializing) && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-text-primary font-medium">
                    {isInitializing ? 'Initializing Camera...' : 'Processing...'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {!isRecording ? (
          <Button
            variant="default"
            size="lg"
            onClick={onStartRecording}
            disabled={!!cameraError || isInitializing}
            iconName="Play"
            iconPosition="left"
            className="bg-success hover:bg-success/90 text-success-foreground shadow-glow-accent"
          >
            Start Assessment
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="lg"
            onClick={onStopRecording}
            iconName="Square"
            iconPosition="left"
            className="shadow-glow-primary"
          >
            Stop Assessment
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraPreview;