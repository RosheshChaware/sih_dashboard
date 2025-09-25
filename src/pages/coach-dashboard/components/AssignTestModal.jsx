import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AssignTestModal = ({ athlete, isOpen, onClose, onAssign }) => {
  const [selectedTest, setSelectedTest] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');

  const testOptions = [
    { value: 'speed_agility', label: 'Speed & Agility Assessment' },
    { value: 'strength_power', label: 'Strength & Power Test' },
    { value: 'endurance', label: 'Cardiovascular Endurance' },
    { value: 'flexibility', label: 'Flexibility & Mobility' },
    { value: 'sport_specific', label: 'Sport-Specific Skills' },
    { value: 'mental_focus', label: 'Mental Focus & Reaction' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedTest || !deadline) return;

    onAssign({
      athleteId: athlete?.id,
      testType: selectedTest,
      deadline,
      priority,
      notes,
      assignedDate: new Date()?.toISOString()
    });

    // Reset form
    setSelectedTest('');
    setDeadline('');
    setPriority('medium');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Assign Test</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Athlete Info */}
          <div className="flex items-center space-x-3 p-4 bg-surface/30 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-background">
                {athlete?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-text-primary">{athlete?.name}</h3>
              <p className="text-sm text-text-secondary">{athlete?.sport} • {athlete?.level}</p>
            </div>
          </div>

          {/* Test Selection */}
          <Select
            label="Assessment Type"
            options={testOptions}
            value={selectedTest}
            onChange={setSelectedTest}
            placeholder="Choose an assessment"
            required
          />

          {/* Deadline */}
          <Input
            label="Deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e?.target?.value)}
            required
            min={new Date()?.toISOString()?.slice(0, 16)}
          />

          {/* Priority */}
          <Select
            label="Priority Level"
            options={priorityOptions}
            value={priority}
            onChange={setPriority}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              placeholder="Add any specific instructions or requirements..."
              rows={3}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!selectedTest || !deadline}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Assign Test
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTestModal;