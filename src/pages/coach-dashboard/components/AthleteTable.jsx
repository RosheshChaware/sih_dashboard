import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AthleteTable = ({ athletes, onViewProfile, onMessage, onAssignTest }) => {
  const [sortBy, setSortBy] = useState('name');
  const [filterSport, setFilterSport] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'overallScore', label: 'Overall Score' },
    { value: 'lastAssessment', label: 'Last Assessment' },
    { value: 'testsCompleted', label: 'Tests Completed' }
  ];

  const sportOptions = [
    { value: '', label: 'All Sports' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Soccer', label: 'Soccer' },
    { value: 'Tennis', label: 'Tennis' },
    { value: 'Swimming', label: 'Swimming' },
    { value: 'Track & Field', label: 'Track & Field' }
  ];

  const getPerformanceColor = (score) => {
    if (score >= 85) return 'text-accent';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-accent/20 text-accent`;
      case 'inactive':
        return `${baseClasses} bg-muted/20 text-muted-foreground`;
      default:
        return `${baseClasses} bg-warning/20 text-warning`;
    }
  };

  const filteredAndSortedAthletes = athletes?.filter(athlete => {
      const matchesSearch = athlete?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           athlete?.sport?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesSport = !filterSport || athlete?.sport === filterSport;
      return matchesSearch && matchesSport;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'overallScore':
          return b?.overallScore - a?.overallScore;
        case 'testsCompleted':
          return b?.testsCompleted - a?.testsCompleted;
        case 'lastAssessment':
          return new Date(b.lastAssessment) - new Date(a.lastAssessment);
        default:
          return a?.name?.localeCompare(b?.name);
      }
    });

  return (
    <div className="glass rounded-lg overflow-hidden">
      {/* Table Header with Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-xl font-semibold text-text-primary">Athlete Roster</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <Select
              options={sportOptions}
              value={filterSport}
              onChange={setFilterSport}
              placeholder="Filter by sport"
              className="w-full sm:w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-48"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Athlete</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Sport</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Level</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Score</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Tests</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Last Assessment</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAthletes?.map((athlete, index) => (
              <tr key={athlete?.id} className="border-b border-border hover:bg-surface/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={athlete?.avatar}
                      alt={athlete?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-text-primary">{athlete?.name}</p>
                      <p className="text-sm text-text-secondary">Age {athlete?.age}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-text-primary">{athlete?.sport}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    {athlete?.level}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-bold ${getPerformanceColor(athlete?.overallScore)}`}>
                    {athlete?.overallScore}%
                  </span>
                </td>
                <td className="p-4 text-text-primary">{athlete?.testsCompleted}</td>
                <td className="p-4 text-text-secondary">{athlete?.lastAssessment}</td>
                <td className="p-4">
                  <span className={getStatusBadge(athlete?.status)}>
                    {athlete?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProfile(athlete)}
                      className="text-text-secondary hover:text-primary"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMessage(athlete)}
                      className="text-text-secondary hover:text-primary"
                    >
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssignTest(athlete)}
                      className="text-text-secondary hover:text-primary"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredAndSortedAthletes?.map((athlete, index) => (
          <div key={athlete?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={athlete?.avatar}
                  alt={athlete?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-text-primary">{athlete?.name}</h3>
                  <p className="text-sm text-text-secondary">{athlete?.sport} • Age {athlete?.age}</p>
                  <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mt-1">
                    {athlete?.level}
                  </span>
                </div>
              </div>
              <span className={getStatusBadge(athlete?.status)}>
                {athlete?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-text-secondary">Overall Score</p>
                <p className={`font-bold ${getPerformanceColor(athlete?.overallScore)}`}>
                  {athlete?.overallScore}%
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Tests Completed</p>
                <p className="font-medium text-text-primary">{athlete?.testsCompleted}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-text-secondary">Last Assessment</p>
              <p className="text-sm text-text-primary">{athlete?.lastAssessment}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(athlete)}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMessage(athlete)}
                className="text-text-secondary hover:text-primary"
              >
                <Icon name="MessageCircle" size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAssignTest(athlete)}
                className="text-text-secondary hover:text-primary"
              >
                <Icon name="Plus" size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedAthletes?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-text-secondary">No athletes found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default AthleteTable;