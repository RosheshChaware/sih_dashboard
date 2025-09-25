import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoHistory = ({ videos, onVideoPlay, onVideoDelete }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const filterTypes = [
    { id: 'all', label: 'All Tests', count: videos?.length },
    { id: 'strength', label: 'Strength', count: videos?.filter(v => v?.category === 'strength')?.length },
    { id: 'agility', label: 'Agility', count: videos?.filter(v => v?.category === 'agility')?.length },
    { id: 'endurance', label: 'Endurance', count: videos?.filter(v => v?.category === 'endurance')?.length },
    { id: 'technical', label: 'Technical', count: videos?.filter(v => v?.category === 'technical')?.length }
  ];

  const filteredVideos = filterType === 'all' 
    ? videos 
    : videos?.filter(video => video?.category === filterType);

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-accent';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-accent/20 border-accent/30';
    if (score >= 70) return 'bg-warning/20 border-warning/30';
    return 'bg-error/20 border-error/30';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-text-primary">Assessment History</h2>
        <div className="flex items-center gap-2">
          <Icon name="Video" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">{filteredVideos?.length} recordings</span>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
        {filterTypes?.map((filter) => (
          <Button
            key={filter?.id}
            variant={filterType === filter?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilterType(filter?.id)}
            className="text-xs"
          >
            {filter?.label}
            <span className="ml-1 px-1.5 py-0.5 bg-surface rounded text-xs">
              {filter?.count}
            </span>
          </Button>
        ))}
      </div>
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVideos?.map((video) => (
          <div
            key={video?.id}
            className="group relative bg-surface/50 rounded-lg overflow-hidden hover:bg-surface/70 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted">
              <Image
                src={video?.thumbnail}
                alt={video?.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Play" size={20} className="text-background ml-1" />
                </div>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs font-medium text-text-primary">
                {formatDuration(video?.duration)}
              </div>

              {/* Score Badge */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full border text-xs font-bold ${getScoreBg(video?.score)} ${getScoreColor(video?.score)}`}>
                {video?.score}%
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-text-primary text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {video?.title}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onVideoDelete(video?.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-error flex-shrink-0"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
                <Icon name="Calendar" size={12} />
                <span>{formatDate(video?.date)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary capitalize">
                  {video?.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <Icon name="Eye" size={12} />
                  <span>{video?.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredVideos?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="VideoOff" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No videos found</h3>
          <p className="text-text-secondary mb-4">
            {filterType === 'all' 
              ? "No assessment videos have been recorded yet." 
              : `No ${filterType} assessment videos found.`}
          </p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Record New Assessment
          </Button>
        </div>
      )}
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-text-primary">{selectedVideo?.title}</h3>
                <p className="text-sm text-text-secondary">{formatDate(selectedVideo?.date)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedVideo(null)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => onVideoPlay(selectedVideo)}
                  iconName="Play"
                  iconPosition="left"
                >
                  Play Video
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{selectedVideo?.score}%</p>
                  <p className="text-xs text-text-secondary">Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{formatDuration(selectedVideo?.duration)}</p>
                  <p className="text-xs text-text-secondary">Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{selectedVideo?.views}</p>
                  <p className="text-xs text-text-secondary">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary capitalize">{selectedVideo?.category}</p>
                  <p className="text-xs text-text-secondary">Category</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoHistory;