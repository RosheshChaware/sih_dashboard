import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const Leaderboard = ({ leaderboardData, currentUser }) => {
  const [sortBy, setSortBy] = useState('overall');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterSport, setFilterSport] = useState('all');
  const [filterAge, setFilterAge] = useState('all');

  const sortOptions = [
    { value: 'overall', label: 'Overall Score' },
    { value: 'speed', label: 'Speed' },
    { value: 'agility', label: 'Agility' },
    { value: 'technique', label: 'Technique' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All India' },
    { value: 'north', label: 'State' },
    { value: 'europe', label: 'District' },
    // { value: 'asia', label: 'Asia' },
    { value: 'other', label: 'Other' }
  ];

  const sportOptions = [
    { value: 'all', label: 'All Tests' },
    { value: 'football', label: 'Push-ups' },
    { value: 'basketball', label: 'Sit-ups' },
    { value: 'tennis', label: 'High jump' },
    // { value: 'track', label: 'Track & Field' }
  ];

  const ageOptions = [
    { value: 'all', label: 'All Ages' },
    {value: '10-16', label: '10-16 years'},
    { value: '16-20', label: '16-20 years' },
    { value: '21-25', label: '21-25 years' },
    { value: '26-30', label: '26-30 years' },
    { value: '31-35', label: '31-35 years' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return 'Crown';
      case 2:
        return 'Medal';
      case 3:
        return 'Award';
      default:
        return 'User';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredData = leaderboardData?.filter(player => {
    if (filterRegion !== 'all' && player?.region !== filterRegion) return false;
    if (filterSport !== 'all' && player?.sport !== filterSport) return false;
    if (filterAge !== 'all' && player?.ageGroup !== filterAge) return false;
    return true;
  })?.sort((a, b) => b?.[sortBy] - a?.[sortBy]);

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Leaderboard</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-primary" />
          <span className="text-sm text-gray-400">Live Rankings</span>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
        <Select
          options={regionOptions}
          value={filterRegion}
          onChange={setFilterRegion}
          placeholder="Region"
        />
        <Select
          options={sportOptions}
          value={filterSport}
          onChange={setFilterSport}
          placeholder="Sport"
        />
        <Select
          options={ageOptions}
          value={filterAge}
          onChange={setFilterAge}
          placeholder="Age"
        />
      </div>
      {/* Current User Position */}
      {currentUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4 mb-4 border border-primary/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm font-bold text-background">
                  {currentUser?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">You</p>
                <p className="text-sm text-gray-400">Rank #{currentUser?.rank}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">{currentUser?.score}</p>
              <p className="text-xs text-gray-400">Overall Score</p>
            </div>
          </div>
        </motion.div>
      )}
      {/* Leaderboard List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredData?.slice(0, 10)?.map((player, index) => (
            <motion.div
              key={player?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                player?.id === currentUser?.id 
                  ? 'bg-primary/10 border border-primary/30' :'bg-surface/50 hover:bg-surface/70'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  <Icon 
                    name={getRankIcon(index + 1)} 
                    size={20} 
                    className={getRankColor(index + 1)} 
                  />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={player?.avatar} 
                    alt={player?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{player?.name}</p>
                  <p className="text-sm text-gray-400">{player?.sport} • {player?.region}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{player?.[sortBy]}</p>
                <p className="text-xs text-gray-400">
                  {player?.change > 0 ? '+' : ''}{player?.change} from last week
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="ExternalLink"
          iconPosition="right"
        >
          View Full Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;