import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoReview = ({ videoUrl, analysisPoints, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef?.current) {
      setCurrentTime(videoRef?.current?.currentTime);
    }
  };

  const handleSeek = (time) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-text-primary">Performance Review</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAnalysis(!showAnalysis)}
          iconName={showAnalysis ? "EyeOff" : "Eye"}
          iconPosition="left"
        >
          {showAnalysis ? "Hide" : "Show"} Analysis
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="relative bg-background rounded-lg overflow-hidden aspect-video">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef?.current) {
                  setCurrentTime(0);
                }
              }}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/20 rounded-full h-2 cursor-pointer">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePlayPause}
                      className="text-white hover:text-primary"
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                    </Button>
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-primary"
                    >
                      <Icon name="Volume2" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-primary"
                    >
                      <Icon name="Maximize" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Overlays */}
            {showAnalysis && (
              <div className="absolute inset-0 pointer-events-none">
                {analysisPoints?.map((point, index) => (
                  <div
                    key={index}
                    className={`absolute w-4 h-4 rounded-full border-2 border-primary bg-primary/20 animate-pulse ${
                      currentTime >= point?.timestamp - 1 && currentTime <= point?.timestamp + 1 ? 'opacity-100' : 'opacity-60'
                    }`}
                    style={{
                      left: `${point?.x}%`,
                      top: `${point?.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-auto">
                      {point?.note}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Timeline */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-text-primary mb-4">AI Analysis Points</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {analysisPoints?.map((point, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentTime >= point?.timestamp - 1 && currentTime <= point?.timestamp + 1
                    ? 'bg-primary/20 border border-primary' :'bg-surface hover:bg-surface/80'
                }`}
                onClick={() => handleSeek(point?.timestamp)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon 
                    name={point?.type === 'improvement' ? 'AlertTriangle' : point?.type === 'good' ? 'CheckCircle' : 'Info'} 
                    size={16} 
                    className={
                      point?.type === 'improvement' ? 'text-warning' : 
                      point?.type === 'good' ? 'text-success' : 'text-primary'
                    }
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {formatTime(point?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{point?.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoReview;