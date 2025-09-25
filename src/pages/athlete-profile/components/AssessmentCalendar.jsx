import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssessmentCalendar = ({ scheduledAssessments, availableSlots, onScheduleAssessment, onCancelAssessment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    type: '',
    date: '',
    time: '',
    duration: '60',
    notes: ''
  });

  const assessmentTypes = [
    { value: 'strength', label: 'Strength Assessment' },
    { value: 'agility', label: 'Agility Test' },
    { value: 'endurance', label: 'Endurance Evaluation' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'comprehensive', label: 'Comprehensive Assessment' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const getCurrentMonth = () => {
    return selectedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = () => {
    const year = selectedDate?.getFullYear();
    const month = selectedDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAssessmentsForDate = (date) => {
    if (!date) return [];
    const dateString = date?.toISOString()?.split('T')?.[0];
    return scheduledAssessments?.filter(assessment => 
      assessment?.date?.startsWith(dateString)
    );
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const handleScheduleSubmit = (e) => {
    e?.preventDefault();
    onScheduleAssessment(scheduleForm);
    setShowScheduleModal(false);
    setScheduleForm({
      type: '',
      date: '',
      time: '',
      duration: '60',
      notes: ''
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAssessmentTypeColor = (type) => {
    switch (type) {
      case 'strength': return 'bg-error/20 text-error border-error/30';
      case 'agility': return 'bg-warning/20 text-warning border-warning/30';
      case 'endurance': return 'bg-accent/20 text-accent border-accent/30';
      case 'technical': return 'bg-primary/20 text-primary border-primary/30';
      case 'comprehensive': return 'bg-gradient-to-r from-primary/20 to-accent/20 text-text-primary border-primary/30';
      default: return 'bg-surface/50 text-text-secondary border-border';
    }
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-text-primary">Assessment Calendar</h2>
        <Button
          variant="default"
          onClick={() => setShowScheduleModal(true)}
          iconName="Plus"
          iconPosition="left"
          size="sm"
        >
          Schedule Assessment
        </Button>
      </div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          className="text-text-secondary hover:text-text-primary"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <h3 className="text-lg font-semibold text-text-primary">{getCurrentMonth()}</h3>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
          className="text-text-secondary hover:text-text-primary"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Week Day Headers */}
        {weekDays?.map((day) => (
          <div key={day} className="p-2 text-center text-xs font-medium text-text-secondary">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days?.map((date, index) => {
          const assessments = getAssessmentsForDate(date);
          const isAvailable = isDateAvailable(date);
          const isToday = date && date?.toDateString() === new Date()?.toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 border border-border/30 rounded-lg transition-all duration-200 ${
                date ? 'hover:bg-surface/30 cursor-pointer' : ''
              } ${isToday ? 'ring-2 ring-primary/50' : ''} ${
                !isAvailable && date ? 'opacity-50' : ''
              }`}
            >
              {date && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${
                      isToday ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {date?.getDate()}
                    </span>
                    {assessments?.length > 0 && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  
                  {/* Assessment Indicators */}
                  <div className="space-y-1">
                    {assessments?.slice(0, 2)?.map((assessment, assessmentIndex) => (
                      <div
                        key={assessmentIndex}
                        className={`text-xs px-1 py-0.5 rounded border text-center truncate ${getAssessmentTypeColor(assessment?.type)}`}
                        title={`${assessment?.type} - ${formatTime(assessment?.time)}`}
                      >
                        {formatTime(assessment?.time)}
                      </div>
                    ))}
                    {assessments?.length > 2 && (
                      <div className="text-xs text-center text-text-secondary">
                        +{assessments?.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Upcoming Assessments */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Assessments</h3>
        <div className="space-y-3">
          {scheduledAssessments?.filter(assessment => new Date(assessment.date) >= new Date())?.slice(0, 3)?.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    assessment?.type === 'strength' ? 'bg-error' :
                    assessment?.type === 'agility' ? 'bg-warning' :
                    assessment?.type === 'endurance' ? 'bg-accent' :
                    assessment?.type === 'technical'? 'bg-primary' : 'bg-gradient-to-r from-primary to-accent'
                  }`} />
                  <div>
                    <h4 className="font-medium text-text-primary capitalize">
                      {assessment?.type} Assessment
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {new Date(assessment.date)?.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })} at {formatTime(assessment?.time)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">{assessment?.duration}min</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCancelAssessment(assessment?.id)}
                    className="text-text-secondary hover:text-error"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>
            ))}
        </div>
        
        {scheduledAssessments?.filter(assessment => new Date(assessment.date) >= new Date())?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={32} className="mx-auto mb-2 text-text-secondary opacity-50" />
            <p className="text-text-secondary">No upcoming assessments scheduled</p>
          </div>
        )}
      </div>
      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-bold text-text-primary">Schedule Assessment</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowScheduleModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <Select
                label="Assessment Type"
                options={assessmentTypes}
                value={scheduleForm?.type}
                onChange={(value) => setScheduleForm(prev => ({ ...prev, type: value }))}
                required
              />
              
              <Input
                label="Date"
                type="date"
                value={scheduleForm?.date}
                onChange={(e) => setScheduleForm(prev => ({ ...prev, date: e?.target?.value }))}
                required
              />
              
              <Input
                label="Time"
                type="time"
                value={scheduleForm?.time}
                onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e?.target?.value }))}
                required
              />
              
              <Select
                label="Duration"
                options={durationOptions}
                value={scheduleForm?.duration}
                onChange={(value) => setScheduleForm(prev => ({ ...prev, duration: value }))}
                required
              />
              
              <Input
                label="Notes (Optional)"
                type="text"
                placeholder="Any special requirements or notes..."
                value={scheduleForm?.notes}
                onChange={(e) => setScheduleForm(prev => ({ ...prev, notes: e?.target?.value }))}
              />
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1"
                >
                  Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentCalendar;